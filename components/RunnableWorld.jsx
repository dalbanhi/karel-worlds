'use client'
import { isValidElement, useState } from 'react';
import { NextReactP5Wrapper } from '@p5-wrapper/next';

import Karel from '@utils/p5-utils/Karel';
import Grid from '@utils/p5-utils/Grid';
import Interpreter from 'js-interpreter';

const RunnableWorld = ({name, canvasSize, interactableName, worldDimensions, rawCode}) => {

    const [runDrawLoop, setRunDrawLoop] = useState(false);

    const sketch = (p5) => {

        // 'global' p5 variables
        let karel;
        let grid;

        // 'global' p5 functions
        function moveForward(){
            karel.moveForward();
        }

        function turnLeft(){
            karel.turnLeft();
        }

        //js-interpreter api
        function initApi(interpreter, globalObject){
            var wrapper = function(){
                return moveForward();
            };
            interpreter.setProperty(globalObject, 'moveForward', interpreter.createNativeFunction(wrapper));
            var wrapper = function(){
                return turnLeft();
            }
            interpreter.setProperty(globalObject, 'turnLeft', interpreter.createNativeFunction(wrapper));
        }
        //js-interpreter to run code
        let interpreter = new Interpreter(rawCode, initApi);
        let stack = [];
        let ok;

        //js-interpreter functions to step through code
        function stepCode(){
            stack = interpreter.getStateStack();
            console.log(stack);
            // let node;
            // let start;
            // let end;
            // if(stack.length){
            //     node = stack[stack.length - 1].node;
            //     start = node.start;
            //     end = node.end;
            // } else {
            //     node = null;
            //     start = 0;
            //     end = 0;
            // }
            // createSelection(start, end);
            let stepAgain = !isLine(stack);
            try {
                ok = interpreter.step();
                // console.log(ok);
                // console.log("just stepped");
            } finally {
                if(!ok){
                    console.log("done");
                    // setRunDrawLoop(false);
                    stepAgain = false;
                }
            }
            if(stepAgain){
                stepCode();
            }
        }

        function isLine(stack){
            let state = stack[stack.length - 1];
            let node = state.node;
            let type = node.type;

            if (type !== 'VariableDeclaration' &&
                type.substr(-9) !== 'Statement') {
                // Current node is not a statement.
                return false;
            }
        
            if (type === 'BlockStatement') {
                // Not a 'line' by most definitions.
                return false;
            }
        
            if (type === 'VariableDeclaration' &&
                stack[stack.length - 2].node.type === 'ForStatement') {
                // This 'var' is not a line: for (var i = 0; ...)
                return false;
            }
        
            if (isLine.oldStack_[isLine.oldStack_.length - 1] === state) {
                // Never repeat the same statement multiple times.
                // Typically a statement is stepped into and out of.
                return false;
            }
        
            if (isLine.oldStack_.indexOf(state) !== -1 && type !== 'ForStatement' &&
                type !== 'WhileStatement' && type !== 'DoWhileStatement') {
                // Don't revisit a statement on the stack (e.g. 'if') when exiting.
                // The exception is loops.
                return false;
            }
        
            isLine.oldStack_ = stack.slice();
            return true;

        }
        isLine.oldStack_ = stack.slice();


        p5.setup = () => {
            p5.createCanvas(canvasSize.width, canvasSize.height);
            p5.rectMode(p5.CENTER);
            p5.background(200);
            grid = new Grid(p5, canvasSize.width, canvasSize.height, worldDimensions.width, worldDimensions.height, "black");
            grid.display();
            karel = new Karel(p5, 100, 100, 50, 50, "karel");
            karel.display();
            p5.frameRate(1);
        };
      
        p5.draw = () => {

            if(runDrawLoop){
                p5.background(200);
                grid.display();

                karel.display();
                stepCode();
                console.log("ENDED ONE DRAW LOOP <----------------->");
            }
            
        };
    };
    return (
        <section>
            <p>{name}, {interactableName}, {worldDimensions.width}, {worldDimensions.height}</p>
            <button
                onClick={() => {setRunDrawLoop(true)}}
                className='form_button'
            >
                Run
            </button>
            <button
                className='form_button'
                onClick={() => {setRunDrawLoop(false)}}
            >   
                Reset
            </button>
            <NextReactP5Wrapper sketch={sketch} />
        </section>
    )
}

export default RunnableWorld;

