/* globals __DEV__ */
import Phaser from 'phaser';
import Cannon from '../sprites/Cannon';
import Enemy from '../sprites/Enemy';
import GameManager from '../services/GameManager';
import EnemyGenerate from '../services/EnemyGenerate';
import Bullets from '../sprites/Bullets';
import Enemies from '../sprites/Enemies';

export default class extends Phaser.State {
  init () {
    const background = game.add.sprite(-50, -50, 'background');
    background.scale.setTo(1.2);
  }
  preload () {
    game.fireButton = new Phaser.Signal();
    game.addBullet = new Phaser.Signal();
    game.removeBullet = new Phaser.Signal();
    game.spawnEnemies = new Phaser.Signal();
    game.addEnemy = new Phaser.Signal();
    game.removeEnemy = new Phaser.Signal();
  }

  create () {
    this.gameManager = new GameManager();
    this.game.enemies = new Enemies();
    this.enemyGenerate = new EnemyGenerate(10);
    this.game.bullets = new Bullets();
    this.cannon = new Cannon(game.width / 2, game.height * 0.75);
  }

  render () {
    // for (let i = 0; i < this.gameManager.bullets.length; i += 1) {
    //   game.debug.body(this.gameManager.bullets[i]);
    // }

    // for (let i = 0; i < this.gameManager.enemies.length; i += 1) {
    //   game.debug.body(this.gameManager.enemies[i]);
    // }
  }
}
