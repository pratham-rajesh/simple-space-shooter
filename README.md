# 🚀 Simple Space Shooter (HTML5 Canvas)

Minimal, dependency-free space shooter built with vanilla JavaScript and the HTML5 Canvas API.

Whether you're exploring basic game loops, delta-time movement, or collision detection, this repo is a compact, well-commented example you can read, modify, and extend.

---

✨ Highlights
- No build tools or external libraries — just static files you can serve from any HTTP server.
- Delta-time based motion (frame-rate independent).
- Simple game state machine: Start → Playing → Game Over.
- Persistent best score via localStorage.

🕹️ Controls
- Move: ArrowLeft / ArrowRight or A / D
- Shoot: Space (one bullet per press; 200 ms cooldown)
- Start / Restart: Enter

🎮 Gameplay & Difficulty
- Rocks spawn at the top and fall downwards. Destroy rocks with bullets for +10 points each.
- Initial spawn interval: 900 ms. Initial rock fall speed: 80 px/s.
- Difficulty ramps every 12 seconds: spawn interval decreases by 80 ms (min 300 ms) and rock speed increases by 20 px/s.
- Rocks that pass the bottom are removed silently. Collision between a rock and the player ends the game.

🧠 Design Notes
- Bullet vs. rock collision uses an AABB (axis-aligned bounding box) vs. circle test.
- Player is drawn as a simple triangle; bullets are small rectangles; rocks use circles.
- Best score stored under the `bestScore` key in `localStorage`.

📁 Project Structure

- `index.html` — page, canvas element, and module entry.
- `styles.css` — minimal styles, HUD and overlay layout.
- `src/main.js` — bootstrap, canvas fit logic, main loop, UI wiring.
- `src/game.js` — game state, spawn logic, difficulty, scoring, collisions.
- `src/entities.js` — `Player`, `Bullet`, `Rock` classes and draw/update logic.
- `src/input.js` — keyboard manager with `pressed` and `justPressed` semantics.
- `src/utils.js` — helpers (clamp, random range, collision helpers, time).
- `test/run-tests.mjs` — small node-based tests for utility functions.
- `package.json` — minimal metadata and test script.

🚀 Run locally

1. Start a static server in the project folder. For example with Python 3:

```bash
python -m http.server
```

2. Open http://localhost:8000 in a browser.

🧪 Run tests

Requires Node.js. From the project root:

```bash
npm test
```

This runs `node test/run-tests.mjs` and exercises a few utility functions.

🛠️ Development notes
- Input handling clears key state on `window.blur` to avoid stuck keys when changing focus.
- The HUD and overlay are single persistent DOM elements to avoid per-frame DOM churn.
- For debugging, a small on-screen debug panel is available when running locally.

🙏 Contributions & License
- This is intended as a learning/demo project. Feel free to fork and modify.
- No license file included — add one if you plan to distribute or publish.

---

If you'd like, I can also:
- Add a polished icon and favicon.
- Add more unit tests (entities, game logic).
- Create a small GitHub Actions workflow to run the tests automatically.

Enjoy — and let me know if you want new features (power-ups, sound, levels)! 🎯
