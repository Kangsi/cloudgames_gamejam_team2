import Phaser from 'phaser';
import Sprite from '../services/Sprite';
import Text from '../services/Text';

export default class Enemy extends Sprite {
  constructor (x, y, speed, health, name, isBoss) {
    super({asset: name, frame: 0, anchorY: 1});

    this.isBoss = isBoss;
    this.x = x;
    this.y = y;
    this.maxHp = health;
    this.hp = this.maxHp;
    game.addEnemy.dispatch(this);
    this.animations.add('walk');
    this.animations.play('walk', 30, true);
    this.damage = this.isBoss ? 3 : 1;
    this.speed = speed;
    this.health = health;
    this.points = 3;
    game.physics.arcade.enable(this, Phaser.Physics.ARCADE);
    this.buildHPBar();

    game.destroyAll.add(() => {
      game.removeEnemy.dispatch(this);
      this.destroy();
    });

    this.isAttacking = false;
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

    if (this.y >= 1300 && !this.isAttacking) {
      game.camera.shake(0.02, 500);
      game.doDamage.dispatch(this.damage);
      this.kill();
      this.isAttacking = true;
    }
  }

  doDamage (damage) {
    this.hp -= damage;
    this.updateHPBar();
    if (this.hp <= 0) {
      game.updateScore.dispatch(this.points);
      this.doDeathAnimation();
      this.kill();
    }
  }

  kill () {
    game.removeEnemy.dispatch(this);
    this.tween = game.add.tween(this).to({ alpha: 0 }, 1000, null, true);
    this.tween.onComplete.add(() => {
      this.destroy();
    });
  }

  doDeathAnimation () {
    if (game.cache.checkImageKey(`${this.key}_death`)) {
      this.loadTexture(`${this.key}_death`, 0);
      this.scale.setTo(0.85);
      this.animations.add('death');
      this.animations.play('death', 30, false);
    }
  }

  buildHPBar () {
    this.barBackground = new Sprite({
      asset: 'healthbar_red',
    });

    if (!this.isBoss) {
      this.barBackground.scale.setTo(0.5, 1);
    }
    this.barBackground.y = -this.height - 20;

    this.addChild(this.barBackground);

    this.bar = new Sprite({
      asset: 'healthbar_green',
      anchorX: 0,
    });
    if (!this.isBoss) {
      this.bar.scale.setTo(0.5, 1);
    }
    this.initBarWidth = this.bar.width;

    this.bar.y = -this.height - 20;

    this.bar.x = -this.bar.width / 2;
    this.addChild(this.bar);

    this.updateHPBar();
  }

  updateHPBar () {
    if (this.hp === this.maxHp || this.hp <= 0) {
      this.bar.visible = false;
      this.barBackground.visible = false;
      return;
    }

    let rect = new Phaser.Rectangle(0, 0, this.hp / this.maxHp * this.initBarWidth, this.bar.height);

    this.bar.crop(rect);

    this.bar.visible = true;
    this.barBackground.visible = true;

    // this.bar.scale.setTo(this.clamp(this.hp / this.maxHp, 0, this.maxHp), 1);
  }

  clamp (value, min, max) {
    return Math.min(Math.max(value, min), max);
  }
}
