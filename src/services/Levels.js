import Enemy from '../sprites/Enemy';

export default class Levels {
  constructor () {
    this.minSpeed = 1;
    this.maxSpeed = 2;

    this.health = 10;

    this.amount = 10;
    this.level = 1;

    this.levelInfo = game.cache.getJSON('level');
    console.log(this.levelInfo);
    this.levelInfoIndex = 0;
    this.currentLevelInfo = this.levelInfo[this.levelInfoIndex];
    this.addLevel();
  }

  addLevel () {
    this.getCorrectLevelInfo();
    // this.minSpeed *= 1.05;
    // this.maxSpeed *= 1.05;

    this.level += 1;
    console.log('level up boiii! you are now at: ' + this.level);
  }

  addBossLevel () {
    return;
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

  getCorrectLevelInfo () {
    if (!this.levelInfo[this.levelInfoIndex + 1]) {
      console.warn("no more levels");
      return;
    }

    if (this.levelInfo[this.levelInfoIndex + 1].level <= this.level) {
      this.levelInfoIndex += 1;
      this.currentLevelInfo = this.levelInfo[this.levelInfoIndex];
    }
  }

  isBossLevel() {
    if (!this.levelInfo[this.levelInfoIndex + 1]) {
      console.warn("no more levels");
      return false;
    }
    return this.levelInfo[this.levelInfoIndex + 1].level - 1 === this.level
  }
}
