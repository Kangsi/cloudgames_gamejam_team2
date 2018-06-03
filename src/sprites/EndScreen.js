import Phaser from 'phaser';
import Sprite from '../services/Sprite';
import Text from '../services/Text';
import Overlay from '../services/Overlay';
import Facebook from '../services/Facebook';

export default class EndScreen extends Phaser.Group {
  constructor () {
    super(game);
    this.x = game.width / 2;

    this.buildScreen();
    this.buildButtons();
    this.buildOverlay();
    this.visible = false;

    game.gameOver.add(() => {
      if (this.visible) {
        return;
      }
      this.doGameOver();
    });
  }
  buildOverlay () {
    this.overlay = new Overlay({
      x: -this.x,
      y: -game.height / 2,
      height: game.height * 2,
      alpha: 0.5,
      visible: false,
    });

    this.add(this.overlay);

    this.loading = new Sprite({
      asset: 'loading_screen',
      frame: 0,
      visible: false,
    });

    this.loading.visible = false;
    this.loading.animations.add('loading');
    this.loading.animations.play('loading', 30, true);

    this.add(this.loading);
  }

  buildScreen () {
    this.logo = new Sprite({
      asset: 'game_over',
      inputEnabled: true,
    });

    this.logo.events.onInputUp.add(() => {
    });

    this.add(this.logo);
  }

  buildButtons () {
    this.continueButton = new Sprite({
      asset: 'blue_button',
      y: 300,
      inputEnabled: true,
    });

    this.continueButton.events.onInputUp.add(() => {
      // TODO add ads
      this.overlay.visible = true;
      this.loading.visible = true;
      game.time.events.add(0, () => {
        Facebook.getRewardedVideo(() => {
          this.doReset();
          this.overlay.visible = false;
          this.loading.visible = false;
        }, this);
      });
    });

    this.continueText = new Text({
      text: 'Revive',
    });

    this.continueButton.addChild(this.continueText);

    this.add(this.continueButton);

    this.restartButton = new Sprite({
      asset: 'blue_button',
      y: 150,
      inputEnabled: true,
    });

    this.restartText = new Text({
      text: 'Restart',
    });

    this.restartButton.events.onInputUp.add(() => {
      game.restart.dispatch();
    });

    this.restartButton.addChild(this.restartText);

    this.add(this.restartButton);

    this.homeButton = new Sprite({
      asset: 'red_button',
      y: 0,
      inputEnabled: true,
    });

    this.homeText = new Text({
      text: 'Home',
    });

    this.homeButton.events.onInputUp.add(() => {
      game.toHome.dispatch();
    });

    this.homeButton.addChild(this.homeText);

    this.add(this.homeButton);
  }

  doGameOver () {
    this.visible = true;

    this.y = -1000;
    game.add.tween(this).to({ y: game.height / 2}, 1000, Phaser.Easing.Bounce.Out, true);
  }

  doReset () {
    this.visible = false;
    game.destroyAll.dispatch();
    game.resetGame.dispatch();
  }
}
