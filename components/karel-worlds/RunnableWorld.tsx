"use client";
import { useCallback, useMemo, useState } from "react";
import { useEffect, useRef } from "react";

import { Stage, Container } from "@pixi/react";
import RunnableGrid from "@/components/PixiJS/RunnableGrid";
import { windowSizeType } from "@/types";
import { worldInfoType, puzzleImagesType } from "@/types/karelWorld";
import { Button } from "@/components/ui/button";
import { PlayIcon, ResetIcon } from "@radix-ui/react-icons";
import { Slider } from "@/components/ui/slider";
import Image from "next/image";

import Interpreter from "js-interpreter";
import { toast, useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Application, ICanvas } from "pixi.js";

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
  const { toast } = useToast();

  //references for grid, interpreter and runLoop
  const runLoop = useRef<boolean>(false);
  const interpreter = useRef<typeof Interpreter | null>(null);
  const gridRef = useRef<any>(null);
  const shouldCheckPuzzle = useRef<boolean>(false);
  const stepCodeRef = useRef<() => void>(() => {});

  const initApi = useCallback(
    (interpreter: typeof Interpreter, globalObject: any) => {
      interpreter.setProperty(
        globalObject,
        "moveForward",
        interpreter.createNativeFunction(async () => {
          try {
            await gridRef.current.moveForward();
            gridRef.current.updateRunningWorld();
          } catch (e: any) {
            toast({
              variant: "destructive",
              title: "Error",
              description: e.message,
            });
          }
        })
      );

      interpreter.setProperty(
        globalObject,
        "turnLeft",
        interpreter.createNativeFunction(async () => {
          await gridRef.current.turnLeft();
          gridRef.current.updateRunningWorld();
        })
      );

      //beeper actions
      interpreter.setProperty(
        globalObject,
        "putBeeper",
        interpreter.createNativeFunction(async () => {
          try {
            await gridRef.current.putBeeper();
            gridRef.current.updateRunningWorld();
          } catch (e: any) {
            toast({
              variant: "destructive",
              title: "Error",
              description: e.message,
            });
          }
        })
      );
      interpreter.setProperty(
        globalObject,
        "takeBeeper",
        interpreter.createNativeFunction(async () => {
          try {
            await gridRef.current.takeBeeper();
            gridRef.current.updateRunningWorld();
          } catch (e: any) {
            toast({
              variant: "destructive",
              title: "Error",
              description: e.message,
            });
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
    },
    [toast]
  );
  // interpreter.current = new Interpreter(rawCode, initApi);
  // const interpreter =

  const resetGridWithNewCode = () => {
    gridRef.current.resetGrid();
    interpreter.current = new Interpreter(rawCode, initApi);
  };

  // js-interpreter to run code
  const isLine = useCallback((stack: any[]) => {
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

    if (
      (isLine as any).oldStack_[(isLine as any).oldStack_.length - 1] === state
    ) {
      // Never repeat the same statement multiple times.
      // Typically a statement is stepped into and out of.
      return false;
    }

    if (
      (isLine as any).oldStack_.indexOf(state) !== -1 &&
      type !== "ForStatement" &&
      type !== "WhileStatement" &&
      type !== "DoWhileStatement"
    ) {
      // Don't revisit a statement on the stack (e.g. 'if') when exiting.
      // The exception is loops.
      return false;
    }

    (isLine as any).oldStack_ = stack.slice();
    return true;
  }, []);
  (isLine as any).oldStack_ = [];

  const stepCode = useCallback(() => {
    let stack: any = [];
    let ok = interpreter.current.step();
    //TODO: Add code highlighting?
    stack = interpreter.current.getStateStack();
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
  }, [interpreter, isLine]);

  // stepCodeRef.current = stepCode;

  // Update the ref to ensure stepCode is up-to-date
  //slider values for speed
  //slider values for speed
  const minSliderValue = 25;
  const stepValue = 25;
  const maxSliderValue = 500;
  const [sliderValue, setSliderValue] = useState<number>(50);

  // Directly calculate `karelSpeed` based on the `sliderValue`
  const karelSpeed = useMemo(
    () => maxSliderValue - (sliderValue - stepValue),
    [sliderValue]
  );

  const handleValueChange = useCallback((value: number[]) => {
    setSliderValue(value[0]);
  }, []);

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
      // app?.renderer.render(app.stage);

      if (shouldCheckPuzzle.current) {
        setShouldCheckSolution(true);
        shouldCheckPuzzle.current = false;
      }
    }
  }, karelSpeed);

  const currPxWidth =
    worldDimensions.width >= worldDimensions.height
      ? canvasSize.width
      : Math.floor(
          canvasSize.width * (worldDimensions.width / worldDimensions.height)
        );

  const currPxHeight =
    worldDimensions.width >= worldDimensions.height
      ? Math.floor(
          canvasSize.height * (worldDimensions.height / worldDimensions.width)
        )
      : canvasSize.height;

  return (
    <section className="flex flex-col items-center justify-center p-2">
      <section className="mb-2 flex flex-col gap-2 p-4">
        <div className="flex items-center justify-center gap-4">
          <Button
            type="button"
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
            type="button"
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
            aria-label="CHoose a speed for Karel"
            name="karelSpeed"
            role="slider"
            aria-valuemin={minSliderValue}
            aria-valuemax={maxSliderValue}
            aria-valuenow={sliderValue}
            value={[sliderValue]}
            min={minSliderValue}
            max={maxSliderValue}
            step={stepValue}
            onValueChange={(value) => {
              handleValueChange(value);
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
        width={currPxWidth}
        height={currPxHeight}
        options={{ background: 0xffffff }}
      >
        <Container x={0} y={0} sortableChildren={true}>
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
