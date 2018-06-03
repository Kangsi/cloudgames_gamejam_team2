import Phaser from 'phaser';
import Sprite from '../services/Sprite';
import Text from '../services/Text';

export default class Enemy extends Sprite {
  constructor (x, y, speed, health, name, hitsound, deathsound) {
    super({asset: name, frame: 0});

    this.hitSound = hitsound;
    this.deathSound = deathsound;

    this.x = x;
    this.y = y;
    this.maxHp = health;
    this.hp = this.maxHp;
    game.addEnemy.dispatch(this);
    this.animations.add('walk');
    this.animations.play('walk', 30, true);

    this.speed = speed;
    this.health = health;

    game.physics.arcade.enable(this, Phaser.Physics.ARCADE);
    this.buildHPBar();
  }

  update () {
    if (this.hp <= 0) {
      return;
    }

    this.y += this.speed;
    // if (this.lives === 0) {
    //   this.gameOver();
    // }
    // this.y += Math.floor((Math.random() * this.maxSpeed) + this.minSpeed);

    if (this.y >= 950) {
      // game.camera.shake(0.02, 100);
      this.kill();
    }
  }

  doDamage (damage) {
    this.hp -= damage;
    game.sound.play(this.hitSound, 70, false);
    this.updateHPBar();
    if (this.hp <= 0) {
      this.kill();
    }
  }

  kill () {
    game.removeEnemy.dispatch(this);
    this.tween = game.add.tween(this).to({ alpha: 0 }, 1000, null, true);
    this.tween.onComplete.add(() => {
      game.sound.play(this.deathSound, 70, false);
      this.destroy();
    });
  }

  buildHPBar () {
    const width = 100;
    const height = 20;
    this.barBackground = new Phaser.Graphics(game, -width / 2, -150);
    this.bar = new Phaser.Graphics(game, -width / 2, -150);

    this.barBackground.beginFill(0xff0000);
    this.barBackground.drawRect(0, 0, width, height);

    this.bar.beginFill(0x00ff00);
    this.bar.drawRect(0, 0, 100, 20);

    this.addChild(this.barBackground);
    this.addChild(this.bar);

    this.updateHPBar();
  }

  updateHPBar () {
    if (this.hp === this.maxHp || this.hp === 0) {
      this.bar.visible = false;
      this.barBackground.visible = false;
      return;
    }

    this.bar.visible = true;
    this.barBackground.visible = true;

    this.bar.scale.setTo(this.clamp(this.hp / this.maxHp, 0, this.maxHp), 1);
  }

  clamp (value, min, max) {
    return Math.min(Math.max(value, min), max);
  }
}
