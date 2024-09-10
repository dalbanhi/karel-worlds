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
import Image from "next/image";

import Interpreter from "js-interpreter";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import {
  RunningKarelProvider,
  useRunningKarelContext,
} from "@/lib/context/RunningKarelContext";
import { Application, ICanvas } from "pixi.js";
import {
  GridElement,
  KarelElement,
} from "@/utils/custom/KarelElement/KarelElement";

//from: https://overreacted.io/making-setinterval-declarative-with-react-hooks/
function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef<() => void>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

interface RunnableWorldProps {
  name: string;
  rawCode: string;
  canvasSize: windowSizeType;
  worldDimensions: { width: number; height: number };
  worldInfo: worldInfoType;
  runningWorldInfo: worldInfoType;
  setRunningWorldInfo: React.Dispatch<React.SetStateAction<worldInfoType>>;
  images: puzzleImagesType;
  setShouldCheckSolution: React.Dispatch<React.SetStateAction<boolean>>;
}

const RunnableWorld: React.FC<RunnableWorldProps> = ({
  name,
  canvasSize,
  worldDimensions,
  rawCode,
  worldInfo,
  runningWorldInfo,
  setRunningWorldInfo,
  images,
  setShouldCheckSolution,
}) => {
  //slider values for speed
  const minSliderValue = 50;
  const stepValue = 50;
  const maxSliderValue = 500;

  const { toast } = useToast();

  //references for grid, interpreter and runLoop
  const runLoop = useRef<boolean>(false);
  const interpreter = useRef<typeof Interpreter | null>(null);
  const gridRef = useRef<any>(null);
  const shouldCheckPuzzle = useRef<boolean>(false);
  const stepCodeRef = useRef<() => void>(() => {});

  interpreter.current = new Interpreter(rawCode, initApi);

  //js-interpreter api
  function initApi(interpreter: typeof Interpreter, globalObject: any) {
    //movement actions
    interpreter.setProperty(
      globalObject,
      "moveForward",
      interpreter.createNativeFunction(() => {
        try {
          return gridRef.current.moveForward(); //movement functions
        } catch (e) {
          throw e;
        }
      })
    );

    interpreter.setProperty(
      globalObject,
      "turnLeft",
      interpreter.createNativeFunction(() => {
        return gridRef.current.turnLeft();
      })
    );

    //beeper actions
    interpreter.setProperty(
      globalObject,
      "putBeeper",
      interpreter.createNativeFunction(() => {
        try {
          gridRef.current.putBeeper();
        } catch (e) {
          throw e;
        }
      })
    );
    interpreter.setProperty(
      globalObject,
      "takeBeeper",
      interpreter.createNativeFunction(() => {
        try {
          gridRef.current.takeBeeper();
        } catch (e) {
          throw e;
        }
      })
    );

    //direction logic
    interpreter.setProperty(
      globalObject,
      "isFacingEast",
      interpreter.createNativeFunction(() => {
        return gridRef.current.isFacingEast();
      })
    );
    interpreter.setProperty(
      globalObject,
      "isFacingNorth",
      interpreter.createNativeFunction(() => {
        return gridRef.current.isFacingNorth();
      })
    );
    interpreter.setProperty(
      globalObject,
      "isFacingWest",
      interpreter.createNativeFunction(() => {
        return gridRef.current.isFacingWest();
      })
    );
    interpreter.setProperty(
      globalObject,
      "isFacingSouth",
      interpreter.createNativeFunction(() => {
        return gridRef.current.isFacingSouth();
      })
    );
    interpreter.setProperty(
      globalObject,
      "isNotFacingEast",
      interpreter.createNativeFunction(() => {
        return gridRef.current.isNotFacingEast();
      })
    );
    interpreter.setProperty(
      globalObject,
      "isNotFacingNorth",
      interpreter.createNativeFunction(() => {
        return gridRef.current.isNotFacingNorth();
      })
    );
    interpreter.setProperty(
      globalObject,
      "isNotFacingWest",
      interpreter.createNativeFunction(() => {
        return gridRef.current.isNotFacingWest();
      })
    );
    interpreter.setProperty(
      globalObject,
      "isNotFacingSouth",
      interpreter.createNativeFunction(() => {
        return gridRef.current.isNotFacingSouth();
      })
    );

    //block/clear logic
    interpreter.setProperty(
      globalObject,
      "frontIsClear",
      interpreter.createNativeFunction(() => {
        return gridRef.current.frontIsClear();
      })
    );
    interpreter.setProperty(
      globalObject,
      "frontIsBlocked",
      interpreter.createNativeFunction(() => {
        return gridRef.current.frontIsBlocked();
      })
    );
    interpreter.setProperty(
      globalObject,
      "leftIsClear",
      interpreter.createNativeFunction(() => {
        return gridRef.current.leftIsClear();
      })
    );
    interpreter.setProperty(
      globalObject,
      "leftIsBlocked",
      interpreter.createNativeFunction(() => {
        return gridRef.current.leftIsBlocked();
      })
    );
    interpreter.setProperty(
      globalObject,
      "rightIsClear",
      interpreter.createNativeFunction(() => {
        return gridRef.current.rightIsClear();
      })
    );
    interpreter.setProperty(
      globalObject,
      "rightIsBlocked",
      interpreter.createNativeFunction(() => {
        return gridRef.current.rightIsBlocked();
      })
    );

    //beeper logic
    interpreter.setProperty(
      globalObject,
      "beepersPresent",
      interpreter.createNativeFunction(() => {
        return gridRef.current.beepersPresent();
      })
    );
    interpreter.setProperty(
      globalObject,
      "noBeepersPresent",
      interpreter.createNativeFunction(() => {
        return gridRef.current.noBeepersPresent();
      })
    );
  }

  const resetGridWithNewCode = () => {
    gridRef.current.resetGrid();
    interpreter.current = new Interpreter(rawCode, initApi);
  };

  // js-interpreter to run code

  // let internalInterpreter = new Interpreter(rawCode, initApi);
  let stack: any = [];
  let ok: boolean;

  //js-interpreter functions to step through code
  function stepCode() {
    stack = interpreter.current.getStateStack();
    //TODO: Add code highlighting
    let stepAgain = !isLine(stack);
    try {
      ok = interpreter.current.step();
    } finally {
      if (!ok) {
        runLoop.current = false;
        stepAgain = false;
        shouldCheckPuzzle.current = true;
        //batched update of the running world info
        gridRef.current.updateRunningWorld();
      }
    }
    if (stepAgain) {
      stepCodeRef.current();
    }
  }

  function isLine(stack: any[]) {
    let state = stack[stack.length - 1];
    let node = state.node;
    let type = node.type;

    if (type !== "VariableDeclaration" && type.substr(-9) !== "Statement") {
      // Current node is not a statement.
      return false;
    }

    if (type === "BlockStatement") {
      // Not a 'line' by most definitions.
      return false;
    }

    if (
      type === "VariableDeclaration" &&
      stack[stack.length - 2].node.type === "ForStatement"
    ) {
      // This 'var' is not a line: for (var i = 0; ...)
      return false;
    }

    if (isLine.oldStack_[isLine.oldStack_.length - 1] === state) {
      // Never repeat the same statement multiple times.
      // Typically a statement is stepped into and out of.
      return false;
    }

    if (
      isLine.oldStack_.indexOf(state) !== -1 &&
      type !== "ForStatement" &&
      type !== "WhileStatement" &&
      type !== "DoWhileStatement"
    ) {
      // Don't revisit a statement on the stack (e.g. 'if') when exiting.
      // The exception is loops.
      return false;
    }

    isLine.oldStack_ = stack.slice();
    return true;
  }
  isLine.oldStack_ = stack.slice();

  // Update the ref to ensure stepCode is up-to-date
  const [app, setApp] = useState<Application<ICanvas>>();
  const [sliderValue, setSliderValue] = useState<number>(50);
  const karelSpeed = maxSliderValue - (sliderValue - minSliderValue);

  // const should

  //interval to run code
  useInterval(() => {
    if (runLoop.current) {
      try {
        stepCode();
      } catch (e: any) {
        //immediately stop the loop
        runLoop.current = false;

        toast({
          variant: "destructive",
          title: "Error",
          description: e.message,
          action: (
            <ToastAction
              onClick={() => {
                resetGridWithNewCode();
              }}
              altText="Reset"
            >
              Reset
            </ToastAction>
          ),
        });
      }

      if (shouldCheckPuzzle.current) {
        setShouldCheckSolution(true);
        shouldCheckPuzzle.current = false;
      }
    }
  }, karelSpeed);

  return (
    <section>
      {name && <h1 className="text-xl font-extrabold">{name}</h1>}
      <section className="mb-2 flex flex-col gap-2 p-4">
        <div className="flex items-center justify-center gap-4">
          <Button
            onClick={() => {
              resetGridWithNewCode();
              runLoop.current = true; //continue the loop
            }}
            className="flex items-center justify-center gap-2"
          >
            Run
            <PlayIcon />
          </Button>
          <Button
            onClick={() => {
              resetGridWithNewCode();
              runLoop.current = false; //reset the loop
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
            value={[sliderValue]}
            min={minSliderValue}
            max={maxSliderValue}
            step={stepValue}
            onValueChange={(value) => {
              setSliderValue(value[0]);
            }}
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
        onMount={(app) => setApp(app)}
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
            runningWorldInfo={runningWorldInfo}
            setRunningWorldInfo={setRunningWorldInfo}
          />
        </Container>
      </Stage>
    </section>
  );
};

export default RunnableWorld;
