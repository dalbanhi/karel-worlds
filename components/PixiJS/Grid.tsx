import React from "react";
import { Fragment } from "react";

import { useEffect, useState, useCallback, useRef } from "react";

import { Graphics } from "@pixi/react";
import { maxWorldWidthHeight } from "@/constants/example-puzzle";
//sub components
import Circle from "@/components/PixiJS/Circle";
import Karel from "@/components/PixiJS/Karel";
import Beeper from "@/components/PixiJS/Beeper";
import { Graphics as PIXIGraphics } from "pixi.js";

import "@pixi/events";
import {
  GridElement,
  KarelElement,
} from "@/utils/custom/KarelElement/KarelElement";
import { puzzleImagesType } from "@/types/karelWorld";

interface GridProps {
  pxWidth: number;
  pxHeight: number;
  rows: number;
  cols: number;
  internalGrid: GridElement[][][];
  karel: KarelElement;
  images: puzzleImagesType;
}

const Grid: React.FC<GridProps> = ({
  pxWidth,
  pxHeight,
  rows,
  cols,
  internalGrid,
  karel,
  images,
}) => {
  const circleRef = useRef<PIXIGraphics>(null);

  const [mounted, setMounted] = useState(false);
  const smCircleRadius = 3;
  const mdCircleRadius = 4;

  useEffect(() => {
    setMounted(true);
  }, []);

  const currPxWidth =
    rows >= cols ? pxWidth : Math.floor(pxWidth * (rows / cols));

  const currPxHeight =
    rows >= cols ? Math.floor(pxHeight * (cols / rows)) : pxHeight;

  const xPxStep = currPxWidth / rows;
  const yPXStep = currPxHeight / cols;

  const radius =
    rows >= maxWorldWidthHeight / 2 || cols >= maxWorldWidthHeight / 2
      ? smCircleRadius
      : mdCircleRadius;

  const gridDotColor = 0x0000ff;

  const draw = useCallback(
    (g: any) => {
      g.clear();
      g.beginFill(0xebebeb);
      g.drawRect(0, 0, currPxWidth, currPxHeight);
      g.endFill();
    },
    [pxWidth, pxHeight, rows, cols]
  );

  return (
    <>
      <Circle ref={circleRef} x={0} y={0} radius={3} color={0x0000ff} />
      {mounted && (
        <>
          <Graphics draw={draw} />
          {internalGrid.map((col: GridElement[][], colIndex: number) => {
            return (
              <Fragment key={colIndex}>
                {col.map((row, rowIndex) => {
                  return (
                    <Fragment key={`${colIndex}-${rowIndex}`}>
                      {row.map((element: GridElement, elementIndex: number) => {
                        if (element.isKarel()) {
                          return (
                            <Karel
                              key={`${colIndex}-${rowIndex}-${elementIndex}-karel`}
                              x={colIndex * xPxStep + xPxStep / 2}
                              y={rowIndex * yPXStep + yPXStep / 2}
                              width={xPxStep}
                              height={yPXStep}
                              karel={karel}
                              karelImage={images.karel}
                            />
                          );
                        } else if (element.isBeeper()) {
                          return (
                            <Beeper
                              key={`${colIndex}-${rowIndex}-${elementIndex}-beeper`}
                              x={colIndex * xPxStep + xPxStep / 2}
                              y={rowIndex * yPXStep + yPXStep / 2}
                              width={xPxStep * 0.75}
                              height={yPXStep * 0.75}
                              beeper={{
                                img: images.beeper,
                                beeperCount: element.count,
                              }}
                            />
                          );
                        } else {
                          return (
                            <Graphics
                              key={`${colIndex}-${rowIndex}-${elementIndex}-grid-dot`}
                              x={colIndex * xPxStep + xPxStep / 2}
                              y={rowIndex * yPXStep + yPXStep / 2}
                              //   radius={radius}
                              color={gridDotColor}
                              //   eventMode="static"
                              //TODO: Add onclick to edit the grid
                              click={() => {}}
                              //   geometry={circle.current}
                              zIndex={1}
                            />
                          );
                        }
                      })}
                    </Fragment>
                  );
                })}
              </Fragment>
            );
          })}
        </>
      )}
    </>
  );
};

export default Grid;
