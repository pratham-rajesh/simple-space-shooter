import { strict as assert } from 'assert';
import { clamp, randRange, rectCircleColliding, rectRectColliding } from '../src/utils.js';

function testClamp(){
  assert.equal(clamp(5,0,10), 5);
  assert.equal(clamp(-1,0,10), 0);
  assert.equal(clamp(20,0,10), 10);
}

function testRandRange(){
  for(let i=0;i<10;i++){
    const r = randRange(1,2);
    assert.ok(r >= 1 && r <= 2, 'randRange out of bounds');
  }
}

function testRectCircle(){
  const rect = { x: 10, y: 10, w: 20, h: 20 };
  const circleInside = { x: 20, y: 20, r: 5 };
  const circleOutside = { x: 100, y: 100, r: 5 };
  assert.ok(rectCircleColliding(rect, circleInside));
  assert.equal(rectCircleColliding(rect, circleOutside), false);
}

function testRectRect(){
  const a = { x:0, y:0, w:10, h:10 };
  const b = { x:5, y:5, w:10, h:10 };
  const c = { x:20, y:20, w:5, h:5 };
  assert.ok(rectRectColliding(a,b));
  assert.equal(rectRectColliding(a,c), false);
}

function run(){
  testClamp();
  testRandRange();
  testRectCircle();
  testRectRect();
  console.log('All tests passed');
}

run();
