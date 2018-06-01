import Phaser from 'phaser';
import Sprite from '../services/Sprite';

export default class Cannon extends Phaser.Group {
  constructor (x, y, rotation, speed) {
    super(game);

    this.speed = speed;
    this.x = x;
    this.y = y;
    this.rotation = rotation;

    this.buildBullet();
  }

  buildBullet () {
    this.bullet = new Sprite({
      asset: 'mushroom',
    });

    this.add(this.bullet);
  }

  update () {
    this.x += this.speed * Math.sin(this.rotation);
    this.y -= this.speed * Math.cos(this.rotation);
    if (this.y <= 0) {
      this.destroy();
    }
  }
}
