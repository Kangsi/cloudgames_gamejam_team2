import Phaser from 'phaser';

export default class Cannon extends Phaser.Group {
  constructor (level) {
    super(game);
    this.level = level;

    this.bullets = [];
    this.enemies = [];

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

  update () {
    for (let i = 0; i < this.bullets.length; i += 1) {
      for (let j = 0; j < this.enemies.length; j += 1) {
        game.physics.arcade.overlap(this.bullets[i], this.enemies[j], this.onCollision, null, this);
      }
    }
  }

  onCollision(bullet, enemy) {
    enemy.doDamage(bullet.power);

    bullet.destroyBullet()
  }
}
