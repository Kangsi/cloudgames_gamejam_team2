import Phaser from 'phaser';
import Enemy from '../sprites/Enemy';

export default class EnemyGenerate extends Phaser.Group {
  constructor (amount) {
    super(game);
    this.enemies = [];
    this.amount = amount;
    this.x = game.width;
    this.y = -5000;
    this.spawnEnemies(amount);

    game.removeEnemy.add((enemy) => {
      this.removeEnemy(enemy);
    });
  }

  spawnEnemies () {
    for (let i = 0; i < this.amount; i++) {
      const randomX = Math.random() * game.width;
      const randomY = Math.random() * -10000;
      const tempEnemy = new Enemy(randomX, randomY);
      game.add.existing(tempEnemy);
      this.enemies.push(tempEnemy);
    }
  }

  update () {
  }

  removeEnemy (enemy) {
    const index = this.enemies.indexOf(enemy);

    if (index !== -1) {
      this.enemies.splice(index, 1);
    }

    if (this.enemies.length === 0) {
      this.spawnEnemies();
    }
  }
}
