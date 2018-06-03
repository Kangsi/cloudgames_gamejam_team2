import Phaser from 'phaser';
import {centerGameObjects} from '../utils';
import Facebook from '../services/Facebook';
import Enemy from '../sprites/Enemy';

export default class extends Phaser.State {
  init () {
  }

  preload () {
    game.stage.backgroundColor = '#4488AA';
    game.physics.startSystem(Phaser.Physics.ARCADE);

    this.load.json('level', 'assets/level.json');

    this.load.onFileComplete.add(this.fileComplete, this);
    this.load.onLoadComplete.add(this.loadComplete, this);

    //
    // load your assets
    //
    this.load.image('home_background', 'assets/images/start_background.png');

    this.load.image('background1', 'assets/images/background1_1.png');
    this.load.image('wall1', 'assets/images/background1_2.png');

    this.load.image('background2', 'assets/images/background2_1.png');
    this.load.image('wall2', 'assets/images/background2_2.png');

    this.load.image('background3', 'assets/images/background3_1.png');
    this.load.image('wall3', 'assets/images/background3_2.png');

    this.load.image('cannon_2', 'assets/images/cannon_2.png');
    this.load.image('slime_enemy', 'assets/images/slime_enemy2.png');
    this.load.image('demon_enemy', 'assets/images/demon_enemy.png');
    this.load.image('mushroom', 'assets/images/mushroom2.png');
    this.load.image('projectile', 'assets/images/projectile.png');
    this.load.spritesheet('crate', 'assets/images/crate_spritesheet.png', 281, 128, 12);
    this.load.spritesheet('slime_boss', 'assets/images/slime_boss_anim-sheet.png', 424, 300, 19);

    this.load.spritesheet('slime', 'assets/images/demon_2_anim_sheet.png', 141, 190, 20);
    this.load.spritesheet('slime_death', 'assets/images/demon_2_anim_death.png', 166, 199, 11);

    this.load.spritesheet('demon1', 'assets/images/demon_1_anim_sheet.png', 128, 107, 10);
    this.load.spritesheet('demon_boss_1', 'assets/images/demon_boss_anim_sheet.png', 501, 250, 14);

    this.load.spritesheet('cyclops', 'assets/images/cyclops_1_anim_sheet.png', 128, 195, 15);
    this.load.spritesheet('cyclops_boss', 'assets/images/cyclops_anim_sheet.png', 300, 300, 15);

    this.load.image('cannon_base1', 'assets/images/cannon_base1.png');
    this.load.image('cannon_base2', 'assets/images/cannon_base2.png');
    this.load.image('cannon_base3', 'assets/images/cannon_base3.png');
    this.load.image('character_1', 'assets/images/character_1.png');
    this.load.image('character_2', 'assets/images/character_2.png');
    this.load.image('character_3', 'assets/images/character_3.png');
    this.load.image('test', 'assets/images/test.png');
    this.load.spritesheet('cannon', 'assets/images/cannon.png', 136, 246, 11);
    this.load.image('logo', 'assets/images/logo.png');
    this.load.image('healthbar_green', 'assets/images/healthbar_green.png');
    this.load.image('healthbar_red', 'assets/images/healthbar_red.png');

    this.load.spritesheet('loading_screen', 'assets/images/loading_screen.png', 384, 384, 20);

    this.load.image('blue_button', 'assets/images/button_blue.png');
    this.load.image('red_button', 'assets/images/button_red.png');
    this.load.image('game_over', 'assets/images/game_over.png');

    this.load.image('corner_display', 'assets/images/corner_display.png');


    this.load.image('button_audio', 'assets/images/button_audio.png');
    this.load.image('button_mute', 'assets/images/button_mute.png');
    this.load.audio('home', 'assets/audio/Menu/menuMusic.mp3');
    // slime sounds suckah
    this.load.audio('slime_move', 'assets/audio/Enemy/Slimes/slimeMovement.mp3');
    this.load.audio('slime_hit', 'assets/audio/Enemy/Slimes/slimeHit.mp3');
    this.load.audio('slime_death', 'assets/audio/Enemy/Slimes/slimeDeath.mp3');
    // demon sounds
    this.load.audio('demon_move', 'assets/audio/Enemy/Demon/demonMovement.mp3');
    this.load.audio('demon_hit', 'assets/audio/Enemy/Demon/demonDamage.mp3');
    this.load.audio('demon_death', 'assets/audio/Enemy/Demon/DemonDying.mp3');
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
