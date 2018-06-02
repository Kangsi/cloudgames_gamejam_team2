import Sprite from '../services/Sprite';

export default class ButttonMute extends Sprite {
  constructor (x = 0, y = 0, callback, scope) {
    super({ asset: 'button_audio', inputEnabled: true });

    this.x = x;
    this.y = y;

    this.applyTexture();

    this.events.onInputUp.add(() => {
      game.sound.mute = !game.sound.mute;
      this.applyTexture();
    });
  }

  applyTexture () {
    if (!game.sound.mute) {
      this.loadTexture('button_audio');
    } else {
      this.loadTexture('button_mute');
    }
  }
}
