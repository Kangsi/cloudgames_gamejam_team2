import Phaser from 'phaser';
import Ammo from '../sprites/Ammo';
const minTime = 10000;
const maxTime = 20000;

export default class PowerUpSpawner extends Phaser.Group {
  constructor () {
    super(game);
    this.time = 0;
    this.setNextSpawnTime();
    this.gameOver = false;
    this.powerUpList = [
      Ammo,
    ];

    game.gameOver.add(() => {
      this.gameOver = true;
    });

    game.resetGame.add(() => {
      this.gameOver = false;
      this.resetTimer();
    });
  }

  update () {
    if (this.gameOver) {
      return;
    }

    this.time += game.time.elapsedMS;

    if (this.time >= this.nextSpawnTime) {
      this.spawnPowerUp();
      this.resetTimer();
    }
  }

  setNextSpawnTime () {
    this.nextSpawnTime = Math.random() * (maxTime - minTime) + minTime;
  }

  spawnPowerUp () {
    const randomIndex = Math.floor(Math.random() * this.powerUpList.length);

    const powerUp = new this.powerUpList[randomIndex]();
    game.add.existing(powerUp);
  }

  resetTimer () {
    this.time = 0;
    this.setNextSpawnTime();
  }
}
