import Sprite from '../services/Sprite';
import Phaser from 'phaser';
export default class PowerUp extends Sprite {
  constructor ({asset, type = 'power', value = 3}) {
    super({
      asset: asset,
      inputEnabled: true,
      frame: 0,
    });

    this.animations.add('walk');
    this.animations.play('walk', 30, true);
    game.physics.arcade.enable(this, Phaser.Physics.ARCADE);

    this.type = type;
    this.value = value;
    this.x = 200;
    this.y = 100;
    this.initY = Math.random() * 200;

    game.addPowerUp.dispatch(this);

    this.events.onInputUp.add(() => {
      game.addPowerUpToCannon.dispatch(this.type, this.value);
      this.kill();
    });
  }

  kill() {
    this.destroy();
    game.removePowerUp.dispatch(this)
  }
}
