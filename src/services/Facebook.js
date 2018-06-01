export default class Facebook {
  static initializeAsync (Game, config) {
    FBInstant.initializeAsync().then(function () {
      if (('FBInstant' in window)) {

        window.game = new Game(config);
        print(`FB Instant SDK Version: ${Facebook.getSDKVersion}`);
        this.game.ID = Facebook.playerGetID;
      }
    });
  }

  static setLoadingProgress (progress) {
    if (('FBInstant' in window)) {
      FBInstant.setLoadingProgress(progress);
    }
  }

  static startGameAsync (callback, scope) {
    if (('FBInstant' in window)) {
      FBInstant.startGameAsync().then(() => {
          callback.call(scope);
      });
    } else {
      callback.call(scope);
    }
  }
}
