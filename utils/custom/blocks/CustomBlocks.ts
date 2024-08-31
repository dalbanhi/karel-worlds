import { defineBlocksWithJsonArray } from "blockly";
import { javascriptGenerator, Order } from "blockly/javascript";

const booleanColor = "#5faba8";
const actionColor = "#ffc83d";
const starterColor = "#c5c4d4";

defineBlocksWithJsonArray([
  {
    type: "starting_point",
    message0: "",
    nextStatement: null,
    colour: starterColor,
    tooltip: "This is the starting point of the program",
    helpUrl: "",
  },
  //Movement Actions
  {
    type: "move_forward",
    message0: "moveForward();",
    previousStatement: null,
    nextStatement: null,
    colour: actionColor,
    tooltip: "Move one step forward (direction you are facing)",
    helpUrl: "",
  },
  {
    type: "turn_left",
    message0: "turnLeft();",
    previousStatement: null,
    nextStatement: null,
    colour: actionColor,
    tooltip: "Turn 90° to the left from where you are facing",
    helpUrl: "",
  },
  //Beeper Actions
  {
    type: "take_beeper",
    message0: "takeBeeper();",
    previousStatement: null,
    nextStatement: null,
    colour: actionColor,
    tooltip: "Take a beeper from the current location (if there is one)",
    helpUrl: "",
  },
  {
    type: "put_beeper",
    message0: "putBeeper();",
    previousStatement: null,
    nextStatement: null,
    colour: actionColor,
    tooltip: "Put a beeper at the current location",
    helpUrl: "",
  },
  //Direction Logic
  {
    type: "is_facing_north",
    message0: "isFacingNorth();",
    output: "Boolean",
    colour: booleanColor,
    tooltip: "Check if Karel is facing 'North'",
    helpUrl: "",
  },
  {
    type: "is_facing_south",
    message0: "isFacingSouth();",
    output: "Boolean",
    colour: booleanColor,
    tooltip: "Check if Karel is facing 'South'",
    helpUrl: "",
  },
  {
    type: "is_facing_west",
    message0: "isFacingWest();",
    output: "Boolean",
    colour: booleanColor,
    tooltip: "Check if Karel is facing 'West'",
    helpUrl: "",
  },
  {
    type: "is_facing_east",
    message0: "isFacingEast();",
    output: "Boolean",
    colour: booleanColor,
    tooltip: "Check if Karel is facing 'East'",
    helpUrl: "",
  },
  {
    type: "is_not_facing_west",
    message0: "isNotFacingWest();",
    output: "Boolean",
    colour: booleanColor,
    tooltip: "Check if Karel is not facing 'West'",
    helpUrl: "",
  },
  {
    type: "is_not_facing_east",
    message0: "isNotFacingEast();",
    output: "Boolean",
    colour: booleanColor,
    tooltip: "Check if Karel is not facing 'East'",
    helpUrl: "",
  },
  {
    type: "is_not_facing_north",
    message0: "isNotFacingNorth();",
    output: "Boolean",
    colour: booleanColor,
    tooltip: "Check if Karel is not facing 'North'",
    helpUrl: "",
  },
  {
    type: "is_not_facing_south",
    message0: "isNotFacingSouth();",
    output: "Boolean",
    colour: booleanColor,
    tooltip: "Check if Karel is not facing 'South'",
    helpUrl: "",
  },
  //block/clear logic
  {
    type: "front_is_clear",
    message0: "frontIsClear();",
    output: "Boolean",
    colour: booleanColor,
    tooltip: "Check if Karel can move forward",
    helpUrl: "",
  },
  {
    type: "front_is_blocked",
    message0: "frontIsBlocked();",
    output: "Boolean",
    colour: booleanColor,
    tooltip: "Check if Karel cannot move forward",
    helpUrl: "",
  },
  {
    type: "left_is_clear",
    message0: "leftIsClear();",
    output: "Boolean",
    colour: booleanColor,
    tooltip: "Check if Karel can move left",
    helpUrl: "",
  },
  {
    type: "left_is_blocked",
    message0: "leftIsBlocked();",
    output: "Boolean",
    colour: booleanColor,
    tooltip: "Check if Karel cannot move left",
    helpUrl: "",
  },
  {
    type: "right_is_clear",
    message0: "rightIsClear();",
    output: "Boolean",
    colour: booleanColor,
    tooltip: "Check if Karel can move right",
    helpUrl: "",
  },
  {
    type: "right_is_blocked",
    message0: "rightIsBlocked();",
    output: "Boolean",
    colour: booleanColor,
    tooltip: "Check if Karel cannot move right",
    helpUrl: "",
  },
  //beeper logic
  {
    type: "beepers_present",
    message0: "beepersPresent();",
    output: "Boolean",
    colour: booleanColor,
    tooltip:
      "Check if there is one or more beepers present in the current location",
    helpUrl: "",
  },
  {
    type: "no_beepers_present",
    message0: "noBeepersPresent();",
    output: "Boolean",
    colour: booleanColor,
    tooltip: "Check if there are no beepers present in the current location",
    helpUrl: "",
  },
]);

