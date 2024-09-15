import DrawManager from "../rr/draw.js";

export class Game {

  whichColor: number;
  whichRow: number;
  rows: number;
  columns: number;


  constructor();



  start(drawManager: DrawManager) {
    console.log("This is the start function. This is a test game for testing the drawManager");
    this.whichRow = 0;
    this.whichColor = 0;
    [this.rows, this.columns] = drawManager.getDims();
  }

  update(drawManager: DrawManager) {
    let frameBuffer = drawManager.getFrameBuffer();
    frameBuffer[this.whichRow] = Array(this.columns).fill(whichColor);
    drawManager.setFrameBuffer(frameBuffer);
    if(this.whichRow == (this.rows - 1)) {
      whichColor = (whichColor + 1) % 4;
    }
    this.whichRow = (this.whichRow + 1) % this.rows;
  }
}
