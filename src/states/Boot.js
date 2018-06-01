import Phaser from 'phaser';
import WebFont from 'webfontloader';
import config from '../config';
import Facebook from '../services/Facebook';

export default class extends Phaser.State {
  init () {
    this.stage.backgroundColor = '#EDEEC9';
    this.fontsReady = false;
    this.fontsLoaded = this.fontsLoaded.bind(this);
  }

  preload () {
    if (config.webfonts.length) {
      WebFont.load({
        google: {
          families: config.webfonts
        },
        active: this.fontsLoaded
      });
    }
    console.log("test")

    this.load.onFileComplete.add(this.fileComplete, this);
    //this.load.onLoadComplete.add(this.loadComplete, this);
    console.log("test")

    let text = this.add.text(this.world.centerX, this.world.centerY, 'loading fonts', { font: '16px Arial', fill: '#dddddd', align: 'center' });
    text.anchor.setTo(0.5, 0.5);

    this.load.image('loaderBg', './assets/images/loader-bg.png');
    this.load.image('loaderBar', './assets/images/loader-bar.png');
  }

  render () {
    if (config.webfonts.length && this.fontsReady) {
      this.state.start('Splash');
    }
    if (!config.webfonts.length) {
      this.state.start('Splash');
    }
  }

  fontsLoaded () {
    this.fontsReady = true;
  }

  fileComplete (progress, cacheKey, success, totalLoaded, totalFiles) {
    Facebook.setLoadingProgress(progress);
  }
}