//movement actions
javascriptGenerator.forBlock["move_forward"] = function (block, generator) {
  let code = "moveForward();\n";
  return code;
};

javascriptGenerator.forBlock["turn_left"] = function (block, generator) {
  let code = "turnLeft();\n";
  return code;
};

//beeper actions
javascriptGenerator.forBlock["put_beeper"] = function (block, generator) {
  let code = "putBeeper();\n";
  return code;
};

javascriptGenerator.forBlock["take_beeper"] = function (block, generator) {
  let code = "takeBeeper();\n";
  return code;
};

//direction logic
javascriptGenerator.forBlock["is_facing_west"] = function (block, generator) {
  let code = `isFacingWest()`;
  return [code, Order.ATOMIC];
};

javascriptGenerator.forBlock["is_facing_east"] = function (block, generator) {
  let code = `isFacingEast()`;
  return [code, Order.ATOMIC];
};

javascriptGenerator.forBlock["is_facing_north"] = function (block, generator) {
  let code = "isFacingNorth()";
  return [code, Order.ATOMIC];
};

javascriptGenerator.forBlock["is_facing_south"] = function (block, generator) {
  let code = "isFacingSouth()";
  return [code, Order.ATOMIC];
};

javascriptGenerator.forBlock["is_not_facing_west"] = function (
  block,
  generator
) {
  let code = "isNotFacingWest()";
  return [code, Order.ATOMIC];
};

javascriptGenerator.forBlock["is_not_facing_east"] = function (
  block,
  generator
) {
  let code = "isNotFacingEast()";
  return [code, Order.ATOMIC];
};

javascriptGenerator.forBlock["is_not_facing_north"] = function (
  block,
  generator
) {
  let code = "isNotFacingNorth()";
  return [code, Order.ATOMIC];
};

javascriptGenerator.forBlock["is_not_facing_south"] = function (
  block,
  generator
) {
  let code = "isNotFacingSouth()";
  return [code, Order.ATOMIC];
};

//block/clear logic
javascriptGenerator.forBlock["front_is_clear"] = function (block, generator) {
  let code = "frontIsClear()";
  return [code, Order.ATOMIC];
};

javascriptGenerator.forBlock["front_is_blocked"] = function (block, generator) {
  let code = "frontIsBlocked()";
  return [code, Order.ATOMIC];
};

javascriptGenerator.forBlock["left_is_clear"] = function (block, generator) {
  let code = "leftIsClear()";
  return [code, Order.ATOMIC];
};

javascriptGenerator.forBlock["left_is_blocked"] = function (block, generator) {
  let code = "leftIsBlocked()";
  return [code, Order.ATOMIC];
};

javascriptGenerator.forBlock["right_is_clear"] = function (block, generator) {
  let code = "rightIsClear()";
  return [code, Order.ATOMIC];
};

javascriptGenerator.forBlock["right_is_blocked"] = function (block, generator) {
  let code = "rightIsBlocked()";
  return [code, Order.ATOMIC];
};

//beeper logic
javascriptGenerator.forBlock["beepers_present"] = function (block, generator) {
  let code = "beepersPresent()";
  return [code, Order.ATOMIC];
};

javascriptGenerator.forBlock["no_beepers_present"] = function (
  block,
  generator
) {
  let code = "noBeepersPresent()";
  return [code, Order.ATOMIC];
};

javascriptGenerator.forBlock["starting_point"] = function (block, generator) {
  let code = "";
  return code;
};
