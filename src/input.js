// Simple keyboard manager
const keys = new Map();

export function setupInput(){
  window.addEventListener('keydown', (e)=>{
    const k = e.code;
    const entry = keys.get(k);
    if(!entry || !entry.pressed) keys.set(k, {pressed:true, justPressed:true});
    // prevent page scroll for arrows and space
    if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Space'].includes(k)) e.preventDefault();
  });
  window.addEventListener('keyup', (e)=>{
    keys.set(e.code, {pressed:false, justPressed:false});
  });

  // Clear keys on window blur to avoid 'stuck' keys after clicks or focus loss
  window.addEventListener('blur', ()=>{ keys.clear(); });
}

export function isDown(code){ const s = keys.get(code); return !!s && s.pressed; }
export function justPressed(code){ const s = keys.get(code); if(!s) return false; const v = s.justPressed; if(v) s.justPressed=false; return v; }

// convenience mapping
export const Key = {
  LEFT:['ArrowLeft','KeyA'],
  RIGHT:['ArrowRight','KeyD'],
  SHOOT:['Space'],
  START:['Enter']
};

export function anyDown(list){ return list.some(c=>isDown(c)); }
export function anyJustPressed(list){ return list.some(c=>justPressed(c)); }

// Expose a method to programmatically clear keys
export function clearAll(){ keys.clear(); }
