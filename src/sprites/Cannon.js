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
    this.cooldownDuration = 300;

    this.gameOver = false;

    game.gameOver.add(() => {
      this.gameOver = true;
    });

    game.resetGame.add(() => {
      this.gameOver = false;
      this.changeTexture(1);
    });

    game.updateCannon.add((value) => {
      this.changeTexture(value);
    });

    this.power = 5;
    this.speed = 50;
    this.bullets = 10;

    this.spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    this.buildCannon();
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
      asset: 'cannon_base1',
      x: -34,
      y: 40,

    });

    this.cannon = new Sprite({
      // asset: 'cannon_1',
      asset: 'cannon',
    });

    this.cannon.scale.setTo(1.4);
    this.cannon.anchor.setTo(0.5, 1);
    this.cannon.animations.add('shoot');
    this.add(this.cannon);
    this.add(this.cannonBase);

    this.character = new Sprite({
      asset: 'character_1',
      y: 40,
    });

    this.add(this.character);
  }

  buildHitBox () {
    this.hitbox = new Overlay({
      alpha: 0,
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

  changeTexture (value) {
    if (!game.cache.checkImageKey(`character_${value}`)) {
      return;
    }
    console.log(value);
    this.cannonBase.loadTexture(`cannon_base${value}`);
    this.character.loadTexture(`character_${value}`);
  }

  update () {
    if (this.gameOver) {
      return;
    }

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
    if (this.onCooldown || this.gameOver) {
      return;
    }

    this.setCooldownTimer();

    this.cannon.animations.play('shoot', 60, false);
    game.time.events.add(150, () => {
      let array = ['shot1', 'shot2', 'shot3'];
      let randomShot = array[Math.floor(Math.random() * array.length)];
      console.log(randomShot);
      game.sound.play(randomShot, 20, false);

      const bullet = new Bullet(this.cannon.position.x + this.x, this.cannon.position.y + this.y, this.cannon.rotation, this.speed, this.power);
      game.bullets.add(bullet);
    });
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
    }
  }
}
