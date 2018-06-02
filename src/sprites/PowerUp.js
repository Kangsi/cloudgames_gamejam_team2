import Sprite from '../services/Sprite';
import Phaser from 'phaser';
export default class PowerUp extends Sprite {
  constructor (type = 'power', value = 3) {
    super({
      asset: 'crate_spritesheet',
      inputEnabled: true,
      frame: 0,
    });

    this.animations.add('walk');
    this.animations.play('walk', 1, true);

    this.type = type;
    this.value = value;
    this.x = 200;
    this.y = 100;
    this.initY = Math.random() * 200;

    this.doTween();

    this.events.onInputUp.add(() => {
      game.addPowerUp.dispatch(this.type, this.value);
      this.destroy();
    });
  }

  doTween () {
    // game.add.tween(this).to({ y: this.initY + 100}, 1000, Phaser.Easing.Sinusoidal.InOut,
    // true, 0, -1, true);
  }

  update () {
    //  this.x += 2;
  }
}
