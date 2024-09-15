"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FrameManager = void 0;
var FrameManager = /** @class */ (function () {
    /**
    Initialize the DrawManager elsewhere and set it here.
    */
    function FrameManager(drawManager) {
        this.fps = 59;
        this.frameOf = 0;
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
        this.runInterval = setInterval(function (fm, dm) {
            fm.executeFrame(dm);
        }, 1000 / this.fps, this, this.drawManager);
    };
    FrameManager.prototype.stop = function () {
        this.running = false;
        clearInterval(this.runInterval);
    };
    FrameManager.prototype.executeFrame = function (drawManager) {
        this.frameFunction(drawManager);
        drawManager.drawFrame();
    };
    return FrameManager;
}());
exports.FrameManager = FrameManager;
