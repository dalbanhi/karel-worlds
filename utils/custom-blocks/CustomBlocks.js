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
    },
    {
        "type": "is_facing_north",
        "message0": "isFacingNorth",
        "output": "Boolean",
        "colour": 30,
        "tooltip": "Check if Karel is facing 'North'",
        "helpUrl": ""
    },
    {
        "type": "is_facing_south",
        "message0": "isFacingSouth",
        "output": "Boolean",
        "colour": 30,
        "tooltip": "Check if Karel is facing 'South'",
        "helpUrl": ""
    },
    {
        "type": "is_facing_west",
        "message0": "isFacingWest",
        "output": "Boolean",
        "colour": 30,
        "tooltip": "Check if Karel is facing 'West'",
        "helpUrl": ""
    },
    {
        "type": "is_facing_east",
        "message0": "isFacingEast",
        "output": "Boolean",
        "colour": 30,
        "tooltip": "Check if Karel is facing 'East'",
        "helpUrl": ""
    },


    {
        "type": "is_not_facing_west",
        "message0": "isNotFacingWest",
        "output": "Boolean",
        "colour": 30,
        "tooltip": "Check if Karel is not facing 'West'",
        "helpUrl": ""
    },
    {
        "type": "is_not_facing_east",
        "message0": "isNotFacingEast",
        "output": "Boolean",
        "colour": 30,
        "tooltip": "Check if Karel is not facing 'East'",
        "helpUrl": ""
    },
    {
        "type": "is_not_facing_north",
        "message0": "isNotFacingNorth",
        "output": "Boolean",
        "colour": 30,
        "tooltip": "Check if Karel is not facing 'North'",
        "helpUrl": ""
    },
    {
        "type": "is_not_facing_south",
        "message0": "isNotFacingSouth",
        "output": "Boolean",
        "colour": 30,
        "tooltip": "Check if Karel is not facing 'South'",
        "helpUrl": ""
    },


    

]);

javascriptGenerator.forBlock['move_forward'] = function(block, generator) {
    let code = 'moveForward();\n';
    return code;
};

javascriptGenerator.forBlock['turn_left'] = function(block, generator) {
    let code = 'turnLeft();\n';
    return code;
};


javascriptGenerator.forBlock['is_facing_west'] = function(block, generator) {
    let code = `isFacingWest()`;
    return [code, generator.ORDER_ATOMIC];
}

javascriptGenerator.forBlock['is_facing_east'] = function(block, generator) {
    let code = `isFacingEast()`;
    return [code, generator.ORDER_FUNCTION_CALL];
}

javascriptGenerator.forBlock['is_facing_north'] = function(block, generator) {
    let code = 'isFacingNorth()';
    return [code, generator.ORDER_ATOMIC];

}

javascriptGenerator.forBlock['is_facing_south'] = function(block, generator) {
    let code = 'isFacingSouth()';
    return [code, generator.ORDER_ATOMIC];
}

javascriptGenerator.forBlock['is_not_facing_west'] = function(block, generator) {
    let code = 'isNotFacingWest()';
    return [code, generator.ORDER_ATOMIC];
}

javascriptGenerator.forBlock['is_not_facing_east'] = function(block, generator) {
    let code = 'isNotFacingEast()';
    return [code, generator.ORDER_ATOMIC];
}

javascriptGenerator.forBlock['is_not_facing_north'] = function(block, generator) {
    let code = 'isNotFacingNorth()';
    return [code, generator.ORDER_ATOMIC];
}

javascriptGenerator.forBlock['is_not_facing_south'] = function(block, generator) {
    let code = 'isNotFacingSouth()';
    return [code, generator.ORDER_ATOMIC];
}