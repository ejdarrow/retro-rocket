"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
var Game = /** @class */ (function () {
    function Game(drawManager) {
        this.verticalDirection = 1;
        this.colorDirection = 1;
        this.paused = false;
        this.rate = 1;
        this.drawManager = drawManager;
    }
    Game.prototype.pressUp = function (e) {
        this.verticalDirection = -1;
    };
    Game.prototype.pressLeft = function (e) {
        this.colorDirection = -1;
    };
    Game.prototype.pressDown = function (e) {
        this.verticalDirection = 1;
    };
    Game.prototype.pressRight = function (e) {
        this.colorDirection = 1;
    };
    Game.prototype.pressStart = function (e) {
        this.paused = true;
    };
    Game.prototype.pressSelect = function (e) {
        this.paused = false;
    };
    Game.prototype.pressA = function (e) {
        this.rate = this.rate + 1;
    };
    Game.prototype.pressB = function (e) {
        this.rate = this.rate - 1;
    };
    Game.prototype.start = function () {
        var _a;
        console.log("This is the start function. This is a test game for testing the drawManager");
        this.whichRow = 0;
        this.whichColor = 1;
        _a = this.drawManager.getDims(), this.rows = _a[0], this.columns = _a[1];
    };
    Game.prototype.update = function () {
        if (!this.paused) {
            var frameBuffer = this.drawManager.getFramebuffer();
            frameBuffer[this.whichRow] = Array(this.columns).fill(this.whichColor);
            this.drawManager.setFramebuffer(frameBuffer);
            if (this.whichRow == (this.rows - 1)) {
                this.whichColor = Math.abs((this.whichColor + this.colorDirection) % 4);
            }
            this.whichRow = Math.abs((this.whichRow + this.verticalDirection * this.rate) % this.rows);
        }
    };
    return Game;
}());
exports.Game = Game;
