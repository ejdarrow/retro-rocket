import DrawManager from "./draw.js";

export class FrameManager {
  fps: number = 40;
  frameOf: number = 0;
  drawManager: DrawManager;
  running: boolean = false;
  runInterval: number;
  frameFunction: Function;

/**
Initialize the DrawManager elsewhere and set it here.
*/
  constructor(drawManager: DrawManager) {
    this.drawManager = drawManager;
  }

/**
Usually game/yourMainScript.Update();
frameFunction will be passed the DrawManager.
*/
setFrameFunction(frameFunction: Function) {
  this.frameFunction = frameFunction;
}

/**
Optionally, set a run-once function starting up your game.
startFunction will be passed the DrawManager.
*/
setStartFunction(startFunction: Function) {
  this.startFunction = startFunction;
}

start() {
  this.running = true;
  if(this.startFunction != null) this.startFunction(this.drawManager);
  this.runInterval = setInterval(function (dm) {
    this.frameFunction(dm);
    dm.drawFrame();
  }, 1000/this.fps, this.drawManager);
}

stop() {
  this.running = false
  clearInterval(this.runInterval);
}

}
