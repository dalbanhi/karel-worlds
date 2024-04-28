'use client'
import { useState } from 'react';
import { useEffect, useRef, forwardRef } from 'react';

import {Stage, Container, useTick} from '@pixi/react';
import RunnableGrid from '@components/PixiJS/RunnableGrid';

import Interpreter from 'js-interpreter';
import KarelElement from '@utils/karel-elements/KarelElement';
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




const RunnableWorld = ({name, canvasSize, worldDimensions, rawCode, initialKarel, initialBeeper, initialBeepersList, maxWorldWH, setKarelRunning, setRunningWorldBeeperList, setShouldCheckSolution}) => {
    
    //references for grid, interpreter and runLoop
    const runLoop = useRef(false);
    const interpreter = useRef(null);
    const gridRef = useRef(null);
    const shouldCheckPuzzle = useRef(false);

    //js-interpreter api
    function initApi(interpreter, globalObject){

        //movement actions
        interpreter.setProperty(globalObject, 'moveForward', interpreter.createNativeFunction(() => {
            try{
                gridRef.current.moveForward();   //movement functions
            }catch(e){
                throw e;
            }
        }));

        interpreter.setProperty(globalObject, 'turnLeft', interpreter.createNativeFunction(() => { gridRef.current.turnLeft()}));

        //beeper actions
        interpreter.setProperty(globalObject, 'putBeeper', interpreter.createNativeFunction(() => {
            try{
                gridRef.current.putBeeper();
            }
            catch(e){
                throw e;
            }
        }));
        interpreter.setProperty(globalObject, 'takeBeeper', interpreter.createNativeFunction(() => {
            try{
                gridRef.current.takeBeeper();
            }
            catch(e){
                throw e;
            }
        }));

        //direction logic
        interpreter.setProperty(globalObject, 'isFacingEast', interpreter.createNativeFunction(() => {return gridRef.current.isFacingEast()}));
        interpreter.setProperty(globalObject, 'isFacingNorth', interpreter.createNativeFunction(() => {return gridRef.current.isFacingNorth()}));
        interpreter.setProperty(globalObject, 'isFacingWest', interpreter.createNativeFunction(() => {return gridRef.current.isFacingWest()}));
        interpreter.setProperty(globalObject, 'isFacingSouth', interpreter.createNativeFunction(() => {return gridRef.current.isFacingSouth()}));
        interpreter.setProperty(globalObject, 'isNotFacingEast', interpreter.createNativeFunction(() => {return gridRef.current.isNotFacingEast()}));
        interpreter.setProperty(globalObject, 'isNotFacingNorth', interpreter.createNativeFunction(() => {return gridRef.current.isNotFacingNorth()}));
        interpreter.setProperty(globalObject, 'isNotFacingWest', interpreter.createNativeFunction(() => {return gridRef.current.isNotFacingWest()}));
        interpreter.setProperty(globalObject, 'isNotFacingSouth', interpreter.createNativeFunction(() => {return gridRef.current.isNotFacingSouth()}));

        //block/clear logic
        interpreter.setProperty(globalObject, 'frontIsClear', interpreter.createNativeFunction(() => {return gridRef.current.frontIsClear()}));
        interpreter.setProperty(globalObject, 'frontIsBlocked', interpreter.createNativeFunction(() => {return gridRef.current.frontIsBlocked()}));
        interpreter.setProperty(globalObject, 'leftIsClear', interpreter.createNativeFunction(() => {return gridRef.current.leftIsClear()}));
        interpreter.setProperty(globalObject, 'leftIsBlocked', interpreter.createNativeFunction(() => {return gridRef.current.leftIsBlocked()}));
        interpreter.setProperty(globalObject, 'rightIsClear', interpreter.createNativeFunction(() => {return rightIsClear()}));
        interpreter.setProperty(globalObject, 'rightIsBlocked', interpreter.createNativeFunction(() => {return gridRef.current.rightIsBlocked()}));

        //beeper logic
        interpreter.setProperty(globalObject, 'beepersPresent', interpreter.createNativeFunction(() => {return gridRef.current.beepersPresent()}));
        interpreter.setProperty(globalObject, 'noBeepersPresent', interpreter.createNativeFunction(() => {return gridRef.current.noBeepersPresent()}));
    }


    //js-interpreter to run code
 

    // let interpreter = new Interpreter(rawCode, initApi);
    let stack = [];
    let ok;

    //js-interpreter functions to step through code
    function stepCode(){
        stack = interpreter.current.getStateStack();
        //TODO: Add code highlighting
        let stepAgain = !isLine(stack);
        try {
            ok = interpreter.current.step();
        } finally {
            if(!ok){
                runLoop.current = false;
                stepAgain = false;
                shouldCheckPuzzle.current = true;
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

    //interval to run code
    useInterval(() => {
        if(runLoop.current){
            try{
                stepCode();
            }
            catch(e){
                alert(e);
                runLoop.current = false;
            }
            app.renderer.render(app.stage);

            if(shouldCheckPuzzle.current){
                setShouldCheckSolution(true);
                shouldCheckPuzzle.current = false;
            }
        }

    }, karelSpeed);


    return (
        <section>
            {name && <h1 className='text-xl font-extrabold'>{name}</h1>}
            <section className='mb-2'>
                <button
                    onClick={() => {
                        gridRef.current.resetGrid();//reset the grid
                        interpreter.current = new Interpreter(rawCode, initApi); //reset the interpreter with the new code
                        runLoop.current = true; //continue the loop
                    }}
                    className='form_button'
                >
                    Run
                </button>
                <button
                    className='form_button'
                    onClick={() => {
                        gridRef.current.resetGrid(); //reset the grid
                        runLoop.current = false; //stop the loop
                    }}
                >   
                    Reset
                </button>
                Slow <input type="range" id="karelSpeed" name="karelSpeed" 
                    min={`50`} max={`500`} 
                    value={karelSpeed || 250}
                    step={`50`}
                    className='speed_range reversed_range' 
                    list="tickmarks"
                    onChange={(e) => {
                        setKarelSpeed(e.target.value); 
                    }}
                /> Fast
                <datalist id="tickmarks">
                    <option value="50" label="Slow" />
                    <option value="100" />
                    <option value="150" />
                    <option value="200" />
                    <option value="250" />
                    <option value="300" />
                    <option value="350" />
                    <option value="400" />
                    <option value="450" />
                    <option value="500" label="Fast" />
                </datalist>
            </section>
            
            <Stage 
                width={canvasSize.width} 
                height={canvasSize.height}
                raf={false}
                renderOnComponentChange={true} 
                onMount={(app) => setApp(app)}
                options={{background: 0xFFFFFF}}>   
                <Container 
                    x={0} y={0} >
                    <RunnableGrid 
                        pxWidth={canvasSize.width} 
                        pxHeight={canvasSize.height} 
                        rows={worldDimensions?.width} 
                        cols={worldDimensions?.height} 
                        maxWorldWH={maxWorldWH}
                        ref={gridRef}
                        initialKarel={initialKarel}
                        initialBeeper={initialBeeper}
                        initialBeepersList={initialBeepersList}
                        setKarelRunning={setKarelRunning}
                        setRunningWorldBeeperList={setRunningWorldBeeperList}
                    />
                </Container>
            
            </Stage>
        </section>
    )
}

export default RunnableWorld;

