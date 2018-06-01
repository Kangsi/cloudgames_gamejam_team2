import Phaser from 'phaser';
import {centerGameObjects} from '../utils';
import Facebook from '../services/Facebook';

export default class extends Phaser.State {
  init () {
  }

  preload () {
    game.stage.backgroundColor = '#4488AA';
    game.physics.startSystem(Phaser.Physics.ARCADE);

    this.load.onFileComplete.add(this.fileComplete, this);
    this.load.onLoadComplete.add(this.loadComplete, this);

    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg');
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar');
    centerGameObjects([this.loaderBg, this.loaderBar]);

    this.load.setPreloadSprite(this.loaderBar);
    //
    // load your assets
    //

    this.load.image('mushroom', 'assets/images/mushroom2.png');
  }

  fileComplete (progress, cacheKey, success, totalLoaded, totalFiles) {
    Facebook.setLoadingProgress(progress);
  }

  loadComplete () {
    Facebook.startGameAsync(this.startGame, this);
  }

  startGame () {
    this.state.start('Game');
  }
}
