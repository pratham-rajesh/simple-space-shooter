<<<<<<< HEAD
# simple-space-shooter
# Space Shooter (HTML5 Canvas)

Minimal vanilla JS space shooter using HTML5 Canvas.

Run
- Start a static server in the project folder. For example with Python 3:

  python -m http.server

- Open http://localhost:8000 in your browser (tested on latest Chrome).

Controls
- Move: ArrowLeft / ArrowRight or A / D
- Shoot: Space (one bullet per press, 200ms cooldown)
- Start / Restart: Enter

Gameplay & Difficulty
- Rocks spawn from the top and fall downward. Destroy them with bullets to gain 10 points each.
- Initial spawn interval: 900 ms. Initial rock fall speed: 80 px/s.
- Every 12 seconds: spawn interval reduced by 80 ms (min 300 ms) and rock speed increased by 20 px/s.
- Rocks that leave the bottom are removed silently. Collision between rock and player ends the game.

Design Notes
- All movement uses delta time (seconds) from requestAnimationFrame to make motion frame-rate independent.
- Collision: Bullets use AABB and rocks are circles; collision uses rect-vs-circle helper.
- Player is a simple triangle; bullets are small rectangles; rocks are circles.
- Best score is saved in localStorage under key `bestScore`.

Files
- `index.html` - page and canvas
- `styles.css` - minimal styling
- `src/main.js` - bootstrap, loop, UI overlay
- `src/game.js` - game state, spawn, difficulty, score, collisions
- `src/entities.js` - Player, Bullet, Rock classes
- `src/input.js` - keyboard manager
- `src/utils.js` - collision and math helpers

Notes
- No external libraries or build steps required. Works with any static server.
- Tested in Chrome (desktop) during development.
=======
# Space Shooter (HTML5 Canvas)

Minimal vanilla JS space shooter using HTML5 Canvas.

Run
- Start a static server in the project folder. For example with Python 3:

  python -m http.server

- Open http://localhost:8000 in your browser (tested on latest Chrome).

Controls
- Move: ArrowLeft / ArrowRight or A / D
- Shoot: Space (one bullet per press, 200ms cooldown)
- Start / Restart: Enter

Gameplay & Difficulty
- Rocks spawn from the top and fall downward. Destroy them with bullets to gain 10 points each.
- Initial spawn interval: 900 ms. Initial rock fall speed: 80 px/s.
- Every 12 seconds: spawn interval reduced by 80 ms (min 300 ms) and rock speed increased by 20 px/s.
- Rocks that leave the bottom are removed silently. Collision between rock and player ends the game.

Design Notes
- All movement uses delta time (seconds) from requestAnimationFrame to make motion frame-rate independent.
- Collision: Bullets use AABB and rocks are circles; collision uses rect-vs-circle helper.
- Player is a simple triangle; bullets are small rectangles; rocks are circles.
- Best score is saved in localStorage under key `bestScore`.

Files
- `index.html` - page and canvas
- `styles.css` - minimal styling
- `src/main.js` - bootstrap, loop, UI overlay
- `src/game.js` - game state, spawn, difficulty, score, collisions
- `src/entities.js` - Player, Bullet, Rock classes
- `src/input.js` - keyboard manager
- `src/utils.js` - collision and math helpers

Notes
- No external libraries or build steps required. Works with any static server.
- Tested in Chrome (desktop) during development.
>>>>>>> 4c6bbd9 (Initial commit: simple space shooter)
