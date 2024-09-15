export class DrawManager {
  width: number = 160;
  height: number = 144;
  framebuffer: any;
  colors: number[];

  canvasElement: Element;
  scale: number = 4; //adaptive scale?
  white: string = "white";
  black: string = "black";
  green: string = "green";
  red: string = "red";
  colorLimit: number = 4;

  constructor(canvasElement: Element) {
    this.canvasElement = canvasElement;
    this.initializeColors();
    this.initializeFrameBuffer();
  }


setCanvasElement(element: Element) {
  this.canvasElement = element;
}


getFramebuffer() {
  return this.framebuffer;
}

  getColors() {
    return this.colors;
  }

  getWidth() {
    return this.width;
  }

  getHeight() {
    return this.height;
  }
/**
Get [height, width] as a two-element array.
*/
  getDims() {
    return [this.height, this.width];
  }

  setFramebuffer(framebuffer:any) {
    this.framebuffer = framebuffer;
  }

  setPixel(x:number, y:number, c:number) {
    this.framebuffer[x][y] = c;
  }

/**
Set all of the colors.
*/
setColors(colorsToSet: number[] ) {
  if(colorsToSet.length > colorLimit) {
    return false;
  } else {
    this.colors = colorsToSet;
  }
}

/**
Set specifically one color.
*/
setColor(index:number, colorToSet:string){
  this.colors[index] = colorToSet;
}

private initializeColors() {
  this.colors = [this.green, this.black, this.white, this.red];
}

private initializeFrameBuffer() {
  this.framebuffer = new Array(this.height);
  for(var i = 0; i < this.height; i++) {
    this.framebuffer[i] = new Array(this.width);
    for(var j = 0; j < this.width; j++) {
      this.framebuffer[i][j] = 0;
    }
  }
}

/**
Fire this from the event in FrameManager unless you
override the frame manager. Shoves the framebuffer
into the viewport.
*/
drawFrame() {
  var canvasContext = this.canvasElement.getContext("2d");
  for(var i = 0; i < this.height; i++) {
    for(var j = 0; j < this.width; j++) {
      this.drawPixel(canvasContext, i, j, this.framebuffer[i][j])
    }
  }
}

private makePixelRect(indexH:number, indexW:number) {
  return [indexW * this.scale,
    indexH * this.scale,
    (indexW + 1) * this.scale,
    (indexH + 1) * this.scale];
}

private drawPixel(ctx:CanvasRenderingContext2D, indexH:number, indexW:number, colorNumber:number) {
  ctx.fillStyle = this.colors[colorNumber];
  let [x, y, xp, yp] = this.makePixelRect(indexH, indexW);
  ctx.fillRect(x, y, xp, yp);
}

}
