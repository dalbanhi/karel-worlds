"use client";
import React from "react";

import { useState, useEffect } from "react";
import { Stage, Container } from "@pixi/react";

import Grid from "@/components/PixiJS/Grid";
// import TestGrid from "@/components/PixiJS/TestGrid";

import {
  GridElement,
  KarelElement,
} from "@/utils/custom/KarelElement/KarelElement";
import { puzzleImagesType, worldInfoType } from "@/types/karelWorld";
import { windowSizeType } from "@/types";
import Circle from "../PixiJS/Circle";

function makeNewGrid(rows: number, cols: number): GridElement[][][] {
  let newGrid: GridElement[][][] = [];
  for (let i = 0; i < rows; i++) {
    let newRow: GridElement[][] = [];
    newGrid.push(newRow);
    for (let j = 0; j < cols; j++) {
      newGrid[i].push([new GridElement("empty", i, j)]); // Push an array with a single empty Karel Element object
    }
  }
  return newGrid;
}

interface ViewableWorldProps {
  name: string;
  canvasSize: windowSizeType;
  worldDimensions: { width: number; height: number };
  worldInfo: worldInfoType;
  hints?: string[];
  images: puzzleImagesType;
}

const ViewableWorld: React.FC<ViewableWorldProps> = ({
  name,
  canvasSize,
  worldDimensions,
  worldInfo,
  hints,
  images,
}) => {
  //   console.log("worldInfo", worldInfo);
  const initialKarel: KarelElement = new KarelElement(
    worldInfo.karel.x,
    worldInfo.karel.y,
    worldInfo.karel.direction,
    worldInfo.karel.backpack,
    worldInfo.karel.infiniteBackpack
  );
  const initialBeepers = worldInfo.gridElements.filter(
    (element) => element.type === "beeper"
  );
  const [karel, setKarel] = useState<KarelElement>(initialKarel);
  const [beepers, setBeepers] = useState([...initialBeepers]);

  //   const showHints = hints.forEach((hint) => {
  //     return false;
  //   });

  const firstEmptyGrid = makeNewGrid(
    worldDimensions.width,
    worldDimensions.height
  );

  const [internalGrid, setInternalGrid] = useState(firstEmptyGrid);

  useEffect(() => {
    let newGrid = makeNewGrid(worldDimensions.width, worldDimensions.height);
    console.log("newGrid", newGrid);
    console.log("karel", karel);
    console.log("beepers", beepers);

    //add beepers to the grid
    beepers.forEach((beeper) => {
      let boundBeeperX =
        beeper.x >= worldDimensions.width
          ? worldDimensions.width - 1
          : beeper.x;
      let boundBeeperY =
        beeper.y >= worldDimensions.height
          ? worldDimensions.height - 1
          : beeper.y;

      newGrid[boundBeeperX][boundBeeperY] = [
        new GridElement("beeper", boundBeeperX, boundBeeperY, beeper.count),
      ];
    });
    console.log("newGrid after beepers", newGrid);

    //   //add karel to the grid
    let boundKarelX =
      karel.x >= worldDimensions.width ? worldDimensions.width - 1 : karel.x;
    let boundKarelY =
      karel.y >= worldDimensions.height ? worldDimensions.height - 1 : karel.y;

    // //only unshift if there is a beeper, otherwise, replace
    if (newGrid[boundKarelX][boundKarelY][0].type === "beeper") {
      newGrid[boundKarelX][boundKarelY].unshift(
        new KarelElement(
          boundKarelX,
          boundKarelY,
          karel.direction,
          karel.backpack,
          karel.infiniteBackpack
        )
      );
    } else {
      newGrid[boundKarelX][boundKarelY] = [
        new KarelElement(
          boundKarelX,
          boundKarelY,
          karel.direction,
          karel.backpack,
          karel.infiniteBackpack
        ),
      ];
    }
    // setInternalGrid(newGrid);
  }, [initialKarel, initialBeepers]);

  return (
    <>
      <div suppressHydrationWarning>
        {name && <h1 className="text-xl font-extrabold">{name}'s Goal</h1>}
        {/* {hints && (
          <>
            <h2 className="text-lg font-bold">Hints</h2>
            <>
              <div className="text-sm flex gap-1">
                {hints.map((hint, index) => {
                  if (hint !== "") {
                    return (
                      <button
                        key={index}
                        className="text-sm hint_button"
                        onClick={() => alert(hint)}
                      >
                        {`Hint ${index + 1}`}
                      </button>
                    );
                  }
                })}
              </div>
            </>
          </>
        )} */}
        <Stage
          width={canvasSize.width}
          height={canvasSize.height}
          options={{ background: 0xffffff }}
        >
          <Container x={0} y={0} sortableChildren={true}>
            {/* <Grid
              pxWidth={canvasSize.width}
              pxHeight={canvasSize.height}
              rows={worldDimensions.width}
              cols={worldDimensions.height}
              internalGrid={internalGrid}
              karel={karel}
              images={images}
            /> */}
            {/* <TestGrid /> */}
            {/* <Circle x={100} y={100} radius={10} color={0x0000ff} /> */}
          </Container>
        </Stage>
      </div>
    </>
  );
};

export default ViewableWorld;
