export default class Levels {
  constructor () {
    this.minSpeed = 1;
    this.maxSpeed = 2;

    this.health = 1;

    this.amount = 10;

    game.spawnEnemies.dispatch(this);

    this.addLevel();
    this.completedLevel();
    this.completedBoss();
  }

  addLevel () {
    this.minSpeed *= 1.25;
    this.maxSpeed *= 1.25;

    this.health *= 1.2;

    this.amount *= 1.3;
  }

  completedLevel () {
    console.log('Completed your level!');
  }

  completedBoss () {
    console.log('You have defeated the boss!');
  }
}
