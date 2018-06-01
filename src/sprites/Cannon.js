import Phaser from 'phaser';
import Sprite from '../services/Sprite';
import Overlay from '../services/Overlay';

export default class Cannon extends Phaser.Group {
  constructor (x = 0, y = 0) {
    super(game);

    this.x = x;
    this.y = y;

    this.buildCannon();
    this.buildHitbox();
  }

  buildCannon () {
    this.cannon = new Sprite({
      asset: 'mushroom',
      inputEnabled: true,
    });

    this.cannon.events.onInputUp.add(() => {
      console.log('cannon pressed');
    })

    this.add(this.cannon);
  }

  buildHitbox () {
    this.hitbox = new Overlay({
      alpha: 0.5,
      x: -game.width / 2,
      y: -this.y,
      width: game.width,
      height: this.y,
      color: '#00ff00',
      inputEnabled: true,
    });


    this.hitbox.events.onInputUp.add(() => {
      this.rotateCannon();
    });

    this.add(this.hitbox);
  }

  rotateCannon() {
    this.cannon.rotation = game.physics.arcade.angleToPointer(this.cannon);
  }
}
