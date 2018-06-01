/* globals __DEV__ */
import Phaser from 'phaser';
import Cannon from '../sprites/Cannon';
import FireButton from '../sprites/FireButton';

export default class extends Phaser.State {
  init () {

  }
  preload () {
    game.fireButton = new Phaser.Signal();
  }

  create () {
    this.cannon = new Cannon(game.width / 2, game.height * 0.75);
    this.fireButton = new FireButton(game.width * 0.75, game.height * 0.75);
  }

  render () {

  }
}
