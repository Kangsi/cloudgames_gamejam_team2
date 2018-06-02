import PowerUp from './PowerUp';

export default class Ammo extends PowerUp {
  constructor () {
    super({
      asset: 'crate',
      type: 'power',
      value: 3,
    });

    this.animations.add('walk');
    this.animations.play('walk', 30, true);

    this.x = game.width + 100;
    this.y = Math.random() * 500 + 200;
  }

  update () {
    this.x -= 2;
  }
}
