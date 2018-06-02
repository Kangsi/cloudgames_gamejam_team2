import Enemy from '../sprites/Enemy';

export default class Levels {
  constructor () {
    this.minSpeed = 1;
    this.maxSpeed = 2;

    this.health = 10;

    this.amount = 10;
    this.level = 1;
    this.addLevel();
  }

  addLevel () {
    this.minSpeed *= 1.05;
    this.maxSpeed *= 1.05;

    this.level += 1;
    console.log('level up boiii! you are now at: ' + this.level);
  }

  addBossLevel () {
    const randomX = Math.random() * game.width;
    const randomY = Math.random() * -1000;
    var bossSpeed = this.maxSpeed / 2;
    var bossHealth = this.health * 5;

    const boss = new Enemy(randomX, randomY, bossSpeed, bossHealth, 'demon_enemy');

    game.enemies.add(boss);
    this.enemies.push(boss);
  }

  completedBoss () {
    console.log('You have defeated the boss!');
  }
}
