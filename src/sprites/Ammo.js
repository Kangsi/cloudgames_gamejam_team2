import PowerUp from './PowerUp';

export default class Ammo extends PowerUp {
  constructor () {
    super({
      asset: 'crate',
      type: 'ammo',
      value: 10,
    });

    this.x = game.width + 100;
  }

  update () {
    this.x -= 2;
  }
}
