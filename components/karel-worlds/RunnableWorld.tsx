"use client";
import { useState } from "react";
import { useEffect, useRef, forwardRef } from "react";

import { Stage, Container, useTick } from "@pixi/react";
import RunnableGrid from "@/components/PixiJS/RunnableGrid";
import { windowSizeType } from "@/types";
import { worldInfoType, puzzleImagesType } from "@/types/karelWorld";
import { Button } from "@/components/ui/button";
import { PlayIcon, ResetIcon } from "@radix-ui/react-icons";
import { Slider } from "@/components/ui/slider";
import TickMarkSlider from "./RunnableWorld/TickMarkSlider";
import Image from "next/image";

import Interpreter from "js-interpreter";
// import KarelElement from "@utils/karel-elements/KarelElement";
//from: https://overreacted.io/making-setinterval-declarative-with-react-hooks/
// function useInterval(callback, delay){
//     const savedCallback = useRef();

//     useEffect(() => {
//         savedCallback.current = callback;
//     }, [callback])

//     useEffect(() => {
//         function tick(){
//             savedCallback.current();
//         }
//         if(delay !== null){
//             let id = setInterval(tick, delay);
//             return () => clearInterval(id);
//         }
//     }, [delay])
// }

interface RunnableWorldProps {
  name: string;
  rawCode: string;
  canvasSize: windowSizeType;
  worldDimensions: { width: number; height: number };
  worldInfo: worldInfoType;
  images: puzzleImagesType;
}

