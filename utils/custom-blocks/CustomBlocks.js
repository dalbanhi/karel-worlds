import Blockly from 'blockly';
import { javascriptGenerator } from 'blockly/javascript';

Blockly.defineBlocksWithJsonArray([
    {
        "type": "move_forward",
        "message0": "moveForward",
        "previousStatement": null,
        "nextStatement": null,
        "colour": 330,
        "tooltip": "Move one step forward (direction you are facing)",
        "helpUrl": ""
    },
    {
        "type": "turn_left",
        "message0": "turnLeft",
        "previousStatement": null,
        "nextStatement": null,
        "colour": 330,
        "tooltip": "Turn 90° to the left from where you are facing",
        "helpUrl": ""
    }

]);

javascriptGenerator.forBlock['move_forward'] = function(block, generator) {
    let code = 'moveForward();\n';
    return code;
};

javascriptGenerator.forBlock['turn_left'] = function(block, generator) {
    let code = 'turnLeft();\n';
    return code;
};
