/* globals __DEV__ */
import Phaser from 'phaser';
import Cannon from '../sprites/Cannon';
import FireButton from '../sprites/FireButton';
import Enemy from '../sprites/Enemy';
import GameManager from '../services/GameManager';

export default class extends Phaser.State {
  init () {

  }
  preload () {
    game.fireButton = new Phaser.Signal();
    game.addBullet = new Phaser.Signal();
    game.removeBullet = new Phaser.Signal();

    game.addEnemy = new Phaser.Signal();
    game.removeEnemy = new Phaser.Signal();
  }

  create () {
    this.gameManager = new GameManager();

    this.cannon = new Cannon(game.width / 2, game.height * 0.75);
    this.fireButton = new FireButton(game.width * 0.75, game.height * 0.75);
    this.enemy = new Enemy(25, 25);
    this.game.add.existing(this.enemy);
  }

  render () {
    for (let i = 0; i < this.gameManager.bullets.length; i += 1) {
      game.debug.body(this.gameManager.bullets[i]);
    }

    for (let i = 0; i < this.gameManager.enemies.length; i += 1) {
      game.debug.body(this.gameManager.enemies[i]);
    }
  }
}
