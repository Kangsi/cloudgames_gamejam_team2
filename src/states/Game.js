/* globals __DEV__ */
import Phaser from 'phaser';
import Cannon from '../sprites/Cannon';
import Enemy from '../sprites/Enemy';
import GameManager from '../services/GameManager';
import EnemyGenerate from '../services/EnemyGenerate';
import Bullets from '../sprites/Bullets';
import Enemies from '../sprites/Enemies';
import PowerUps from '../sprites/PowerUps';

import Ammo from '../sprites/Ammo';

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
    game.addPowerUp = new Phaser.Signal();
    game.removePowerUp = new Phaser.Signal();

    game.addPowerUpToCannon = new Phaser.Signal();

  }

  create () {
    this.gameManager = new GameManager();
    this.game.enemies = new Enemies();
    this.enemyGenerate = new EnemyGenerate(10);
    this.game.bullets = new Bullets();
    this.cannon = new Cannon(game.width / 2, game.height * 0.75);
    this.game.powerUps = new PowerUps();
    this.ammo = new Ammo();
    this.game.add.existing(this.ammo);
  }

  render () {
    for (let i = 0; i < this.gameManager.bullets.length; i += 1) {
      game.debug.body(this.gameManager.bullets[i]);
    }
    for (let i = 0; i < this.gameManager.powerUps.length; i += 1) {
      game.debug.body(this.gameManager.powerUps[i]);
    }
    // for (let i = 0; i < this.gameManager.enemies.length; i += 1) {
    //   game.debug.body(this.gameManager.enemies[i]);
    // }
  }
}
