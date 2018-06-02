export default class Facebook {
  static initializeAsync (Game, config) {
    console.log(window.location.href);
    if (('FBInstant' in window) && !Facebook.checkIfLocalHost()) {
      FBInstant.initializeAsync().then(function () {
        window.game = new Game(config);
        this.game.ID = Facebook.playerGetID;
      });
    } else {
      window.game = new Game(config);
    }
  }

  static setLoadingProgress (progress) {
    if (('FBInstant' in window) && !Facebook.checkIfLocalHost()) {
      FBInstant.setLoadingProgress(progress);
    }
  }

  static startGameAsync (callback, scope) {
    if (('FBInstant' in window) && !Facebook.checkIfLocalHost()) {
      FBInstant.startGameAsync().then(() => {
        callback.call(scope);
      });
    } else {
      callback.call(scope);
    }
  }

  static checkIfLocalHost () {
    return window.location.href.includes('http://localhost') || window.location.href.includes('http://192');
  }
}
