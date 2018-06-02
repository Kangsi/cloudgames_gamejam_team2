import Text from '../services/Text';
import Phaser from 'phaser';
export default class Score extends Phaser.Group {
  constructor () {
    super(game);
    this.x = game.width * 0.2;
    this.y = game.height * 0.9;

    this.score = 0;

    this.buildText();

    game.updateScore.add((value) => {
      this.updateScore(value);
    });
  }

  buildText () {
    this.text = new Text({
      text: `Score: 0`,
      fontSize: 40
    });

    this.add(this.text);
  }

  updateScore (value) {
    this.score += value;
    this.text.text = `Score: ${this.score}`;
  }
}
