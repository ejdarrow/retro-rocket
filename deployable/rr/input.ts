export class InputManager {

  /**
  up left down right a b start select
  */
  inputs : string[] =
  ["w", "a", "s", "d", ";", "'", ",", "."];
  focusElement: Element;
  structuredEventListener: Function[];


  constructor(focusElement: Element) {
    this.focusElement = focusElement;
    this.structuredEventListener = Array(8).fill((e) => {console.log(e.key + " pressed.");});
  }

  setInputsArray(inputs: string[]) {
    this.inputs = inputs;
  }


  setInputKeys(up: string, left: string, down:string, right:string, a:string, b:string, start:string, select:string) {
    this.inputs = [up, left, down, right, a, b, start, select];
  }


  /**
    Set the handlers by key in array
  */
  setStructuredEventListenerFunctions(functions: Function[]) {
    this.structuredEventListener = functions;
  }

  /**
   Activate
  */
  engageEventListeners() {
    this.focusElement.addEventListener("keydown", (e:KeyboardEvent) => {
      if (this.inputs.includes(e.key)) {
        this.structuredEventListener[this.inputs.indexOf(e.key)](e);
      }
    });
  }


}
