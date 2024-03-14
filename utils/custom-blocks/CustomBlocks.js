import Blockly from 'blockly';
import { javascriptGenerator } from 'blockly/javascript';

Blockly.Blocks['move_forward'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("moveForward");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(330);
   this.setTooltip("Move one step forward (direction you are facing)");
   this.setHelpUrl("");
    }
  };

javascriptGenerator.forBlock['move_forward'] = function(block, generator) {
    // TODO: Assemble javascript into code variable.
    var code = 'moveForward();\n';
    return code;
  };

// Blockly.JavaScript['move_forward'] = function(block) {
//     return 'moveForward();\n';
// }

// Blockly.Blocks['turn_right'] = {
//     init: function() {
//         this.appendDummyInput()
//             .appendField("Turn Right");
//         this.setPreviousStatement(true, null);
//         this.setNextStatement(true, null);
//         this.setColour(230);
//         this.setTooltip("");
//         this.setHelpUrl("");
//     }
// };

// Blockly.JavaScript['turn_right'] = function(block) {
//     return 'turnRight();\n';
// }
