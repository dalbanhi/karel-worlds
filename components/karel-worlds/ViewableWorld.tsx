"use client";
import React from "react";

import { useState, useEffect, useMemo } from "react";
import { Stage, Container } from "@pixi/react";
import { Button } from "@/components/ui/button";
import {
  DoubleArrowDownIcon,
  DoubleArrowUpIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import Grid from "@/components/PixiJS/Grid";

import {
  GridElement,
  KarelElement,
} from "@/utils/custom/KarelElement/KarelElement";
import { puzzleImagesType, worldInfoType } from "@/types/karelWorld";
import { windowSizeType } from "@/types";

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

interface ShowHideArrowProps {
  showGoal: boolean;
  setShowGoal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ShowHideArrow: React.FC<ShowHideArrowProps> = ({
  showGoal,
  setShowGoal,
}) => {
  return (
    <Button type="button" onClick={() => setShowGoal(!showGoal)}>
      {showGoal ? (
        <React.Fragment>
          <DoubleArrowUpIcon aria-label="Hide the Goal World" className="" />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <DoubleArrowDownIcon aria-label="Show the Goal World" className="" />
        </React.Fragment>
      )}
    </Button>
  );
};

interface ViewableWorldProps {
  name: string;
  canvasSize: windowSizeType;
  worldDimensions: { width: number; height: number };
  worldInfo: worldInfoType;
  hints?: string[];
  images: puzzleImagesType;
  showGoalWorld: boolean;
  setShowGoalWorld: React.Dispatch<React.SetStateAction<boolean>>;
}

const ViewableWorld: React.FC<ViewableWorldProps> = ({
  name,
  canvasSize,
  worldDimensions,
  worldInfo,
  hints,
  images,
  showGoalWorld,
  setShowGoalWorld,
}) => {
  const initialKarel = useMemo(
    () =>
      new KarelElement(
        worldInfo.karel.x,
        worldInfo.karel.y,
        worldInfo.karel.direction,
        worldInfo.karel.backpack,
        worldInfo.karel.infiniteBackpack
      ),
    [
      worldInfo.karel.x,
      worldInfo.karel.y,
      worldInfo.karel.direction,
      worldInfo.karel.backpack,
      worldInfo.karel.infiniteBackpack,
    ]
  );
  const initialBeepers = worldInfo.gridElements.filter(
    (element) => element.type === "beeper"
  );
  const [karel, setKarel] = useState<KarelElement>(initialKarel);
  const [beepers, setBeepers] = useState([...initialBeepers]);
  const firstEmptyGrid = makeNewGrid(
    worldDimensions.width,
    worldDimensions.height
  );

  const [internalGrid, setInternalGrid] = useState(firstEmptyGrid);

  useEffect(() => {
    let newGrid = makeNewGrid(worldDimensions.width, worldDimensions.height);

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
    setInternalGrid(newGrid);
  }, [worldDimensions.width, worldDimensions.height, karel, beepers]);

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
    <section className="flex flex-1 flex-col items-center justify-center gap-2 p-2">
      <div className="flex h-full flex-col items-center justify-center gap-2">
        <h2 className="text-sm font-semibold">Goal World</h2>
        <ShowHideArrow
          showGoal={showGoalWorld}
          setShowGoal={setShowGoalWorld}
        />
      </div>
      <div className="flex h-full flex-col justify-end">
        {showGoalWorld && (
          <Stage
            width={currPxWidth}
            height={currPxHeight}
            options={{ background: 0xffffff }}
          >
            <Container x={0} y={0} sortableChildren={true}>
              <Grid
                pxWidth={canvasSize.width}
                pxHeight={canvasSize.height}
                rows={worldDimensions.width}
                cols={worldDimensions.height}
                internalGrid={internalGrid}
                karel={karel}
                images={images}
              />
            </Container>
          </Stage>
        )}
      </div>
    </section>
  );
};

export default ViewableWorld;
