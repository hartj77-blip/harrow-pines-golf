# Harrow Pines Golf

A golf game that runs in the browser: three 18-hole courses, two 18-hole mini golf courses, a driving range, and **My Course**, three holes built from your own range data. It's a single HTML file built on [Three.js](https://threejs.org/) r128 (bundled in `lib/three.min.js`, MIT licensed), with no build step. If the browser can't run WebGL, the page explains why instead of showing a blank screen.

## Play

Play online at **https://hartj77-blip.github.io/harrow-pines-golf/** (GitHub Pages, served from the `main` branch root).

Or open `index.html` locally in a browser, or serve the folder with any static host.

## Modes

- **Harrow Pines**: pine-lined parkland, 18 holes, par 71. Streams cross the par 5s and guard the 8th and 18th greens, the 10th green sits in a hollow, and several greens are two-tiered. Look for the watermill on Mill Stream, the chapels on 7 and 16, the stone lanterns round Lantern Pond and the clubhouse behind the last green.
- **Saltmarsh Links**: seaside dunes, golden fescue, gorse, pot bunkers and stronger wind; 18 holes, par 72. The sea runs down the left going out and the right coming home, with a beach, surf and sailing boats. Burns cross the 4th and 14th, a dry-stone wall crosses the 5th, the 3rd green is a saucer and a lighthouse stands beside the 7th.
- **Red Mesa**: desert target golf at golden hour, with saguaros, palms, banded mesas and elevated tees; 18 holes, par 72. Sandy washes cut across Saguaro Trail and Dry Wash and snake beside Arroyo and Rattlesnake; rock spires and a stone arch mark the holes named after them.
- **Hollow Mini Golf**: 18 crazy-golf holes, par 46, putter only. Carpet lanes with wooden borders you bank off, posts, a windmill whose sails block the tunnel (time it), a volcano with the cup on top, a ramp, a pond (stroke and replay) and a bank-shot vault. The back nine adds a castle gate with a sliding portcullis, a sand hollow, a U-shaped lighthouse loop, twin bridges over a stream, a rollercoaster of ramps, a pachinko post field, a second windmill on a dogleg, a funnel and a clown's mouth with three openings. 6-stroke maximum per hole; plays to a carnival waltz.
- **Glow Golf**: a second mini course, played at night under blacklight, 18 holes, par 50. Neon walls, speckled carpet, a starry sky and new pieces: portals that warp the ball across the hole, sliding doors, a spinning bar, pinball bumpers that kick the ball away, speed strips, an ice rink, sand traps, an island green with a narrow bridge. Plays to a synthwave track. The back nine has a double warp, crosswind speed strips, twin counter-rotating spinners, an ice dogleg, three sliding gates at rush hour, a moon pool reached only by portal, a bumper bank shot, a boosted hyperloop and a grand finale that uses a bit of everything.

Round progress on any course saves after each hole (single player).

## Multiplayer and settings

- **Pass and play** for up to 4 players on one device: name each player on the start screen. Each gets a coloured ball; tee shots go in honours order (best score on the last hole first), then the player farthest from the hole plays next. The scorecard shows every player and names the winner.
- **Settings** (start screen, or Setup in game): **Sound effects** and **Music** on/off (also M and N), a **Music volume** slider, **Left-handed** mirrors the layout so the swing pad sits on the other side and flips draw/fade and hook/slice; **Gimmes** turns automatic tap-ins inside 2.5 ft on or off.
- **Driving Range**: unlimited balls in calm wind, with staggered target flags at 50 to 250 yds. Every full swing (80%+ power) is logged per club, keeping the last 40. **Card** shows your carry, spread and left/right bias.
- **My Course**: a par 3, 4 and 5 rebuilt from your range numbers each time you play:
  - the par 3 plays at the carry of your most accurate iron or wedge
  - the par 4 doglegs where your drives land, bending with your ball flight, then your most-hit approach club
  - the par 5 is driver, then your better fairway wood or hybrid, then your most accurate wedge
  - fairways and greens are sized to your spread, and hazards sit on the side you don't miss to

