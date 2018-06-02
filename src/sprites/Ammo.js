import PowerUp from './PowerUp';

export default class Ammo extends PowerUp {
  constructor () {
    super({
      asset: 'crate',
      type: 'ammo',
      value: 10,
    });

    this.animations.add('walk');
    this.animations.play('walk', 30, true);

    this.x = game.width + 100;
  }

  update () {
    this.x -= 2;
  }
}
