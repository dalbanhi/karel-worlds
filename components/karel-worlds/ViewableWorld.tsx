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
    <Button onClick={() => setShowGoal(!showGoal)}>
      {showGoal ? (
        <React.Fragment>
          <DoubleArrowLeftIcon className="block max-lg:hidden" />
          <DoubleArrowUpIcon className="hidden max-lg:block" />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <DoubleArrowRightIcon className="block max-lg:hidden" />
          <DoubleArrowDownIcon className="hidden max-lg:block" />
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
}

const ViewableWorld: React.FC<ViewableWorldProps> = ({
  name,
  canvasSize,
  worldDimensions,
  worldInfo,
  hints,
  images,
}) => {
  const [showGoal, setShowGoal] = useState(true);
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

  return (
    <section className="flex max-lg:flex-col h-full justify-center items-center p-2 gap-2">
      <div className="flex items-center justify-center">
        <ShowHideArrow showGoal={showGoal} setShowGoal={setShowGoal} />
      </div>
      <div className="flex h-full flex-col justify-end">
        {showGoal && (
          <Stage
            suppressHydrationWarning
            width={canvasSize.width}
            height={canvasSize.height}
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
