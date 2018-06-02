import Phaser from 'phaser';
import Sprite from '../services/Sprite';

export default class Bullet extends Sprite {
  constructor (x, y, rotation, speed, power) {
    super({
      asset: 'projectile',
    });
    this.speed = speed;
    this.x = x;
    this.y = y;
    this.power = power;
    game.addBullet.dispatch(this);
    // game.add.existing(this);
    game.physics.arcade.enable(this, Phaser.Physics.ARCADE);
    this.body.setCircle(32, 32, 32);

    this.rotation = rotation;
  }

  update () {
    this.x += this.speed * Math.sin(this.rotation);
    this.y -= this.speed * Math.cos(this.rotation);

    if (this.y <= 0) {
      this.destroy();
    }
  }

  destroyBullet () {
    game.removeBullet.dispatch(this);

    console.log('destroy');
    this.destroy();
  }
}
