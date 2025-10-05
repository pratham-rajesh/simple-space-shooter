import { clamp } from './utils.js';

export class Player{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.w = 36;
    this.h = 28; // for collision box
    this.speed = 320; // px/s
    this.cooldown = 0; // seconds
    this.cooldownMax = 0.2;
  }

  update(dt, input, canvasWidth){
    let dir = 0;
    if (input.anyDown) {
      // wrapper will fill anyDown
    }
    if(input.isLeft) dir -= 1;
    if(input.isRight) dir += 1;
    this.x += dir * this.speed * dt;
    // clamp center within canvas
    this.x = clamp(this.x, this.w/2, canvasWidth - this.w/2);
    this.cooldown = Math.max(0, this.cooldown - dt);
  }

  canShoot(){ return this.cooldown <= 0; }
  shoot(){ this.cooldown = this.cooldownMax; }

  draw(ctx){
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.fillStyle = '#66e0ff';
    ctx.beginPath();
    ctx.moveTo(0, -this.h/2);
    ctx.lineTo(this.w/2, this.h/2);
    ctx.lineTo(-this.w/2, this.h/2);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  getAABB(){
    return { x: this.x - this.w/2, y: this.y - this.h/2, w: this.w, h: this.h };
  }
}

export class Bullet{
  constructor(x,y){
    this.x = x; this.y = y; this.w = 4; this.h = 10; this.vy = -520; this.dead = false;
  }
  update(dt){ this.y += this.vy * dt; if(this.y + this.h < -10) this.dead = true; }
  draw(ctx){ ctx.fillStyle = '#fff'; ctx.fillRect(this.x - this.w/2, this.y - this.h, this.w, this.h); }
  getAABB(){ return { x: this.x - this.w/2, y: this.y - this.h, w: this.w, h: this.h }; }
}

export class Rock{
  constructor(x,y,r,vy){ this.x=x; this.y=y; this.r=r; this.vy=vy; this.dead=false; }
  update(dt){ this.y += this.vy * dt; }
  draw(ctx){ ctx.fillStyle = '#c9c9c9'; ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI*2); ctx.fill(); }
}
