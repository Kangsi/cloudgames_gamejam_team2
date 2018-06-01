import Phaser from 'phaser';
import Sprite from '../services/Sprite';

export default class Bullet extends Sprite {
  constructor (x, y, rotation, speed) {
    super({
      asset: 'mushroom'
    });
    this.speed = speed;
    this.x = x;
    this.y = y;
    this.rotation = rotation;

    game.addBullet.dispatch(this);
    game.add.existing(this);

    game.physics.arcade.enable(this, Phaser.Physics.ARCADE);
    this.body.setCircle(30);
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
