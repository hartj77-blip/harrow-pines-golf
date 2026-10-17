// Automated playthrough: a bot plays every hole of every course in a real
// (headless) browser, plus a pass-and-play round and My Course built from
// random range data. Checks that every hole finishes, scores add up, the ball
// never ends up somewhere invalid, and the page logs no errors.
//
//   npm i -g playwright && npx playwright install chromium   (once)
//   node tests/playthrough.js
const path = require('path');
const http = require('http');
const fs = require('fs');

let chromium;
try { ({ chromium } = require('playwright')); } catch {
  console.log('Install Playwright first: npm i -g playwright && npx playwright install chromium');
  process.exit(1);
}

const ROOT = path.join(__dirname, '..');
const server = http.createServer((req, res) => {
  const file = path.join(ROOT, decodeURIComponent(req.url.split('?')[0]).replace(/^\/$/, '/index.html'));
  if (!file.startsWith(ROOT) || !fs.existsSync(file)) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'Content-Type': file.endsWith('.html') ? 'text/html' : 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
});

// Runs inside the page. Plays one full round with a simple bot and returns what happened.
async function playRound([courseId, nPlayers, seed]) {
  const { sfx, music, settings, applyGfx, playersCfg, game, startMode, curHoles, endFlyover, suggestPower, executeShot,
    CLUBS, SURF, WATER, OOB, cardNext, playerTotal } = window.__golf;
  const $ = (id) => document.getElementById(id);
  let r = seed;
  const rand = () => { r = (r * 16807) % 2147483647; return r / 2147483647; };
  const wait = (ms) => new Promise((ok) => setTimeout(ok, ms));
  const problems = [];
  sfx.on = false; music.on = false;
  settings.gfx = 'low'; applyGfx();
  playersCfg.n = nPlayers;
  playersCfg.names = ['Ann', 'Bo', 'Cy', 'Di'].slice(0, nPlayers);
  game.timeScale = 30;
  $('intro').hidden = true; $('hud').hidden = false;
  startMode(courseId);
  const holes = curHoles().length;
  const shotsPerHole = [];
  let shots = 0;
  const started = Date.now();
  for (;;) {
    if (Date.now() - started > 240000 * nPlayers) { problems.push('round took too long'); break; }
    await wait(5);
    const st = game.state;
    if (!game.H) continue;
    const b = game.ball;
    if (![b.x, b.y, b.z].every(Number.isFinite)) { problems.push(`ball position is not a number on hole ${game.holeIdx + 1}`); break; }
    if (st === 'flyover') { endFlyover(); continue; }
    if (st === 'aim') {
      // The ball must never be left sitting in water or out of bounds.
      const lie = game.H.surface(b.x, b.z);
      if (lie === WATER || lie === OOB) problems.push(`hole ${game.holeIdx + 1}: ball left in ${SURF[lie].name}`);
      if (++shots > holes * nPlayers * 14) { problems.push('too many shots'); break; }
      const c = CLUBS[game.club];
      if (!c.putt) suggestPower();
      let pw = c.putt || game.sugPow > 0 ? game.sugPow : 0.93;
      pw = Math.min(1, Math.max(0.03, pw * (0.93 + rand() * 0.14)));
      const acc = (rand() - 0.5) * 1.2;
      game.locked = pw;
      executeShot(pw, acc);
      continue;
    }
    if (st === 'card') {
      const mode = $('cardOverlay').dataset.mode;
      for (const P of game.players) {
        const s = P.scores[game.holeIdx];
        const max = game.H.maxStrokes || 10;
        if (!(s >= 1 && s <= max)) problems.push(`hole ${game.holeIdx + 1}: ${P.name} has score ${s}`);
      }
      shotsPerHole.push(game.players.map((P) => P.scores[game.holeIdx]));
      if (mode === 'final') {
        const totals = game.players.map(playerTotal);
        const sums = game.players.map((P) => P.scores.slice(0, holes).reduce((a, v) => a + v, 0));
        if (JSON.stringify(totals) !== JSON.stringify(sums)) problems.push(`totals ${totals} != ${sums}`);
        if (game.players.some((P) => P.scores.filter(Boolean).length !== holes)) problems.push('missing hole scores');
        const cardText = $('cardOverlay').innerText;
        for (const t of totals) if (!cardText.includes(String(t))) problems.push(`scorecard does not show total ${t}`);
        return { problems, totals, holes, par: curHoles().reduce((a, h) => a + h.par, 0), shotsPerHole };
      }
      cardNext();
      while (game.state === 'card') await wait(5); // next hole loads asynchronously
      continue;
    }
  }
  return { problems, shotsPerHole };
}

