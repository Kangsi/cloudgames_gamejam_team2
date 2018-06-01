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

    game.physics.arcade.enable(this.bullet, Phaser.Physics.ARCADE);
    this.bullet.body.setCircle(45);

    this.bullet.body.onCollide = new Phaser.Signal();
    this.bullet.body.onCollide.add(this.destroyBullet, this);
  }

  update () {
    this.x += this.speed * Math.sin(this.rotation);
    this.y -= this.speed * Math.cos(this.rotation);
    if (this.y <= 0) {
      this.destroy();
    }
  }

  render () {
    game.debug.body(this.bullet);
  }

  destroyBullet() {
    console.log('destroy')
    this.destroy();
  }
}
