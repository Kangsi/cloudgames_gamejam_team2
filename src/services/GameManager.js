import Phaser from 'phaser';

const maxHp = 3;

export default class Cannon extends Phaser.Group {
  constructor () {
    super(game);

    this.bullets = [];
    this.enemies = [];
    this.powerUps = [];

    this.playerHp = maxHp;

    game.addBullet.add((bullet) => {
      this.addBullet(bullet);
    });

    game.removeBullet.add((bullet) => {
      this.removeBullet(bullet);
    });

    game.addEnemy.add((bullet) => {
      this.addEnemy(bullet);
    });

    game.removeEnemy.add((bullet) => {
      this.removeEnemy(bullet);
    });

    game.addPowerUp.add((powerUp) => {
      this.addPowerUp(powerUp);
    });

    game.removePowerUp.add((powerUp) => {
      this.removePowerUp(powerUp);
    });

    game.doDamage.add((value) => {
      this.doDamage(value);
    });

    game.resetGame.add(() => {
      this.resetHp();
    });
  }

  addBullet (bullet) {
    this.bullets.push(bullet);
  }

  removeBullet (bullet) {
    var index = this.bullets.indexOf(bullet);

    if (index > -1) {
      this.bullets.splice(index, 1);
    }
  }

  addEnemy (enemy) {
    this.enemies.push(enemy);
  }

  removeEnemy (enemy) {
    var index = this.enemies.indexOf(enemy);
    if (index > -1) {
      this.enemies.splice(index, 1);
    }
  }

  addPowerUp (powerUp) {
    this.powerUps.push(powerUp);
  }

  removePowerUp (powerUp) {
    var index = this.powerUps.indexOf(powerUp);

    if (index > -1) {
      this.powerUps.splice(index, 1);
    }
  }

  update () {
    for (let i = 0; i < this.bullets.length; i += 1) {
      for (let j = 0; j < this.enemies.length; j += 1) {
        game.physics.arcade.overlap(this.bullets[i], this.enemies[j], this.onCollisionEnemy, null, this);
      }

      for (let k = 0; k < this.powerUps.length; k += 1) {
        game.physics.arcade.overlap(this.bullets[i], this.powerUps[k], this.onCollisionPowerUp, null, this);
      }
    }
  }

  doDamage (value) {
    this.playerHp -= value;
    if (this.playerHp <= 0) {
      // TODO game over
      game.gameOver.dispatch();
      return;
    }

    game.updateCannon.dispatch(maxHp - this.playerHp + 1);
  }

  resetHp () {
    this.playerHp = maxHp;
  }

  onCollisionEnemy (bullet, enemy) {
    enemy.doDamage(bullet.power);

    bullet.destroyBullet();
  }

  onCollisionPowerUp (bullet, powerUp) {
    powerUp.kill();

    bullet.destroyBullet();
  }
}
