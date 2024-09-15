"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
var Game = /** @class */ (function () {
    function Game() {
    }
    Game.prototype.start = function (drawManager) {
        var _a;
        console.log("This is the start function. This is a test game for testing the drawManager");
        this.whichRow = 0;
        this.whichColor = 1;
        _a = drawManager.getDims(), this.rows = _a[0], this.columns = _a[1];
    };
    Game.prototype.update = function (drawManager) {
        var frameBuffer = drawManager.getFramebuffer();
        frameBuffer[this.whichRow] = Array(this.columns).fill(this.whichColor);
        drawManager.setFramebuffer(frameBuffer);
        if (this.whichRow == (this.rows - 1)) {
            this.whichColor = (this.whichColor + 1) % 4;
        }
        this.whichRow = (this.whichRow + 1) % this.rows;
    };
    return Game;
}());
exports.Game = Game;
