import DrawManager from "../rr/draw.js";

export class Game {

  whichColor: number;
  whichRow: number;
  rows: number;
  columns: number;


  constructor() {

  }



  start(drawManager: DrawManager) {
    console.log("This is the start function. This is a test game for testing the drawManager");
    this.whichRow = 0;
    this.whichColor = 1;
    [this.rows, this.columns] = drawManager.getDims();
  }

  update(drawManager: DrawManager) {
    let frameBuffer = drawManager.getFramebuffer();
    frameBuffer[this.whichRow] = Array(this.columns).fill(this.whichColor);
    drawManager.setFramebuffer(frameBuffer);
    if(this.whichRow == (this.rows - 1)) {
      this.whichColor = (this.whichColor + 1) % 4;
    }
    this.whichRow = (this.whichRow + 1) % this.rows;
  }
}