Range data and best scores live in your browser's local storage.

## Controls

| Input | Action |
| --- | --- |
| Swing pad | Pull back, then flick up through the ball. Flick speed is power (past 100% gets wild); an angled flick hooks or slices. |
| ← → or drag on the course | Aim (hold Shift for fine aim) |
| ↑ ↓ | Change club |
| Q / E | Shape the shot: draw or fade |
| Scroll wheel / trackpad | Scroll back to load the swing, then scroll forward fast through the ball; forward speed is power. On putts, how far you scroll back sets the strength. Sideways trackpad drift curves the shot. |
| Space | Keyboard swing: hold for power, release, tap as the needle crosses the white zone |
| V | Look at the landing area |
| C | Scorecard |
| M | Sound effects on/off (also in Settings) |
| N | Music on/off (also in Settings) |

## What's in it

- Ball flight from a physics model: drag, spin lift, wind, and surface-dependent bounce and roll
- Hazards and greens with shape: ponds, streams and sandy washes that follow any line, two-tier greens, mounds and bowls, and landmarks that stop the ball like a tree
- Launch monitor readout after every shot
- Landing ring, "plays like" distances adjusted for elevation, and auto club selection
- Putting: slope grid, putts pre-aimed for the break, an aim ring, a read line, and gimmes inside 2.5 ft
- A gold PIN marker on the power gauge showing roughly the power that carries to the pin
- Shot callouts with synthesized crowd applause and groans
- Music with its own 64-bar tune per course (verse, verse, bridge, verse, with more instruments joining on the repeats): slow-swing clubhouse jazz at Harrow Pines, a Celtic jig over a drone at Saltmarsh Links, a spaghetti-western ballad at Red Mesa, a calliope waltz at mini golf, synthwave at Glow Golf, and a mellow bossa nova for My Course and the range. It is synthesized in the browser: chiptune leads over plucked strings, bells, pads and drums, in stereo with reverb and echo. Tunes cross-fade when you change course, and a short jingle in the tune's key plays for a par, birdie, eagle or ace
- Scorecard (front nine and back nine with Out, In and total), best round, and round resume saved in the browser. Best rounds were reset when the courses went to 18 holes, so a 9-hole best doesn't count against a full round
- Compact layout and touch controls on phones
- Graphics: real-time soft sun shadows, filmic tone mapping, a sky with sun glow and two layers of drifting cloud whose shadows cross the ground, layered trees with wind sway, swaying grass tufts around the camera, rippling water with reeds on the banks, wildflowers and rocks in the rough, and a High / Medium / Low quality setting (Medium by default on phones)
- Each course has its own light and backdrop: morning sun and wooded hills at Harrow Pines, a soft sea light with the ocean alongside at Saltmarsh Links, a low golden sun over banded mesas at Red Mesa, a fenced garden with bunting and lamps at mini golf, and a retro sunset, glowing grid and neon halos at Glow Golf
- Sand sprays from bunker shots, turf flies off irons, water splashes, and confetti bursts from the cup on a birdie or better

## Testing

`tests/playthrough.js` plays every course hole by hole in a headless browser with a simple bot: all five 9-hole courses, a 3-player pass-and-play round, and My Course. It also builds My Course from 40 random range logs, checks the layout of all 54 full-size holes (tee and cup in the right place, cup on a flat part of the green, streams crossable, landmarks off the fairway), plays every tune through a silent band to check the notes, and checks the start screen with browser storage blocked. It checks that every hole finishes, scores and totals add up, the ball never ends up in water or out of bounds, and nothing logs errors.

```bash
npm i -g playwright && npx playwright install chromium   # once
node tests/playthrough.js           # everything (slow without a GPU)
node tests/playthrough.js glow      # one course
node tests/playthrough.js layout    # just the hole layout check (also: music)
```
