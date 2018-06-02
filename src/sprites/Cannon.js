import Phaser from 'phaser';
import Sprite from '../services/Sprite';
import Overlay from '../services/Overlay';
import Bullet from './Bullet';
import Enemy from './Enemy';
import Text from '../services/Text';

export default class Cannon extends Phaser.Group {
  constructor (x = 0, y = 0) {
    super(game);

    this.x = x;
    this.y = y;

    this.onCooldown = false;
    this.cooldownDuration = 500;

    this.speed = 50;
    this.bullets = 10;

    this.spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    this.buildCannon();
    this.buildAmmo(this.bullets);
    this.buildHitBox();
  }

  buildCannon () {
    this.cannon = new Sprite({
      // asset: 'cannon_1',
      asset: 'cannon_2',
    });
    this.add(this.cannon);
  }

  buildAmmo (bullets) {
    this.ammo = new Sprite({
      // asset: 'cannon_1',
      asset: 'mushroom',
      x: -300,
      y: 200
    });
    this.amount = new Text({
      text: '*' + bullets,
      x: -250,
      y: 160,
      fontSize: 60,
      align: 'left'
    });
    this.add(this.amount);
    this.add(this.ammo);
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
      this.shoot();
    });

    this.add(this.hitbox);
  }

  update () {
    if (game.input.activePointer.isDown && this.hitbox.input.checkPointerOver(game.input.activePointer)) {
      this.rotateCannon();
    }
    if (this.spacebar.justPressed()) {
      this.reload(this.bullets + 5);
    }
  }


  rotateCannon () {
    let position = new Phaser.Point(this.cannon.x + this.x, this.cannon.y + this.y);
    this.cannon.rotation = Phaser.Math.angleBetweenPoints(position, game.input.activePointer) + 1.5708;
  }

  shoot () {
    if (this.onCooldown) {
      return;
    }
    if (this.bullets) {
      const bullet = new Bullet(this.cannon.position.x + this.x, this.cannon.position.y + this.y, this.cannon.rotation, this.speed);
      game.bullets.add(bullet);
      this.bullets--;
      this.reload(this.bullets);
    }
    this.setCooldownTimer();
  }

  reload (amount) {
    this.ammo.destroy();
    this.amount.destroy();
    this.bullets = amount;
    this.buildAmmo(this.bullets);
  }

  setCooldownTimer () {
    this.setCooldown(true);
    game.time.events.add(this.cooldownDuration, this.setCooldown, this, false);
  }

  setCooldown (value) {
    this.onCooldown = value;
  }
}
