import { Base } from "./Base";
import { System } from "..";
import { MapObject } from "../Core";
/** @class
 *  An event command for changing screen tone.
 *  @extends EventCommand.Base
 *  @param {any[]} command Direct JSON command to parse
 */
declare class ChangeScreenTone extends Base {
    r: System.DynamicValue;
    g: System.DynamicValue;
    b: System.DynamicValue;
    grey: System.DynamicValue;
    subColor: boolean;
    colorID: System.DynamicValue;
    waitEnd: boolean;
    time: System.DynamicValue;
    constructor(command: any[]);
    /**
     *  Initialize the current state.
     *  @returns {Record<string, any>} The current state
     */
    initialize(): Record<string, any>;
    /**
     *  Update and check if the event is finished.
     *  @param {Record<string, any>} currentState The current state of the event
     *  @param {MapObject} object The current object reacting
     *  @param {number} state The state ID
     *  @returns {number} The number of node to pass
    */
    update(currentState: Record<string, any>, object: MapObject, state: number): number;
}
export { ChangeScreenTone };