const RunnableWorld: React.FC<RunnableWorldProps> = ({
  name,
  canvasSize,
  worldDimensions,
  rawCode,
  worldInfo,
  images,
  //   setKarelRunning,
  //   setRunningWorldBeeperList,
  //   setShouldCheckSolution,
}) => {
  //references for grid, interpreter and runLoop
  const runLoop = useRef(false);
  const interpreter = useRef(null);
  const gridRef = useRef(null);
  const shouldCheckPuzzle = useRef(false);

  //js-interpreter api
  // function initApi(interpreter, globalObject){

  //     //movement actions
  //     interpreter.setProperty(globalObject, 'moveForward', interpreter.createNativeFunction(() => {
  //         try{
  //             gridRef.current.moveForward();   //movement functions
  //         }catch(e){
  //             throw e;
  //         }
  //     }));

  //     interpreter.setProperty(globalObject, 'turnLeft', interpreter.createNativeFunction(() => { gridRef.current.turnLeft()}));

  //     //beeper actions
  //     interpreter.setProperty(globalObject, 'putBeeper', interpreter.createNativeFunction(() => {
  //         try{
  //             gridRef.current.putBeeper();
  //         }
  //         catch(e){
  //             throw e;
  //         }
  //     }));
  //     interpreter.setProperty(globalObject, 'takeBeeper', interpreter.createNativeFunction(() => {
  //         try{
  //             gridRef.current.takeBeeper();
  //         }
  //         catch(e){
  //             throw e;
  //         }
  //     }));

  //     //direction logic
  //     interpreter.setProperty(globalObject, 'isFacingEast', interpreter.createNativeFunction(() => {return gridRef.current.isFacingEast()}));
  //     interpreter.setProperty(globalObject, 'isFacingNorth', interpreter.createNativeFunction(() => {return gridRef.current.isFacingNorth()}));
  //     interpreter.setProperty(globalObject, 'isFacingWest', interpreter.createNativeFunction(() => {return gridRef.current.isFacingWest()}));
  //     interpreter.setProperty(globalObject, 'isFacingSouth', interpreter.createNativeFunction(() => {return gridRef.current.isFacingSouth()}));
  //     interpreter.setProperty(globalObject, 'isNotFacingEast', interpreter.createNativeFunction(() => {return gridRef.current.isNotFacingEast()}));
  //     interpreter.setProperty(globalObject, 'isNotFacingNorth', interpreter.createNativeFunction(() => {return gridRef.current.isNotFacingNorth()}));
  //     interpreter.setProperty(globalObject, 'isNotFacingWest', interpreter.createNativeFunction(() => {return gridRef.current.isNotFacingWest()}));
  //     interpreter.setProperty(globalObject, 'isNotFacingSouth', interpreter.createNativeFunction(() => {return gridRef.current.isNotFacingSouth()}));

  //     //block/clear logic
  //     interpreter.setProperty(globalObject, 'frontIsClear', interpreter.createNativeFunction(() => {return gridRef.current.frontIsClear()}));
  //     interpreter.setProperty(globalObject, 'frontIsBlocked', interpreter.createNativeFunction(() => {return gridRef.current.frontIsBlocked()}));
  //     interpreter.setProperty(globalObject, 'leftIsClear', interpreter.createNativeFunction(() => {return gridRef.current.leftIsClear()}));
  //     interpreter.setProperty(globalObject, 'leftIsBlocked', interpreter.createNativeFunction(() => {return gridRef.current.leftIsBlocked()}));
  //     interpreter.setProperty(globalObject, 'rightIsClear', interpreter.createNativeFunction(() => {return rightIsClear()}));
  //     interpreter.setProperty(globalObject, 'rightIsBlocked', interpreter.createNativeFunction(() => {return gridRef.current.rightIsBlocked()}));

  //     //beeper logic
  //     interpreter.setProperty(globalObject, 'beepersPresent', interpreter.createNativeFunction(() => {return gridRef.current.beepersPresent()}));
  //     interpreter.setProperty(globalObject, 'noBeepersPresent', interpreter.createNativeFunction(() => {return gridRef.current.noBeepersPresent()}));
  // }

  // js-interpreter to run code

  // let interpreter = new Interpreter(rawCode, initApi);
  // let stack = [];
  // let ok;

  // //js-interpreter functions to step through code
  // function stepCode(){
  //     stack = interpreter.current.getStateStack();
  //     //TODO: Add code highlighting
  //     let stepAgain = !isLine(stack);
  //     try {
  //         ok = interpreter.current.step();
  //     } finally {
  //         if(!ok){
  //             runLoop.current = false;
  //             stepAgain = false;
  //             shouldCheckPuzzle.current = true;
  //         }
  //     }
  //     if(stepAgain){
  //         stepCode();
  //     }
  // }

  // function isLine(stack){
  //     let state = stack[stack.length - 1];
  //     let node = state.node;
  //     let type = node.type;

  //     if (type !== 'VariableDeclaration' &&
  //         type.substr(-9) !== 'Statement') {
  //         // Current node is not a statement.
  //         return false;
  //     }

  //     if (type === 'BlockStatement') {
  //         // Not a 'line' by most definitions.
  //         return false;
  //     }

  //     if (type === 'VariableDeclaration' &&
  //         stack[stack.length - 2].node.type === 'ForStatement') {
  //         // This 'var' is not a line: for (var i = 0; ...)
  //         return false;
  //     }

  //     if (isLine.oldStack_[isLine.oldStack_.length - 1] === state) {
  //         // Never repeat the same statement multiple times.
  //         // Typically a statement is stepped into and out of.
  //         return false;
  //     }

  //     if (isLine.oldStack_.indexOf(state) !== -1 && type !== 'ForStatement' &&
  //         type !== 'WhileStatement' && type !== 'DoWhileStatement') {
  //         // Don't revisit a statement on the stack (e.g. 'if') when exiting.
  //         // The exception is loops.
  //         return false;
  //     }

  //     isLine.oldStack_ = stack.slice();
  //     return true;

  // }
  // isLine.oldStack_ = stack.slice();

  const [app, setApp] = useState();
  const [karelSpeed, setKarelSpeed] = useState(500);

  //interval to run code
  // useInterval(() => {
  //     if(runLoop.current){
  //         try{
  //             stepCode();
  //         }
  //         catch(e){
  //             alert(e);
  //             runLoop.current = false;
  //         }
  //         app.renderer.render(app.stage);

  //         if(shouldCheckPuzzle.current){
  //             setShouldCheckSolution(true);
  //             shouldCheckPuzzle.current = false;
  //         }
  //     }

  // }, karelSpeed);

  return (
    <section>
      {name && <h1 className="text-xl font-extrabold">{name}</h1>}
      <section className="mb-2 flex flex-col gap-2 p-4">
        <div className="flex items-center justify-center gap-4">
          <Button
            onClick={() => {
              console.log("Running code");
              // gridRef.current.resetGrid();//reset the grid
              // interpreter.current = new Interpreter(rawCode, initApi); //reset the interpreter with the new code
              // runLoop.current = true; //continue the loop
            }}
            className="flex items-center justify-center gap-2"
          >
            Run
            <PlayIcon />
          </Button>
          <Button
            onClick={() => {
              console.log("Resetting grid");
              // gridRef.current.resetGrid();
              // interpreter.current = new Interpreter(rawCode, initApi);
              // runLoop.current = false;
            }}
            className="flex items-center justify-center gap-2"
          >
            Reset
            <ResetIcon />
          </Button>
        </div>
        <div className="flex items-center space-x-4">
          <span>
            <Image
              src="/images/slider/slow.svg"
              alt="Slow"
              width={20}
              height={20}
            />
          </span>
          <Slider
            id="karelSpeed"
            name="karelSpeed"
            value={[karelSpeed || 50]}
            min={50}
            max={500}
            step={50}
            onValueChange={(value) => setKarelSpeed(value[0])}
            className="flex-1"
          />
          <span>
            <Image
              src="/images/slider/fast.svg"
              alt="Slow"
              width={20}
              height={20}
            />
          </span>
        </div>
      </section>

      <Stage
        width={canvasSize.width}
        height={canvasSize.height}
        raf={false}
        renderOnComponentChange={true}
        // onMount={(app) => setApp(app)}
        options={{ background: 0xffffff }}
      >
        <Container x={0} y={0}>
          <RunnableGrid
            pxWidth={canvasSize.width}
            pxHeight={canvasSize.height}
            worldDimensions={worldDimensions}
            ref={gridRef}
            images={images}
            worldInfo={worldInfo}
            // setKarelRunning={setKarelRunning}
            // setRunningWorldBeeperList={setRunningWorldBeeperList}
          />
        </Container>
      </Stage>
    </section>
  );
};

export default RunnableWorld;
