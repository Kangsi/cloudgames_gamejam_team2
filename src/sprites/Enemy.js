import Phaser from 'phaser';
import Sprite from '../services/Sprite';
import Text from '../services/Text';

export default class Enemy extends Sprite {
  constructor (x = 0, y = 0) {
    super({asset: 'slime_enemy'});

    this.x = x;
    this.y = y;

    this.lives = 3;

    game.addEnemy.dispatch(this);

    game.physics.arcade.enable(this, Phaser.Physics.ARCADE);
    this.body.setSize(130, 170);
    this.speed = 4;
  }

  update () {
    this.y += this.speed;
    if (this.lives === 0) {
      this.gameOver();
    }
    if (this.y >= 950) {
      this.lives--;
      console.log(this.lives);
      this.kill();
    }
  }

  kill () {
    game.removeEnemy.dispatch(this);
    this.destroy();
  }

  gameOver () {
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
}
