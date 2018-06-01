import Phaser from 'phaser';
import Sprite from '../services/Sprite';
import Overlay from '../services/Overlay';

export default class Enemy extends Sprite {
  constructor (x = 0, y = 0) {
    super({asset: 'mushroom'});

    this.x = x;
    this.y = y;

    game.addEnemy.dispatch(this);

    game.physics.arcade.enable(this, Phaser.Physics.ARCADE);
    this.body.setCircle(30)
    this.speed = 4;
  }

  update () {
    this.y += this.speed;

    if (this.y >= 950) {
      this.kill();
    }
  }

  kill () {
    game.removeEnemy.dispatch(this);
    this.destroy();
  }
}
