# Harrow Pines Golf

A golf game that runs in the browser: three 9-hole courses, a driving range, and **My Course**, three holes built from your own range data. It's a single HTML file built on [Three.js](https://threejs.org/) r128 (loaded from cdnjs), with no build step.

## Play

Play online at **https://hartj77-blip.github.io/harrow-pines-golf/** (GitHub Pages, served from the `main` branch root).

Or open `index.html` locally in a browser, or serve the folder with any static host.

## Modes

- **Harrow Pines**: pine-lined parkland, 9 holes, par 35.
- **Saltmarsh Links**: seaside dunes, golden fescue, pot bunkers, sea inlets and stronger wind; 9 holes, par 36.
- **Red Mesa**: desert target golf with sandy scrub, palms, red buttes and elevated tees; 9 holes, par 36.

Round progress on any course saves after each hole (single player).

## Multiplayer and settings

- **Pass and play** for up to 4 players on one device: name each player on the start screen. Each gets a coloured ball; tee shots go in honours order (best score on the last hole first), then the player farthest from the hole plays next. The scorecard shows every player and names the winner.
- **Settings** (start screen, or Setup in game): **Left-handed** mirrors the layout so the swing pad sits on the other side and flips draw/fade and hook/slice; **Gimmes** turns automatic tap-ins inside 2.5 ft on or off.
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
| Space | Keyboard swing: hold for power, release, tap as the needle crosses the white zone |
| V | Look at the landing area |
| C | Scorecard |
| M | Sound effects on/off |
| N | Music on/off |

## What's in it

- Ball flight from a physics model: drag, spin lift, wind, and surface-dependent bounce and roll
- Launch monitor readout after every shot
- Landing ring, "plays like" distances adjusted for elevation, and auto club selection
- Putting: slope grid, putts pre-aimed for the break, an aim ring, a read line, and gimmes inside 2.5 ft
- A gold PIN marker on the power gauge showing roughly the power that carries to the pin
- Shot callouts with synthesized crowd applause and groans
- 8-bit music with its own tune per course: slow-swing clubhouse jazz at Harrow Pines, a Celtic jig over a drone at Saltmarsh Links, a spaghetti-western ballad at Red Mesa, and a mellow bossa nova for My Course and the range
- Scorecard, best round, and round resume saved in the browser
- Compact layout and touch controls on phones
