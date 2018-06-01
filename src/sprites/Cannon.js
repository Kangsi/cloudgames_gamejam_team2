import Phaser from 'phaser';
import Sprite from '../services/Sprite';
import Overlay from '../services/Overlay';
import Bullet from './Bullet';
export default class Cannon extends Phaser.Group {
  constructor (x = 0, y = 0) {
    super(game);

    this.x = x;
    this.y = y;

    this.onCooldown = false;
    this.cooldownDuration = 500;

    this.speed = 10;

    this.buildCannon();
    this.buildHitBox();

    game.fireButton.add(() => {
      if (this.onCooldown) {
        return;
      }
      this.shoot();
    });
  }

  buildCannon () {
    this.cannon = new Sprite({
      asset: 'mushroom',
      inputEnabled: true,
    });

    this.cannon.events.onInputUp.add(() => {
      console.log('cannon pressed');
    });

    this.add(this.cannon);
  }

  buildHitBox () {
    this.hitbox = new Overlay({
      alpha: 0.5,
      x: -game.width / 2,
      y: -this.y,
      width: game.width,
      height: this.y,
      color: '#00ff00',
      inputEnabled: true,
    });

    this.hitbox.events.onInputUp.add(() => {
      this.rotateCannon();
    });

    this.add(this.hitbox);
  }

  rotateCannon () {
    let position = new Phaser.Point(this.cannon.x + this.x, this.cannon.y + this.y);
    this.cannon.rotation = Phaser.Math.angleBetweenPoints(position, game.input.activePointer) + 1.5708;
  }

  shoot () {
    const bullet = new Bullet(this.cannon.position.x + this.x, this.cannon.position.y + this.y, this.cannon.rotation, this.speed);
    this.setCooldownTimer();
  }

  setCooldownTimer() {
    this.setCooldown(true)
    game.time.events.add(this.cooldownDuration, this.setCooldown, this, false);
  }

  setCooldown(value) {
    this.onCooldown = value;
  }
}
