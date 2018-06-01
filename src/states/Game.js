/* globals __DEV__ */
import Phaser from 'phaser'
import Cannon from '../sprites/Cannon';

export default class extends Phaser.State {
  init() {

  }
  preload() { }

  create() {
    this.cannon = new Cannon(game.width / 2, game.height * 0.75);
  }

  render() {

  }
}
