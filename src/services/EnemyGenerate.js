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
    const info = this.levels.currentLevelInfo;
    for (let i = 0; i < info.amount; i++) {
      // random spawn place
      const randomX = Math.random() * this.x;
      const randomY = Math.random() * this.y;
      // pseudo random enemy speed

      const enemy = this.getRandomEnemy(info.minions);
      this.sound = enemy.moveSound;
      const randomSpeed = Math.random() * (enemy.initMaxSpeed - enemy.initMinSpeed) + enemy.initMinSpeed;

      const tempEnemy = new Enemy(randomX, randomY, randomSpeed, enemy.initHealth, enemy.asset, enemy.hitSound, enemy.deathSound);

      game.enemies.add(tempEnemy);
      this.enemies.push(tempEnemy);
    }
    game.sound.play(this.sound, 5, true);
  }

  spawnBoss () {
    const enemy = this.levels.currentLevelInfo.boss;
    // random spawn place
    const randomX = game.width / 2;
    const randomY = Math.random() * this.y;
    // pseudo random enemy speed

    const randomSpeed = Math.random() * (enemy.initMaxSpeed - enemy.initMinSpeed) + enemy.initMinSpeed;

    const tempEnemy = new Enemy(randomX, randomY, randomSpeed, enemy.initHealth, enemy.asset, enemy.hitSound, enemy.deathSound);

    game.enemies.add(tempEnemy);
    this.enemies.push(tempEnemy);
  }

  getRandomEnemy (minions) {
    const keys = Object.keys(minions);
    const randomIndex = Math.floor(Math.random() * keys.length);
    return minions[keys[randomIndex]];
  }

  update () {

  }

  removeEnemy (enemy) {
    const index = this.enemies.indexOf(enemy);

    if (index !== -1) {
      this.enemies.splice(index, 1);
    }

    if (this.enemies.length === 0) {
      if (this.levels.isBossLevel()) {
        this.spawnBoss();
      }
      this.levels.addLevel();

      this.spawnEnemies();
    }
  }
}
