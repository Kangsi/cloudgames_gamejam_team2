import Sprite from '../services/Sprite';

export default class PauseButton extends Sprite {
  constructor () {
    super({
      asset: 'button_pause',
      inputEnabled: true,
    });

    this.x = game.width - 50;
    this.y = 50;

    this.scale.setTo(0.5);

    this.events.onInputUp.add(() => {
      game.paused = !game.paused;
    });
  }
}
