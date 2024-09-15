"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputManager = void 0;
var InputManager = /** @class */ (function () {
    function InputManager(focusElement) {
        /**
        up left down right a b start select
        */
        this.inputs = ["w", "a", "s", "d", ";", "'", ",", "."];
        this.focusElement = focusElement;
        this.structuredEventListener = Array(8).fill(function (e) { console.log(e.key + " pressed."); });
    }
    InputManager.prototype.setInputsArray = function (inputs) {
        this.inputs = inputs;
    };
    InputManager.prototype.setInputKeys = function (up, left, down, right, a, b, start, select) {
        this.inputs = [up, left, down, right, a, b, start, select];
    };
    /**
      Set the handlers by key in array
    */
    InputManager.prototype.setStructuredEventListenerFunctions = function (functions) {
        this.structuredEventListener = functions;
    };
    /**
     Activate
    */
    InputManager.prototype.engageEventListeners = function () {
        var _this = this;
        this.focusElement.addEventListener("keydown", function (e) {
            if (_this.inputs.includes(e.key)) {
                _this.structuredEventListener[_this.inputs.indexOf(e.key)](e);
            }
        });
    };
    return InputManager;
}());
exports.InputManager = InputManager;
