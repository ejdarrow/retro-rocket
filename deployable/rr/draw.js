"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DrawManager = void 0;
var DrawManager = /** @class */ (function () {
    function DrawManager(canvasElement) {
        this.width = 160;
        this.height = 144;
        this.scale = 4; //adaptive scale?
        this.white = "white";
        this.black = "black";
        this.green = "green";
        this.red = "red";
        this.colorLimit = 4;
        this.canvasElement = canvasElement;
        this.initializeColors();
        this.initializeFrameBuffer();
    }
    DrawManager.prototype.setCanvasElement = function (element) {
        this.canvasElement = element;
    };
    DrawManager.prototype.setColors = function (colorsToSet) {
        if (colorsToSet.length > colorLimit) {
            return false;
        }
        else {
            this.colors = colorsToSet;
        }
    };
    DrawManager.prototype.setColor = function (index, colorToSet) {
        this.colors[index] = colorToSet;
    };
    DrawManager.prototype.initializeColors = function () {
        this.colors = [this.green, this.black, this.white, this.red];
    };
    DrawManager.prototype.initializeFrameBuffer = function () {
        this.framebuffer = new Array(this.height);
        for (var i = 0; i < this.height; i++) {
            this.framebuffer[i] = new Array(this.width);
            for (var j = 0; j < this.width; j++) {
                this.framebuffer[i][j] = 0;
            }
        }
    };
    DrawManager.prototype.drawFrame = function () {
        var canvasContext = this.canvasElement.getContext("2d");
        for (var i = 0; i < this.height; i++) {
            for (var j = 0; j < this.width; j++) {
                this.drawPixel(canvasContext, i, j, this.framebuffer[i][j]);
            }
        }
    };
    DrawManager.prototype.makePixelRect = function (indexH, indexW) {
        return [indexW * this.scale,
            indexH * this.scale,
            (indexW + 1) * this.scale,
            (indexH + 1) * this.scale];
    };
    DrawManager.prototype.drawPixel = function (ctx, indexH, indexW, colorNumber) {
        ctx.fillStyle = this.colors[colorNumber];
        var _a = this.makePixelRect(indexH, indexW), x = _a[0], y = _a[1], xp = _a[2], yp = _a[3];
        ctx.fillRect(x, y, xp, yp);
    };
    return DrawManager;
}());
exports.DrawManager = DrawManager;
