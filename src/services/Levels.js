export default class Levels {
  constructor () {
    this.minSpeed = 1;
    this.maxSpeed = 2;

    this.health = 10;

    this.amount = 10;
    this.level = 1;
    // game.spawnEnemies.dispatch(this);

    //this.addLevel();
    // this.completedLevel();
    // this.completedBoss();
  }

  addLevel () {
    this.minSpeed *= 1.1;
    this.maxSpeed *= 1.1;

    this.level += 1;
    console.log(this.level)
    // this.health *= 1.2;

    // this.amount *= 1.3;
  }

  completedLevel () {
    console.log('Completed your level!');
  }

  completedBoss () {
    console.log('You have defeated the boss!');
  }
}
