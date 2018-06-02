import Phaser from 'phaser';
import Enemy from '../sprites/Enemy';
import Levels from '../services/Levels';

export default class EnemyGenerate extends Phaser.Group {
  constructor () {
    super(game);
    this.levels = new Levels();

    this.enemies = [];
    this.x = game.width;
    this.y = -1000;

    this.spawnEnemies('slime_enemy');

    game.removeEnemy.add((enemy) => {
      this.removeEnemy(enemy);
    });
    game.spawnEnemies.add((level) => {
      this.spawnEnemies(level);
    });
  }

  spawnEnemies (name) {
    for (let i = 0; i < this.levels.amount; i++) {
      // random spawn place
      const randomX = Math.random() * this.x;
      const randomY = Math.random() * this.y;
      // pseudo random enemy speed
      const randomSpeed = Math.random() * (this.levels.maxSpeed - this.levels.minSpeed) + this.levels.minSpeed;

      const enemyHealth = this.levels.health;
      const tempEnemy = new Enemy(randomX, randomY, randomSpeed, enemyHealth, name);

      game.enemies.add(tempEnemy);
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
      if (this.levels.level === 3) {
        this.levels.addBossLevel();
      }
      this.levels.addLevel();
      this.spawnEnemies();
    }
  }
}
