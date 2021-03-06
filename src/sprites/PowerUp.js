import Sprite from '../services/Sprite';
import Phaser from 'phaser';
export default class PowerUp extends Sprite {
  constructor ({asset, type = 'power', value = 3}) {
    super({
      asset: asset,
      inputEnabled: true,
      frame: 0,
    });

    game.physics.arcade.enable(this, Phaser.Physics.ARCADE);

    this.type = type;
    this.value = value;
    this.x = 200;
    this.y = 100;
    this.initY = Math.random() * 200;

    game.addPowerUp.dispatch(this);

    this.events.onInputUp.add(() => {
      this.kill();
    });
  }

  kill () {
    game.addPowerUpToCannon.dispatch(this.type, this.value);

    this.destroy();
    game.removePowerUp.dispatch(this);
  }
}
