import 'pixi';
import 'p2';
import Phaser from 'phaser';

import SplashState from './states/Splash';
import GameState from './states/Game';
import Facebook from './services/Facebook';
import Home from './states/Home';

import config from './config';

class Game extends Phaser.Game {
  constructor (config) {
    super(config);
    console.log('test');
    this.state.add('Splash', SplashState, false);
    this.state.add('Game', GameState, false);
    this.state.add('Home', Home, true);

    // with Cordova with need to wait that the device is ready so we will call the Boot state in another file
    if (!window.cordova) {
      this.state.start('Splash');
    }
  }
}

Facebook.initializeAsync(Game, config);

// if (window.cordova) {
//   var app = {
//     initialize: function () {
//       document.addEventListener(
//         'deviceready',
//         this.onDeviceReady.bind(this),
//         false
//       );
//     },
//
//     // deviceready Event Handler
//     //
//     onDeviceReady: function () {
//       this.receivedEvent('deviceready');
//
//       // When the device is ready, start Phaser Boot state.
//       window.game.state.start('Boot');
//     },
//
//     receivedEvent: function (id) {
//       console.log('Received Event: ' + id);
//     }
//   };
//
//   app.initialize();
// }
