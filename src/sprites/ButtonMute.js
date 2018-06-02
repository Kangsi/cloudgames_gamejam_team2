import Phaser from 'phaser';
import Sprite from '../services/Sprite';
import Text from '../services/Text';

export default class ButttonMute extends Sprite {
  constructor (x = 0, y = 0, callback, scope) {
    super({asset: 'slime_enemy', inputEnabled: true});

    this.x = x;
    this.y = y;

    this.events.onInputUp.add(() => {
      if (!game.sound.mute) {
        game.sound.mute = true;
      } else {
        game.sound.mute = false;
      }
    });
  }
}
