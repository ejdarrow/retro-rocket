"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FrameManager = void 0;
var FrameManager = /** @class */ (function () {
    /**
    Initialize the DrawManager elsewhere and set it here.
    */
    function FrameManager(drawManager) {
        this.fps = 60;
        this.running = false;
        this.drawManager = drawManager;
    }
    /**
    Usually game/yourMainScript.Update();
    frameFunction will be passed the DrawManager.
    */
    FrameManager.prototype.setFrameFunction = function (frameFunction) {
        this.frameFunction = frameFunction;
    };
    /**
    Optionally, set a run-once function starting up your game.
    startFunction will be passed the DrawManager.
    */
    FrameManager.prototype.setStartFunction = function (startFunction) {
        this.startFunction = startFunction;
    };
    FrameManager.prototype.start = function () {
        this.running = true;
        if (this.startFunction != null)
            this.startFunction(this.drawManager);
        this.activeInterval = setInterval(executeFrame, 1000 / this.fps);
    };
    FrameManager.prototype.stop = function () {
        this.running = false;
        clearInterval(this.activeInterval);
    };
    FrameManager.prototype.executeFrame = function () {
        if (this.running) {
            this.frameFunction(this.drawManager);
            this.drawManager.drawFrame();
        }
        else {
            stop();
        }
    };
    return FrameManager;
}());
exports.FrameManager = FrameManager;
