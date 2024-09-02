// karel-simple.peggy
{{
	function frontIsClear(){
    	return true;
    }
}}


// The start rule defines what a valid program is
start
  = _ statement* _

// Define the rules for different types of statements
statement
  = moveForwardStatement
  / turnLeftStatement
  / ifStatement
  / whileStatement

moveForwardStatement
  = "moveForward" "(" ")" _ ";" { return { type: "MoveForwardStatement" }; }

turnLeftStatement
  = "turnLeft" "(" ")" _ ";" { return { type: "TurnLeftStatement" }; }

ifStatement
  = "if" _ "(" _ condition _ ")" _ "{" _ statement* _ "}" { return { type: "IfStatement", condition, statements: statement }; }

whileStatement
  = "while" _ "(" _ condition _ ")" _ "{" _ statement* _ "}" { return { type: "WhileStatement", condition, statements: statement }; }

// Define the condition which can be a specific type of condition
condition
  = frontIsClearCondition
 
BooleanLiteral
  = "true"  { return { type: "Literal", value: true  }; }
  / "false" { return { type: "Literal", value: false }; }


// Define a specific condition
frontIsClearCondition
  = "frontIsClear" "(" ")" { return { type: "FrontIsClearCondition", value: frontIsClear()}; }




// Skip whitespace
_ 
  = [ \t\n\r]*
