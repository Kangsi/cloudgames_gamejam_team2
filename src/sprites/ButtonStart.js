import Phaser from 'phaser';
import Sprite from '../services/Sprite';
import Text from '../services/Text';

export default class ButtonStart extends Sprite {
  constructor (x = 0, y = 0, callback, scope) {
    super({asset: 'slime_enemy', inputEnabled: true});

    this.x = x;
    this.y = y;

    this.events.onInputUp.add(() => {
      callback.call(scope, 'Game');
      game.sound.removeByKey('home');
    });
  }
}
