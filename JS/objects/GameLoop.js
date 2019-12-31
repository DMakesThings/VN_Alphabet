"using static"

/**
GameLoop() -- this is part of the engine. Just standard: Initiates the
frame rate, and then automatically calls the step() and draw() function
of the gameLogic that is calling it.

This is automatically set to be 30 fps.
*/
class GameLoop {
  constructor(gameLogic) {
    //empty constructor.. for now.
    this.dropCounter = 0;
    this.dropInterval = 1000/30;
    this.lastTime = 0;
    this.gameLogic = gameLogic;
  }

  start() {
    this.gameUpdate();
  }

  gameLoop() {
    this.gameStep();
    this.gameDraw();
  }

  gameStep() {
    if ( GameLoop.paused == true) {
      return;
    }
    //first, do the game logic step.
    this.gameLogic.step();
    //next do all the game object steps.
    GameObject.stepAll();
  }

  gameDraw() {
    if ( GameLoop.paused == true) {
      return;
    }
    this.gameLogic.draw();
  }

  gameUpdate(time = 0) {
    //console.log(this.dropInterval);
    const deltaTime = time - this.lastTime;
    this.lastTime = time;

    this.dropCounter += deltaTime;
    if (this.dropCounter > this.dropInterval) {
      this.dropCounter = 0;
      this.gameLoop();
    }
    //requestAnimationFrame is a standard Javascript function.
    requestAnimationFrame(this.gameUpdate.bind(this));
  }

  static mousePressed(event) {
    GameObject.mousePressedAll(event);
    //add further codes for mouse checking
  }
  //local methods
  static pauseGame() {
    GameLoop.paused = !GameLoop.paused;
    gameLoop.gameLogic.draw();
  }

  static isPaused() {
    return GameLoop.paused;
  }
}
GameLoop.paused = false;
