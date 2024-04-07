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
import { set } from 'mongoose';

//from: https://overreacted.io/making-setinterval-declarative-with-react-hooks/ 
function useInterval(callback, delay){
    const savedCallback = useRef();

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback])

    useEffect(() => {
        function tick(){
            savedCallback.current();
        }
        if(delay !== null){
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay])
}




const RunnableWorld = ({name, canvasSize, interactableName, worldDimensions, rawCode}) => {

    //temporary testing variables
    const temporaryCanvasSize = {width: 450, height: 450};
    const tempInitialKarel = {
        x: 0,
        y: 0,
        direction: "east",
        beeperBag: 0,
        placedBeepers: [],
        img: "/assets/images/karel/karel.png"
        
    }
    

    // const [runDrawLoop, setRunDrawLoop] = useState(false);
    const runLoop = useRef(false);

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
                // setRunDrawLoop(false);
                runLoop.current = false;
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
    const [karelSpeed, setKarelSpeed] = useState(500);

    useEffect(() => {
        console.log("useEffect");
        // console.log("runDrawLoop: ", runDrawLoop);
        // app = new PIXI.Application({
        //     width: temporaryCanvasSize.width,
        //     height: temporaryCanvasSize.height,
        //     backgroundColor: 0x1099bb,
        //     resolution: window.devicePixelRatio || 1,

        // });

    }, [karelSpeed]);
    // useTick((delta) => {
    //     console.log("TICKING")
    //     console.log("runDrawLoop: ", runDrawLoop);
    //     console.loog("delta: ", delta);
    //     if(runDrawLoop){
    //         stepCode();
    //         console.log("ENDED ONE DRAW LOOP <----------------->");
    //     }
    // });

    // function runCode(){
    //     const running = setInterval(() => {
    //         console.log("TICKING")
    //         // console.log("runDrawLoop: ", runDrawLoop);
    //         console.log("running: ", runLoop.current);
    //         if(runLoop.current){
    //             stepCode();
    //             console.log("ENDED ONE DRAW LOOP <----------------->");
    //             app.renderer.render(app.stage)
    //         }
    //         else{
    //             console.log("clearing interval")
    //             clearInterval(running);
    //         }
            
            
    //     }, 1000);
    // }

    useInterval(() => {
        console.log("TICKING")
        // console.log("runDrawLoop: ", runDrawLoop);
        console.log("running: ", runLoop.current);
        if(runLoop.current){
            stepCode();
            console.log("ENDED ONE DRAW LOOP <----------------->");
            // app.renderer.render(app.stage)
        }
        else{
            console.log("clearing interval");
            //HOW TO CLEAR THE INTERVAL ONCE THE CODE IS DONE RUNNING BUT NOT WHEN THE USER HAS NOT CLICKED RUN
            

            // setKarelSpeed(null);
            // clearInterval(running);
        }

    }, karelSpeed);


    return (
        <section>
            {console.log("RENDERED")}
            {/* {console.log("karel: ", karel)} */}
            <p>{name}, {interactableName}, {worldDimensions.width}, {worldDimensions.height}</p>
            <section className='my-2'>
                <button
                    onClick={() => {
                        gridRef.current.resetGrid();
                        interpreter.current = new Interpreter(rawCode, initApi);
                        // setRunDrawLoop(true);
                        runLoop.current = true;
                        setKarelSpeed( (karelSpeed) => {
                            if(karelSpeed === null){
                                return 500;
                            } else {
                                return karelSpeed;
                            }
                        } );
                        
                        // runCode();
                    }}
                    className='form_button'
                >
                    Run
                </button>
                <button
                    className='form_button'
                    onClick={() => {
                        console.log("reset");
                        gridRef.current.resetGrid();
                        
                        // setRunDrawLoop(false);
                        runLoop.current = false;
                        //pausing the interval
                        setKarelSpeed(null);
                    
                    }}
                >   
                    Reset
                </button>
                {/* <button
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
                </button> */}
                <label htmlFor="karelSpeed" className='form_label'>
                   Karel Speed: <span>{karelSpeed}</span>
                </label>
                <input type="range" id="karelSpeed" name="karelSpeed" 
                    min={`100`} max={`1000`} 
                    value={karelSpeed || 500}
                    className='form_range' 
                    onChange={(e) => {setKarelSpeed(e.target.value); console.log(e.target.value)}}
                />
            </section>
            
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
                        initialKarel={tempInitialKarel}
                    />
                </Container>
            
            </Stage>
        </section>
    )
}

export default RunnableWorld;

