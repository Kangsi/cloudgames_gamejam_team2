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

    this.load.image('background', 'assets/images/background.png');
    this.load.image('cannon_2', 'assets/images/cannon_2.png');
    this.load.image('slime_enemy', 'assets/images/slime_enemy2.png');
    this.load.image('demon_enemy', 'assets/images/demon_enemy.png');
    this.load.image('mushroom', 'assets/images/mushroom2.png');
    this.load.image('projectile', 'assets/images/projectile.png');
    this.load.spritesheet('crate', 'assets/images/crate_spritesheet.png', 281, 128, 12);
    this.load.spritesheet('cyclops', 'assets/images/cyclops_1_anim_sheet.png', 281, 128, 12);
    this.load.spritesheet('demon1', 'assets/images/demon_1_anim_sheet.png', 128, 107, 10);
    this.load.spritesheet('demon2', 'assets/images/demon_2_anim_sheet.png', 141, 190, 20);
    this.load.image('cannon_base1', 'assets/images/cannon_base1.png');
    this.load.image('cannon_base2', 'assets/images/cannon_base2.png');
    this.load.image('cannon_base3', 'assets/images/cannon_base3.png');
    this.load.image('character_1', 'assets/images/character_1.png');
    this.load.image('character_2', 'assets/images/character_2.png');
    this.load.image('character_3', 'assets/images/character_3.png');
    this.load.image('test', 'assets/images/test.png');
    this.load.spritesheet('cannon', 'assets/images/cannon.png', 136, 246, 11);

  }

  fileComplete (progress, cacheKey, success, totalLoaded, totalFiles) {
    Facebook.setLoadingProgress(progress);
  }

  loadComplete () {
    Facebook.startGameAsync(this.startGame, this);
  }

  startGame () {
    this.state.start('Home');
  }
}
