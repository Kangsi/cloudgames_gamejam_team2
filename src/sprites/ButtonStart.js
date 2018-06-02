import Phaser from 'phaser';
import Sprite from '../services/Sprite';
import Text from '../services/Text';

export default class ButtonStart extends Sprite {
  constructor (x = 0, y = 0, callback, scope) {
    super({asset: 'blue_button', inputEnabled: true});

    this.x = x;
    this.y = y;

    this.buildText();
    this.events.onInputUp.add(() => {
      callback.call(scope, 'Game');
    });
  }


  buildText () {
    this.text = new Text({
      text: 'Start',
      anchorX: 0.5,
      anchorY: 0.5,
      fontSize: 30,
    });

    this.addChild(this.text);
  }
}
