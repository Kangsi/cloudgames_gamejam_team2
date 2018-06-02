/* globals __DEV__ */
import Phaser from 'phaser';
import Cannon from '../sprites/Cannon';
import GameManager from '../services/GameManager';
import EnemyGenerate from '../services/EnemyGenerate';
import Bullets from '../sprites/Bullets';
import Enemies from '../sprites/Enemies';
import PowerUps from '../sprites/PowerUps';
import EndScreen from '../sprites/EndScreen';

import PowerUpSpawner from '../services/PowerUpSpawner';

export default class extends Phaser.State {
  init () {
    const background = game.add.sprite(-50, -50, 'background');
    background.scale.setTo(1.1 * 2 / 3);
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
    game.updateCannon = new Phaser.Signal();
    game.doDamage = new Phaser.Signal();
    game.gameOver = new Phaser.Signal();
    game.destroyAll = new Phaser.Signal();
    game.resetGame = new Phaser.Signal();
    game.restart = new Phaser.Signal();
    game.toHome = new Phaser.Signal();
  }

  create () {
    game.restart.add(() => {
      this.restart();
    });

    game.toHome.add(() => {
      this.toHome();
    });

    this.gameManager = new GameManager();
    this.game.enemies = new Enemies();
    this.enemyGenerate = new EnemyGenerate();
    this.game.bullets = new Bullets();
    const wall = game.add.sprite(-50, game.height + 50, 'wall');
    wall.anchor.setTo(0, 1);
    wall.scale.setTo(1.1 * 2 / 3);
    this.cannon = new Cannon(game.width / 2, game.height * 0.75);
    this.game.powerUps = new PowerUps();
    this.powerUpSpawner = new PowerUpSpawner();
    // this.ammo = new Ammo();
    // this.game.add.existing(this.ammo);
    this.endScreen = new EndScreen();
  }

  render () {
    // for (let i = 0; i < this.gameManager.bullets.length; i += 1) {
    //   game.debug.body(this.gameManager.bullets[i]);
    // }
    for (let i = 0; i < this.gameManager.powerUps.length; i += 1) {
      game.debug.body(this.gameManager.powerUps[i]);
    }
    // for (let i = 0; i < this.gameManager.enemies.length; i += 1) {
    //   game.debug.body(this.gameManager.enemies[i]);
    // }
  }

  restart () {
    this.state.start('Game');
  }

  toHome () {
    this.state.start('Home');
  }
}
