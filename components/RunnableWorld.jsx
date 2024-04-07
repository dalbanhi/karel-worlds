'use client'
import { useState } from 'react';
// import { NextReactP5Wrapper } from '@p5-wrapper/next';
import { useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import {Stage, Container, useTick} from '@pixi/react';
import RunnableGrid from '@components/PixiJS/RunnableGrid';

// import Karel from '@utils/p5-utils/Karel';
// import Grid from '@utils/p5-utils/Grid';
import Interpreter from 'js-interpreter';

const RunnableWorld = ({name, canvasSize, interactableName, worldDimensions, rawCode}) => {

    //temporary testing variables
    const temporaryCanvasSize = {width: 450, height: 450};
    // const temporaryWorldDimensions = {width: 10, height: 10};
    

    const [runDrawLoop, setRunDrawLoop] = useState(false);

    function moveForward(){
        gridRef.current.moveForward();
    }

    function turnLeft(){
        gridRef.current.turnLeft();
    }


    //js-interpreter api
    function initApi(interpreter, globalObject){
        let moveForwardWrapper = function(){
            return moveForward();
        };
        interpreter.setProperty(globalObject, 'moveForward', interpreter.createNativeFunction(moveForwardWrapper));
        let turnLeftWrapper = function(){
            return turnLeft();
        }
        interpreter.setProperty(globalObject, 'turnLeft', interpreter.createNativeFunction(turnLeftWrapper));
    }


    //js-interpreter to run code
    const interpreter = useRef(null);
    const gridRef = useRef(null);

    // let interpreter = new Interpreter(rawCode, initApi);
    let stack = [];
    let ok;

    //js-interpreter functions to step through code
    function stepCode(){
        console.log("stepping code");
        stack = interpreter.current.getStateStack();
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
            ok = interpreter.current.step();
        } finally {
            if(!ok){
                console.log("done");
                setRunDrawLoop(false);
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

    const [app, setApp] = useState();
    // useTick((delta) => {
    //     console.log("TICKING")
    //     console.log("runDrawLoop: ", runDrawLoop);
    //     console.loog("delta: ", delta);
    //     if(runDrawLoop){
    //         stepCode();
    //         console.log("ENDED ONE DRAW LOOP <----------------->");
    //     }
    // });
    return (
        <section>
            {console.log("RENDERED")}
            {/* {console.log("karel: ", karel)} */}
            <p>{name}, {interactableName}, {worldDimensions.width}, {worldDimensions.height}</p>
            <button
                onClick={() => {
                    interpreter.current = new Interpreter(rawCode, initApi);
                    setRunDrawLoop(true)
                }}
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
            <button
                className='form_button'
                onClick={() => {
                    console.log("step");
                    if(runDrawLoop){
                        stepCode();
                        console.log("ENDED ONE DRAW LOOP <----------------->");
                    }
                    app.renderer.render(app.stage)
                }}
            >   
                Step
            </button>
            <Stage 
                width={temporaryCanvasSize.width} 
                height={temporaryCanvasSize.height}
                raf={false}
                renderOnComponentChange={true} 
                onMount={(app) => setApp(app)}
                options={{background: 0xFFFFFF}}>   
                <Container 
                    x={0} y={0} >
                    <RunnableGrid 
                        pxWidth={temporaryCanvasSize.width} 
                        pxHeight={temporaryCanvasSize.height} 
                        rows={worldDimensions.width} 
                        cols={worldDimensions.height} 
                        maxWorldWH={50}
                        ref={gridRef}
                    />
                </Container>
            
            </Stage>
        </section>
    )
}

export default RunnableWorld;

