/* globals __DEV__ */
import Phaser from 'phaser';
import ButtonMute from '../sprites/ButtonMute';
import ButtonStart from '../sprites/ButtonStart';
import Text from '../services/Text';
import Sprite from '../services/Sprite';

export default class extends Phaser.State {
  init () { }
  preload () { }

  create () {
    const background = new Sprite({
      asset: 'home_background',
      anchorX: 0,
      anchorY: 0
    });

    background.scale.setTo(2 / 3);

    game.add.existing(background);

    this.buttonMute = new ButtonMute(game.width / 2, game.height * 0.85, this.switchGameState, this);
    game.sound.play('home', 1, true);

    this.game.add.existing(this.buttonMute);

    this.buttonStart = new ButtonStart(game.width / 2, game.height * 0.7, this.switchGameState, this);
    this.game.add.existing(this.buttonStart);

    this.logo = new Sprite({
      asset: 'logo',
      x: game.width / 2,
      y: game.height * 0.3,
    });

    this.game.add.existing(this.logo);

    this.Text = new Text({
      text: 'Monster\nBarricade',
      x: game.width / 2,
      y: game.height * 0.42,
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
