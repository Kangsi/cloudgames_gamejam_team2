mport Phaser from 'phaser';
import Sprite from '../services/Sprite';
import Overlay from '../services/Overlay';

export default class Cannon extends Phaser.Group {
  constructor (x = 0, y = 0) {
    super(game);

    this.x = x;
    this.y = y;
    this.buildButton();
  }

  buildButton () {
    this.button = new Sprite({
      asset: 'mushroom',
      inputEnabled: true,
    });

    this.button.events.onInputUp.add(() => {
      game.fireButton.dispatch();
    }
    );

    this.add(this.button);
  }
}
