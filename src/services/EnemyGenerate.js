import Phaser from 'phaser';
import Enemy from '../sprites/Enemy'

export default class EnemyGenerate extends Phaser.GROUP {
  constructor (amount) {
    super(game);
    let enemies = [];
    let amount = amount;
    this.x = game.width;
    this.y = -1000;
    this.spawn(this.spawnEnemies(amount));
  }

  static spawnEnemies () {
    for (let i = 0; i < 20; i++) {
      const tempEnemy = new Enemy();
      game.add.existing(tempEnemy);
      this.enemies.push(tempEnemy);
    }
  }

  update () {
    this.update();
  }
}
