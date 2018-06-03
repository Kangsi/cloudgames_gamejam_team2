import Text from '../services/Text';
import Sprite from '../services/Sprite';

import Phaser from 'phaser';
export default class Wave extends Phaser.Group {
  constructor () {
    super(game);
    this.x = game.width;
    this.y = game.height;

    this.wave = 0;

    this.buildBackground();
    this.buildText();

    game.updateWave.add((value) => {
      this.updateScore(value);
    });
  }

  buildBackground () {
    this.background = new Sprite({
      asset: 'corner_display',
      anchorY: 1,
      anchorX: 0,
    });

    this.background.scale.setTo(-1, 1);

    this.add(this.background);
  }

  buildText () {
    this.text = new Text({
      text: `Wave: 1`,
      anchorX: 1,
      fontSize: 20,
      x: -10,
      y: -30,
    });

    this.add(this.text);
  }

  updateScore (value) {
    this.wave = value;
    this.text.text = `Wave: ${this.wave}`;
  }
}
