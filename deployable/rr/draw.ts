export class DrawManager {
  width: number = 160;
  height: number = 144;
  framebuffer: any;
  lastFrame: any;
  dirtymask: any;
  colors: string[];
  dirty: boolean = true;

  canvasElement: HTMLCanvasElement;
  scale: number = 3; //adaptive scale?
  white: string = "white";
  black: string = "black";
  green: string = "green";
  red: string = "red";
  colorLimit: number = 4;

  constructor(canvasElement: HTMLCanvasElement) {
    this.canvasElement = canvasElement;
    this.initializeColors();
    this.initializeFrameBuffer();
    this.initializeDirtyBuffer();
    this.lastFrame = structuredClone(this.framebuffer);
  }


setCanvasElement(element: HTMLCanvasElement) {
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
    this.dirty = true;
    this.framebuffer = framebuffer;
  }

  setPixel(x:number, y:number, c:number) {
    this.dirty = true;
    this.framebuffer[x][y] = c;
    this.dirtymask[x][y] = true;
  }

/**
Set all of the colors.
*/
setColors(colorsToSet: string[] ) {
  this.dirty = true;
  this.initializeDirtyBuffer();
  if(colorsToSet.length > this.colorLimit) {
    return false;
  } else {
    this.colors = colorsToSet;
  }
}

/**
Set specifically one color.
*/
setColor(index:number, colorToSet:string){
  this.dirty = true;
  this.colors[index] = colorToSet;
}

private initializeColors() {
  this.colors = [this.green, this.black, this.white, this.red];
}

private initializeFrameBuffer() {
  this.framebuffer = new Array(this.height);
  for(var i = 0; i < this.height; i++) {
    this.framebuffer[i] = new Array(this.width).fill(0);
  }
}

private initializeDirtyBuffer() {
  this.dirtymask = new Array(this.height);
  for(var i = 0; i < this.height; i++) {
    this.dirtymask[i] = new Array(this.width).fill(false);
  }
}

private updateDirtyMask() {
  this.dirtymask = this.framebuffer.map((e, i:number) => e.map((f, j:number) => f != this.lastFrame[i][j]));
}

/**
Fire this from the event in FrameManager unless you
override the frame manager. Shoves the framebuffer
into the viewport.
*/
drawFrame() {
  if(this.dirty) {
    this.updateDirtyMask();
    var canvasContext = this.canvasElement.getContext("2d");
    for(var i = 0; i < this.height; i++) {
      for(var j = 0; j < this.width; j++) {
        if(this.dirtymask[i][j]) {
          this.drawPixel(canvasContext, i, j, this.framebuffer[i][j]);
          this.dirtymask[i][j] = false;
        }
      }
    }
    this.lastFrame = structuredClone(this.framebuffer);
    this.dirty = false;
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
