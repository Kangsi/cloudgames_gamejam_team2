import Phaser from 'phaser';
import Sprite from '../services/Sprite';
import Text from '../services/Text';

export default class Enemy extends Sprite {
  constructor (x, y, minSpeed, maxSpeed, health) {
    super({asset: 'slime_enemy'});

    this.x = x;
    this.y = y;

    game.addEnemy.dispatch(this);

    this.minSpeed = minSpeed;
    this.maxSpeed = maxSpeed;

    this.health = health;

    game.physics.arcade.enable(this, Phaser.Physics.ARCADE);
    this.body.setSize(130, 170);
    this.speed = 4;
  }

  update () {
    this.y += Math.floor((Math.random() * this.maxSpeed) + this.minSpeed);
    if (this.y >= 950) {
      this.deathCheck();
      this.kill();
    }
  }

  kill () {
    game.removeEnemy.dispatch(this);
    this.destroy();
  }

  deathCheck () {
    let count = 3;
    console.log("Counter: " + count);
    if (count <= 0) {
      count--;
    } else {
      this.gameOver();
    }
  }
}
