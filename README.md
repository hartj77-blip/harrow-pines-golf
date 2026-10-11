# Harrow Pines Golf

A six-hole, par-23 golf game that runs in the browser. It's a single HTML file built on [Three.js](https://threejs.org/) r128 (loaded from cdnjs), with no build step.

## Play

Open `index.html` in a browser, or serve the folder with any static host. GitHub Pages works: Settings → Pages → deploy from the `main` branch.

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
| M | Sound on/off |

## What's in it

- Ball flight from a physics model: drag, spin lift, wind, and surface-dependent bounce and roll
- Launch monitor readout after every shot
- Landing ring, "plays like" distances adjusted for elevation, and auto club selection
- Putting slope grid, a partial putt read line, and gimmes inside 2 ft
- Shot callouts with crowd reactions
- Scorecard, best round, and round resume saved in the browser
- Compact layout and touch controls on phones
