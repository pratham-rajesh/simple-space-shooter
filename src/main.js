import { Game } from './game.js';
import { setupInput, isDown, justPressed } from './input.js';

// ===== Initialization ======================================================
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

function fitCanvas(){
  const maxW = 800, maxH = 600;
  const vw = Math.min(window.innerWidth - 40, maxW);
  const vh = Math.min(window.innerHeight - 40, maxH);
  const ratio = canvas.width / canvas.height;
  let w = vw; let h = Math.round(w / ratio);
  if(h > vh){ h = vh; w = Math.round(h * ratio); }
  canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
}
window.addEventListener('resize', fitCanvas);
fitCanvas();

// Input
setupInput();

// Game instance
const game = new Game(canvas.width, canvas.height);
window.__GAME = game; // helpful for quick debugging

// ===== UI elements ========================================================
const overlay = document.getElementById('overlay');
const hud = document.createElement('div'); hud.className = 'hud'; overlay.appendChild(hud);
let centerBox = null;

function setOverlayInteractive(v){ overlay.style.pointerEvents = v ? 'auto' : 'none'; }
function setHUDVisible(v){ hud.style.display = v ? 'flex' : 'none'; }
function clearCenter(){ if(centerBox && centerBox.parentNode) centerBox.parentNode.removeChild(centerBox); centerBox = null; }

function createCenterBox(html){ clearCenter(); centerBox = document.createElement('div'); centerBox.className = 'centerText'; centerBox.innerHTML = html; overlay.appendChild(centerBox); return centerBox; }

function showStart(){
  createCenterBox(`<div class="title">Space Shooter</div>
    <div class="hint">Arrows / A D to move, Space to shoot</div>
    <div class="hint">Destroy rocks to score. Avoid collisions.</div>
    <div class="btn" id="startBtn">Press Enter to Start</div>`);
  setOverlayInteractive(true);
  setHUDVisible(false);
  const btn = document.getElementById('startBtn');
  if(btn) btn.addEventListener('click', ()=>{ game.start(); });
}

function showGameOver(){
  createCenterBox(`<div class="title">Game Over</div><div class="small">Score: ${game.score} — Best: ${game.best}</div><div class="hint">Press Enter to Restart</div>`);
  setOverlayInteractive(true);
  setHUDVisible(true);
}

function updateHUD(){ hud.innerHTML = `<div class="score">Score: ${game.score}</div><div class="time">Time: ${Math.floor(game.elapsed)}s</div>`; }

// Debug panel
const debugDiv = document.createElement('div');
Object.assign(debugDiv.style, { position:'fixed', left:'12px', bottom:'12px', padding:'8px 10px', background:'rgba(0,0,0,0.6)', color:'#cfe', fontFamily:'monospace', fontSize:'12px', zIndex:9999, pointerEvents:'none' });
document.body.appendChild(debugDiv);

// initial UI state
hud.style.display = 'none';
showStart();

// wire start & game callbacks
game.onStartCallback = ()=>{ setOverlayInteractive(false); setHUDVisible(true); clearCenter(); };
game.onGameOverCallback = ()=>{ showGameOver(); updateHUD(); };

// ===== Input wrapper ======================================================
function gatherInput(){
  return {
    isLeft: isDown('ArrowLeft') || isDown('KeyA'),
    isRight: isDown('ArrowRight') || isDown('KeyD'),
    shootPressed: justPressed('Space')
  };
}

// Enter handler for keyboard start/restart
window.addEventListener('keydown', (e)=>{
  if(e.code !== 'Enter') return;
  if(game.state === 'start') { game.start(); }
  else if(game.state === 'game_over'){ game.reset(); showStart(); updateHUD(); }
});

// ===== Main loop =========================================================
let last = performance.now();
let lastGameState = game.state;

function loop(now){
  const dt = Math.min(0.05, (now - last) / 1000);
  last = now;

  const input = gatherInput();
  game.update(dt, input);

  // state transition handling
  if(game.state !== lastGameState){
    if(game.state === 'playing') { setOverlayInteractive(false); setHUDVisible(true); clearCenter(); }
    else if(game.state === 'start') { setOverlayInteractive(true); setHUDVisible(false); showStart(); }
    else if(game.state === 'game_over') { setOverlayInteractive(true); setHUDVisible(true); showGameOver(); }
    lastGameState = game.state;
  }

  // draw
  ctx.clearRect(0,0,canvas.width, canvas.height);
  const ratio = canvas.width / parseInt(canvas.style.width,10) || 1;
  if(ratio !== 1){ ctx.save(); ctx.scale(ratio, ratio); }
  game.draw(ctx);
  if(ratio !== 1) ctx.restore();

  // update HUD and debug
  updateHUD();
  try{ debugDiv.textContent = `state=${game.state} score=${game.score} rocks=${game.rocks.length} bullets=${game.bullets.length} playerX=${Math.round(game.player.x)} playerY=${Math.round(game.player.y)}`; }catch(e){ debugDiv.textContent = `state=${game.state}`; }

  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
