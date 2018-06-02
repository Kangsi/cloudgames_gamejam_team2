/* globals __DEV__ */
import Phaser from 'phaser';
import ButtonMute from '../sprites/ButtonMute';
import ButtonStart from '../sprites/ButtonStart';
import Text from '../services/Text';

export default class extends Phaser.State {
  init () { }
  preload () { }

  create () {
    this.buttonMute = new ButtonMute(game.width / 2, (game.height / 4) * 3, this.switchGameState, this);
    this.game.add.existing(this.buttonMute);

    this.buttonStart = new ButtonStart(game.width / 2, (game.height / 4) * 2, this.switchGameState, this);
    this.game.add.existing(this.buttonStart);

    this.Text = new Text({
      text: 'HET BESTE SPEL\nVAN DE GAMEJAM',
      x: game.width / 2,
      y: game.height / 4,
      fontSize: 50,
    });
    this.game.add.existing(this.Text);
  }

  switchGameState (gamestate) {
    this.state.start(gamestate);
  }

  render () {

  }
}
