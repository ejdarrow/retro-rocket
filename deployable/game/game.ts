import { DrawManager } from "../rr/draw.js";

export class Game {

  whichColor: number;
  whichRow: number;
  rows: number;
  columns: number;
  drawManager: DrawManager;
  verticalDirection: number = 1;
  colorDirection: number = 1;
  paused : boolean = false;
  rate : number = 1;


  constructor(drawManager: DrawManager) {
    this.drawManager = drawManager;
  }

  pressUp(e:KeyboardEvent) {
    this.verticalDirection = -1;
  }

  pressLeft(e:KeyboardEvent) {
    this.colorDirection = -1;
  }

  pressDown(e:KeyboardEvent) {
    this.verticalDirection = 1;
  }

  pressRight(e:KeyboardEvent) {
    this.colorDirection = 1;
  }

  pressStart(e:KeyboardEvent) {
    this.paused = true;
  }

  pressSelect(e:KeyboardEvent) {
    this.paused = false;
  }

  pressA(e:KeyboardEvent) {
    this.rate = this.rate + 1;
  }

  pressB(e:KeyboardEvent) {
    this.rate = this.rate - 1;
  }

  start() {
    console.log("This is the start function. This is a test game for testing the drawManager");
    this.whichRow = 0;
    this.whichColor = 1;
    [this.rows, this.columns] = this.drawManager.getDims();
  }

  update() {
    if(!this.paused) {
      let frameBuffer = this.drawManager.getFramebuffer();
      frameBuffer[this.whichRow] = Array(this.columns).fill(this.whichColor);
      this.drawManager.setFramebuffer(frameBuffer);
      if(this.whichRow == (this.rows - 1)) {
        this.whichColor = Math.abs((this.whichColor + this.colorDirection) % 4);
      }
      this.whichRow = Math.abs((this.whichRow + this.verticalDirection * this.rate) % this.rows);
    }
  }
}
