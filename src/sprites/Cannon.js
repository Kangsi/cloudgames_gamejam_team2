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

    this.power = 5;
    this.speed = 50;
    this.bullets = 10;

    this.spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    this.buildCannon();
    this.buildAmmo(this.bullets);
    this.buildHitBox();

    game.addPowerUpToCannon.add((type, value) => {
      this.updatePowerUp(type, value);
    });
  }

  gameOver () {
    game.checkDeath.dispatch(this);
    this.deathMessage = new Text({
      text: 'Your cannon has exploded!',
      x: 0,
      y: 500,
      backgroundColor: 'white',
      fontSize: 80,
      fontStyle: 'bold'
    });
    this.add(this.deathMessage);
  }

  buildCannon () {
    this.cannonBase = new Sprite({
      asset: 'test',

    });

    //this.add(this.cannonBase);
    this.cannon = new Sprite({
      // asset: 'cannon_1',
      asset: 'cannon',
    });
    console.log(this.cannon.width);
    this.cannon.anchor.setTo(0.5, 1);
    this.cannon.animations.add('shoot');
    this.add(this.cannon);

    this.character = new Sprite({
      asset: 'character_1',
    });

    this.character.scale.setTo(0.3, 0.2);

    // this.add(this.character);
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
      this.reload(5);
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
      this.cannon.animations.play('shoot', 30, false);
      game.time.events.add(300, () => {
        const bullet = new Bullet(this.cannon.position.x + this.x, this.cannon.position.y + this.y, this.cannon.rotation, this.speed, this.power);
        game.bullets.add(bullet);
        this.bullets--;
        this.updateAmmoText();
      });
    }
    this.setCooldownTimer();
  }

  reload (amount) {
    this.bullets += amount;
    this.updateAmmoText();
  }

  updateAmmoText () {
    this.amount.text = `*${this.bullets}`;
  }

  setCooldownTimer () {
    this.setCooldown(true);
    game.time.events.add(this.cooldownDuration, this.setCooldown, this, false);
  }

  setCooldown (value) {
    this.onCooldown = value;
  }

  updatePowerUp (type, value) {
    switch (type) {
      case 'power': this.power += value;
        break;
      case 'ammo': this.reload(value);
        break;
    }
  }
}
