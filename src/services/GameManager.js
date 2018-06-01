import Phaser from 'phaser';
import Sprite from '../services/Sprite';

export default class Cannon extends Phaser.Group {
  constructor () {
    super(game);
    this.bullets = [];

    game.addBullet.add((bullet) => {
      this.addBullet(bullet);
    });

    game.removeBullet.add((bullet) => {
      this.removeBullet(bullet);
    });
  }

  addBullet (bullet) {
    this.bullets.push(bullet);
  }

  removeBullet (bullet) {
    var index = this.bullets.indexOf(bullet);

    if (index > -1) {
      this.bullets.splice(index);
    }
  }
}
