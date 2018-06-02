import Phaser from 'phaser';
import Enemy from '../sprites/Enemy';
import Cannon from '../sprites/Cannon';

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
      const randomX = Math.random() * this.x;
      const randomY = Math.random() * this.y;
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
