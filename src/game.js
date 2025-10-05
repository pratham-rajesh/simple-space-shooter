import { Player, Bullet, Rock } from './entities.js';
import { randRange, clamp, rectCircleColliding } from './utils.js';

const GAME_STATES = { START: 'start', PLAYING: 'playing', GAME_OVER: 'game_over' };

export class Game{
  constructor(width, height){
    this.width = width; this.height = height;
    this.state = GAME_STATES.START;
    this.player = new Player(width/2, height - 50);
    this.bullets = [];
    this.rocks = [];
    this.score = 0;
    this.best = parseInt(localStorage.getItem('bestScore')||'0',10);
    this.elapsed = 0;

    // Difficulty model
    this.spawnInterval = 0.9; // seconds
    this.spawnTimer = 0;
    this.rockSpeed = 80; // px/s
    this.difficultyTick = 12; // every 12s
    this.nextDifficultyAt = this.difficultyTick;
    this.minSpawn = 0.3;

    // tuning
    this.rockRadiusRange = [10, 30];

    this.onGameOverCallback = null;
    this.onStartCallback = null;
  }

  reset(){
    this.state = GAME_STATES.START;
    this.player = new Player(this.width/2, this.height - 50);
    this.bullets.length = 0; this.rocks.length = 0; this.score = 0; this.elapsed = 0;
    this.spawnInterval = 0.9; this.spawnTimer = 0; this.rockSpeed = 80; this.nextDifficultyAt = this.difficultyTick;
  }

  start(){ this.state = GAME_STATES.PLAYING; if(this.onStartCallback) this.onStartCallback(); }

  update(dt, input){
    if(this.state === GAME_STATES.START) return;
    if(this.state === GAME_STATES.GAME_OVER) return;

    this.elapsed += dt;

    // difficulty ramp
    if(this.elapsed >= this.nextDifficultyAt){
      this.spawnInterval = Math.max(this.minSpawn, this.spawnInterval - 0.08);
      this.rockSpeed += 20;
      this.nextDifficultyAt += this.difficultyTick;
    }

    // player
    this.player.update(dt, input, this.width);

    // shooting
    if(input.shootPressed && this.player.canShoot()){
      this.player.shoot();
      this.bullets.push(new Bullet(this.player.x, this.player.y - this.player.h/2));
    }

    // bullets
    for(const b of this.bullets) b.update(dt);
    // rocks
    for(const r of this.rocks) r.update(dt);

    // spawn
    this.spawnTimer -= dt;
    if(this.spawnTimer <= 0){
      this.spawnTimer = this.spawnInterval;
      this.spawnRock();
    }

    // collisions bullet-rock
    for(const b of this.bullets){
      for(const r of this.rocks){
        if(r.dead || b.dead) continue;
        const rect = { x: b.x - b.w/2, y: b.y - b.h, w: b.w, h: b.h };
        const circ = { x: r.x, y: r.y, r: r.r };
        if(rectCircleColliding(rect, circ)){
          b.dead = true; r.dead = true; this.score += 10;
        }
      }
    }

    // rock-player collision
    const pbox = this.player.getAABB();
    for(const r of this.rocks){
      if(r.dead) continue;
      if(rectCircleColliding(pbox, r)){
        this.endGame();
      }
    }

    // cleanup
    this.bullets = this.bullets.filter(b=>!b.dead);
    this.rocks = this.rocks.filter(r=>!r.dead && r.y - r.r <= this.height + 50);
  }

  spawnRock(){
    const r = randRange(this.rockRadiusRange[0], this.rockRadiusRange[1]);
    const x = randRange(r, this.width - r);
    const y = -r - randRange(0,40);
    const vy = this.rockSpeed + randRange(-10,30);
    this.rocks.push(new Rock(x,y,r,vy));
  }

  endGame(){
    this.state = GAME_STATES.GAME_OVER;
    if(this.score > this.best){ this.best = this.score; localStorage.setItem('bestScore', String(this.best)); }
    if(this.onGameOverCallback) this.onGameOverCallback();
  }

  draw(ctx){
    // clear is done by main
    // draw player
    if(this.state !== GAME_STATES.START) this.player.draw(ctx);

    // draw bullets
    for(const b of this.bullets) b.draw(ctx);
    // draw rocks
    for(const r of this.rocks) r.draw(ctx);
  }
}
