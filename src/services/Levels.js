export default class Levels {
  constructor () {
    this.minSpeed = 1;
    this.maxSpeed = 2;
    this.waveDelay = 1000;
    this.health = 10;

    this.amount = 10;
    this.level = 1;
    this.nLevel = 0;
    this.multiplier = 1;
    this.levelInfo = game.cache.getJSON('level');
    this.levelInfoIndex = 0;
    this.currentLevelInfo = this.levelInfo[this.levelInfoIndex];
    // this.addLevel();
  }

  addLevel () {
    this.level += 1;
    this.getCorrectLevelInfo();
    game.updateWave.dispatch(this.level + this.nLevel);

    // this.minSpeed *= 1.05;
    // this.maxSpeed *= 1.05;

    console.log('level up boiii! you are now at: ' + this.level);
  }

  getCorrectLevelInfo () {
    if (!this.levelInfo[this.levelInfoIndex + 1]) {
      console.warn('no more levels');
      console.log(this.levelInfo.bossLevel + 1, this.level);
      if (this.currentLevelInfo.bossLevel + 1 === this.level) {
        this.multiplier += 1;
        this.nLevel += this.level;
        this.level = 1;
        this.levelInfoIndex = 0;
        this.currentLevelInfo = this.levelInfo[this.levelInfoIndex];
        this.applyNextLevel();
        return;
      }
      return;
    }

    this.waveDelay = 2000;

    if (this.levelInfo[this.levelInfoIndex + 1].level <= this.level) {
      this.levelInfoIndex += 1;
      this.currentLevelInfo = this.levelInfo[this.levelInfoIndex];
      this.applyNextLevel();
    }
  }

  isBossLevel () {
    // if (!this.levelInfo[this.levelInfoIndex + 1]) {
    //   console.warn('no more levels');
    //   return false;
    // }
    // return this.levelInfo[this.levelInfoIndex + 1].level - 1 === this.level;
    //
    return (this.currentLevelInfo.bossLevel === this.level);
  }

  applyNextLevel () {
    this.waveDelay = 2000;

    game.camera.fade(0x000000, 500, true);
    game.time.events.add(1000, () => {
      game.changeBackground.dispatch(this.currentLevelInfo.bg1, this.currentLevelInfo.bg2);
      game.camera.flash(0x000000, 500);
    }, this);
  }
}
