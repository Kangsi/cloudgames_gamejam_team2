import Text from '../services/Text';
import Sprite from '../services/Sprite';

import Phaser from 'phaser';
export default class Score extends Phaser.Group {
  constructor () {
    super(game);
    this.y = game.height;

    this.score = 0;

    this.buildBackground();
    this.buildText();

    game.updateScore.add((value) => {
      this.updateScore(value);
    });
  }

  buildBackground () {
    this.background = new Sprite({
      asset: 'corner_display',
      anchorY: 1,
      anchorX: 0,
    });

    this.add(this.background);
  }

  buildText () {
    this.text = new Text({
      text: `Score: 0`,
      anchorX: 0,
      fontSize: 20,
      x: 10,
      y: -30,
    });

    this.add(this.text);
  }

  updateScore (value) {
    this.score += value;
    this.text.text = `Score: ${this.score}`;
  }
}
