/* globals __DEV__ */
import Phaser from 'phaser'
import Cannon from '../sprites/Cannon';
import Enemy from '../sprites/Enemy';

export default class extends Phaser.State {
  init() {

  }
  preload() { }

  create() {
    this.cannon = new Cannon(game.width / 2, game.height * 0.75);
    this.enemy = new Enemy(25, 25);
    this.game.add.existing(this.enemy);
  }

  render() {

  }
}