(async () => {
  await new Promise((ok) => server.listen(0, ok));
  const url = `http://localhost:${server.address().port}/`;
  const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  let failed = 0;
  const runs = [
    ['harrow', 1], ['links', 1], ['mesa', 1], ['mini', 1], ['glow', 1],
    ['harrow', 3], ['range-data', 1], ['mine', 1],
  ];
  const only = process.argv[2];
  for (const [courseId, n] of runs.filter((r) => !only || r[0] === only)) {
    const page = await browser.newPage({ viewport: { width: 900, height: 600 } });
    const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    page.on('console', (m) => { if (m.type() === 'error' && !/favicon|status of 404/.test(m.text())) errors.push(m.text()); });
    await page.goto(url);
    await page.waitForFunction(() => window.__golf);
    let label = `${courseId}${n > 1 ? ` (${n} players)` : ''}`;
    let result;
    if (courseId === 'range-data') {
      // Fill the range log with lopsided, short, wild data and check My Course still builds sensible holes.
      result = await page.evaluate(() => {
        const { setRangeData, CLUBS, PUTTER, M2YD, recordRange, buildMyCourse, buildHole, SURF, GREEN, TEE, WATER, OOB } = window.__golf;
        const problems = [];
        for (let trial = 0; trial < 40; trial++) {
          setRangeData({ clubs: {} });
          for (let ci = 0; ci < PUTTER; ci++) {
            if (Math.random() < 0.3) continue;
            const base = CLUBS[ci].carry / M2YD * (0.4 + Math.random() * 0.9), bias = (Math.random() - 0.5) * base * 0.6;
            for (let k = 0; k < 3 + (Math.random() * 10 | 0); k++) recordRange(ci, base * (0.8 + Math.random() * 0.4), base * 1.1, bias + (Math.random() - 0.5) * base * 0.5, 0.8 + Math.random() * 0.3);
          }
          for (const def of buildMyCourse().holes) {
            const H = buildHole(def);
            const at = (x, z) => SURF[H.surface(x, z)].name;
            if (H.surface(H.cup.x, H.cup.z) !== GREEN) problems.push(`${def.name}: cup is on ${at(H.cup.x, H.cup.z)}`);
            if (H.surface(0, 0) !== TEE) problems.push(`${def.name}: tee is on ${at(0, 0)}`);
            if (!(H.total > 40)) problems.push(`${def.name}: hole is only ${H.total} m long`);
            // Something playable between tee and green: sample the centre line.
            let blocked = 0;
            for (let s = 0; s < H.total; s += 4) { const p = H.pointAt(s); const sf = H.surface(p.x, p.z); if (sf === WATER || sf === OOB) blocked++; }
            if (blocked > 3) problems.push(`${def.name}: centre line crosses ${blocked * 4} m of water/OOB`);
          }
        }
        localStorage.removeItem('harrowPinesRange');
        return { problems: [...new Set(problems)].slice(0, 10) };
      });
      label = 'My Course generator (40 random range logs)';
    } else {
      result = await page.evaluate(playRound, [courseId, n, 12345 + n * 7 + courseId.length]);
    }
    const all = result.problems.concat(errors.map((e) => `console: ${e}`));
    if (all.length) { failed++; console.log(`  FAIL ${label}\n    ${all.join('\n    ')}`); }
    else console.log(`  ok  ${label}${result.totals ? `: shot ${result.totals.join(' / ')} on a par ${result.par}` : ''}`);
    await page.close();
  }

  // Storage blocked (private browsing, strict settings): the start screen must still work.
  {
    const ctx = await browser.newContext();
    await ctx.addInitScript(() => {
      Object.defineProperty(window, 'localStorage', { get() { throw new Error('storage disabled'); } });
    });
    const page = await ctx.newPage();
    const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    await page.goto(url);
    await page.waitForTimeout(800);
    for (const mode of ['mine', 'range', 'harrow']) await page.click(`.mode[data-mode=${mode}]`, { timeout: 120000 }).catch((e) => errors.push(e.message));
    if (errors.length) { failed++; console.log(`  FAIL storage disabled\n    ${errors.join('\n    ')}`); } else console.log('  ok  start screen works with storage disabled');
    await ctx.close();
  }

  await browser.close();
  server.close();
  console.log(failed ? `\n${failed} FAILED` : '\nall passed');
  process.exitCode = failed ? 1 : 0;
})();
