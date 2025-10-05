// Utility helpers
export function clamp(v, a, b){ return Math.max(a, Math.min(b, v)); }
export function randRange(min, max){ return Math.random()*(max-min)+min; }

// AABB vs Circle collision
export function rectCircleColliding(rect, circle){
  const rx = rect.x;
  const ry = rect.y;
  const rw = rect.w;
  const rh = rect.h;
  const cx = circle.x;
  const cy = circle.y;
  const r = circle.r;

  // Find closest point to circle within rectangle
  const closestX = clamp(cx, rx, rx+rw);
  const closestY = clamp(cy, ry, ry+rh);
  const dx = cx - closestX;
  const dy = cy - closestY;
  return (dx*dx + dy*dy) <= r*r;
}

export function rectRectColliding(a, b){
  return !(a.x + a.w < b.x || a.x > b.x + b.w || a.y + a.h < b.y || a.y > b.y + b.h);
}

export function nowSeconds(){ return performance.now()/1000; }
