"use client";
import React, { useMemo } from "react";
import { useEffect, useState, useRef, useContext } from "react";
import { forwardRef, useImperativeHandle } from "react";
//sub components
import Grid from "./Grid";

import "@pixi/events";

import {
  GridElement,
  KarelElement,
} from "@/utils/custom/KarelElement/KarelElement";
import { puzzleImagesType, worldInfoType } from "@/types/karelWorld";

//why is this context not working?
// import { RunningWorldStateContext } from '@app/puzzle/[id]/page';

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

interface RunnableGridProps {
  pxWidth: number;
  pxHeight: number;
  worldDimensions: { width: number; height: number };
  images: puzzleImagesType;
  worldInfo: worldInfoType;
  // maxWorldWH: number;
  // initialKarel: KarelElement;
  // initialBeeper: KarelElement;
  // initialBeepersList: KarelElement[];
  // setKarelRunning: Function;
  // setRunningWorldBeeperList: Function;
}

interface RunnableGridHandle {
  resetGrid: () => void;
  moveForward: () => void;
  turnLeft: () => void;
  putBeeper: () => void;
  takeBeeper: () => void;
  isFacingEast: () => boolean;
  isNotFacingEast: () => boolean;
  isFacingNorth: () => boolean;
  isNotFacingNorth: () => boolean;
  isFacingSouth: () => boolean;
  isNotFacingSouth: () => boolean;
  isFacingWest: () => boolean;
  isNotFacingWest: () => boolean;
  frontIsClear: () => boolean;
  frontIsBlocked: () => boolean;
  leftIsClear: () => boolean;
  leftIsBlocked: () => boolean;
  rightIsClear: () => boolean;
  rightIsBlocked: () => boolean;
  beepersPresent: () => boolean;
  noBeepersPresent: () => boolean;
}

const RunnableGrid = forwardRef<RunnableGridHandle, RunnableGridProps>(
  function RunnableGrid(props, ref) {
    const {
      pxWidth,
      pxHeight,
      worldDimensions,
      images,
      worldInfo,
      // setKarelRunning,
      // setRunningWorldBeeperList,
    } = props;

    const rows = worldDimensions.width;
    const cols = worldDimensions.height;

    const propsRef = useRef(props);
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
        karel.y >= worldDimensions.height
          ? worldDimensions.height - 1
          : karel.y;

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
      console.log("newGrid after karel", newGrid);
      setInternalGrid(newGrid);
    }, [worldDimensions.width, worldDimensions.height, karel, beepers]);

    useImperativeHandle(ref, () => ({
      //not callable by user code
      resetGrid() {
        let newGrid = makeNewGrid(
          worldDimensions.width,
          worldDimensions.height
        );

        //add any initial beepers
        initialBeepers.forEach((beeper) => {
          let placeToPutBeeper = newGrid[beeper.x][beeper.y];
          if (placeToPutBeeper[0].type === "empty") {
            newGrid[beeper.x][beeper.y] = [
              new GridElement("beeper", beeper.x, beeper.y, beeper.count),
            ];
          }
        });

        //add any walls

        //prepend karel to the grid only if there are beepers, otherwise, replace the first element
        newGrid[initialKarel.x][initialKarel.y].unshift(
          new KarelElement(
            initialKarel.x,
            initialKarel.y,
            initialKarel.direction,
            initialKarel.backpack,
            initialKarel.infiniteBackpack
          )
        );

        // setCurrentBeeperList([...initialBeepersList]);
        // setRunningWorldBeeperList([...initialBeepersList]);
        setInternalGrid(newGrid);
        setKarel(initialKarel);
        //update grandpa state
        // setKarelRunning({ ...initialKarel });
      },

      //callable by user code
      //movement actions
      moveForward() {
        let newKarel = new KarelElement(
          karel.x,
          karel.y,
          karel.direction,
          karel.backpack,
          karel.infiniteBackpack
        );

        const onEdgeError = new Error(
          "Karel cannot move forward. Karel is at the edge of the grid."
        );
        const wouldHitWallError = new Error(
          "Karel cannot move forward. Karel would hit a wall"
        );
        switch (karel.direction) {
          case "north":
            if (karel.y - 1 < 0) throw onEdgeError;
            let newKarelCellN = internalGrid[karel.x][karel.y - 1];
            if (newKarelCellN.some((element) => element.isWall())) {
              throw wouldHitWallError;
            }
            newKarel.y = karel.y - 1;
            break;
          case "south":
            if (karel.y + 1 >= cols) throw onEdgeError;
            let newKarelCellS = internalGrid[karel.x][karel.y + 1];
            if (newKarelCellS.some((element) => element.isWall())) {
              throw wouldHitWallError;
            }
            newKarel.y = karel.y + 1;
            break;
          case "east":
            if (karel.x + 1 >= rows) throw onEdgeError;
            let newKarelCellE = internalGrid[karel.x + 1][karel.y];
            if (newKarelCellE.some((element) => element.isWall())) {
              throw wouldHitWallError;
            }
            newKarel.x = karel.x + 1;
            break;
          case "west":
            if (karel.x - 1 < 0) throw onEdgeError;
            let newKarelCellW = internalGrid[karel.x - 1][karel.y];
            if (newKarelCellW.some((element) => element.isWall())) {
              throw wouldHitWallError;
            }
            newKarel.x = karel.x - 1;
            break;
        }
        setKarel(newKarel);
        // setKarelRunning(newKarel);
      },

      turnLeft() {
        let newKarel = new KarelElement(
          karel.x,
          karel.y,
          karel.direction,
          karel.backpack,
          karel.infiniteBackpack
        );
        switch (karel.direction) {
          case "north":
            newKarel.direction = "west";
            break;
          case "south":
            newKarel.direction = "east";
            break;
          case "east":
            newKarel.direction = "north";
            break;
          case "west":
            newKarel.direction = "south";
            break;
        }
        setKarel(newKarel);
        // setKarelRunning(newKarel);
      },

      //beeper actions
      putBeeper() {
        // let newKarel = new KarelElement(
        //   karel.x,
        //   karel.y,
        //   karel.direction,
        //   karel.backpack,
        //   karel.infiniteBackpack
        // );
        //check if karel still has beepers left
        if (karel.backpack < 0) {
          throw new Error("Karel does not have any beepers left");
        }

        // //check if there is already a beeper in the beeper list
        let beeperExists = beepers.find(
          (beeper) => beeper.x === karel.x && beeper.y === karel.y
        );

        if (!beeperExists) {
          let newBeeper = new GridElement("beeper", karel.x, karel.y);
          setBeepers([...beepers, newBeeper]);
          // setRunningWorldBeeperList([...currentBeeperList, newBeeper]);
        } else {
          //find the index of the beeper in the list
          let index = beepers.findIndex(
            (beeper) => beeper.x === karel.x && beeper.y === karel.y
          );

          setBeepers((prevBeepers) => {
            let newBeepers = [...prevBeepers];
            let updatedBeeper = new GridElement(
              "beeper",
              karel.x,
              karel.y,
              prevBeepers[index].count
            );
            updatedBeeper.addOne();
            newBeepers[index] = updatedBeeper;
            return newBeepers;
          });
          //setting grandfather state
          // setRunningWorldBeeperList((prevBeepers) => {
          //   let newBeepers = [...prevBeepers];
          //   let updatedBeeper = new KarelElement(
          //     "beeper",
          //     newKarel.x,
          //     newKarel.y,
          //     prevBeepers[index].count
          //   );
          //   updatedBeeper.addOne();
          //   newBeepers[index] = updatedBeeper;
          //   return newBeepers;
          // });
        }
      },

      takeBeeper() {
        //check if there is a beeper in the beeperlist
        let beeperExists = beepers.find(
          (beeper) => beeper.x === karel.x && beeper.y === karel.y
        );

        if (!beeperExists) {
          throw new Error(
            "Karel cannot take a beeper. There is no beeper at this location"
          );
        } else {
          //find the index of the beeper in the list
          let index = beepers.findIndex(
            (beeper) => beeper.x === karel.x && beeper.y === karel.y
          );

          setBeepers((prevBeepers) => {
            let newBeepers = [...prevBeepers];
            let updatedBeeper = new GridElement(
              "beeper",
              karel.x,
              karel.y,
              prevBeepers[index].count
            );
            updatedBeeper.subtractOne();
            if (updatedBeeper.count === 0) {
              newBeepers.splice(index, 1);
            } else {
              newBeepers[index] = updatedBeeper;
            }
            return newBeepers;
          });
          //setting grandfather state
          // setRunningWorldBeeperList((prevBeepers) => {
          //   let newBeepers = [...prevBeepers];
          //   let updatedBeeper = new KarelElement(
          //     "beeper",
          //     newKarel.x,
          //     newKarel.y,
          //     prevBeepers[index].count
          //   );
          //   updatedBeeper.subtractOne();
          //   if (updatedBeeper.count === 0) {
          //     newBeepers.splice(index, 1);
          //   } else {
          //     newBeepers[index] = updatedBeeper;
          //   }
          //   return newBeepers;
          // });
        }
      },

      //direction logic
      isFacingEast() {
        return karel.direction === "east";
      },
      isNotFacingEast() {
        return karel.direction !== "east";
      },
      isFacingNorth() {
        return karel.direction === "north";
      },
      isNotFacingNorth() {
        return karel.direction !== "north";
      },
      isFacingSouth() {
        return karel.direction === "south";
      },
      isNotFacingSouth() {
        return karel.direction !== "south";
      },
      isFacingWest() {
        return karel.direction === "west";
      },
      isNotFacingWest() {
        return karel.direction !== "west";
      },

      //block/clear logic
      frontIsClear() {
        switch (karel.direction) {
          case "north":
            let newYN = karel.y - 1;
            if (newYN < 0) return false;
            let newCellN = internalGrid[karel.x][newYN];
            return !newCellN.some((element) => element.isWall());
          case "south":
            let newYS = karel.y + 1;
            if (newYS >= cols) return false;
            let newCellS = internalGrid[karel.x][newYS];
            return !newCellS.some((element) => element.isWall());
          case "east":
            let newXE = karel.x + 1;
            if (newXE >= rows) return false;
            let newCellE = internalGrid[newXE][karel.y];
            return !newCellE.some((element) => element.isWall());
          case "west":
            let newXW = karel.x - 1;
            if (newXW < 0) return false;
            let newCellW = internalGrid[newXW][karel.y];
            return !newCellW.some((element) => element.isWall());
          default:
            return false;
        }
      },
      frontIsBlocked() {
        return false; //temporary -- please remove
        // {
        //   return !this.frontIsClear();
        // }
      },

      leftIsClear() {
        switch (karel.direction) {
          case "north":
            let newXW = karel.x - 1;
            if (newXW < 0) return false;
            let newCellW = internalGrid[newXW][karel.y];
            return !newCellW.some((element) => element.isWall());
          case "south":
            let newXE = karel.x + 1;
            if (newXE >= rows) return false;
            let newCellE = internalGrid[newXE][karel.y];
            return !newCellE.some((element) => element.isWall());
          case "east":
            let newYN = karel.y - 1;
            if (newYN < 0) return false;
            let newCellN = internalGrid[karel.x][newYN];
            return !newCellN.some((element) => element.isWall());
          case "west":
            let newYS = karel.y + 1;
            if (newYS >= cols) return false;
            let newCellS = internalGrid[karel.x][newYS];
            return !newCellS.some((element) => element.isWall());
          default:
            return false;
        }
      },
      leftIsBlocked() {
        return false; //temporary -- please remove
        // {
        //   return !this.leftIsClear();
        // }
      },

      rightIsClear() {
        switch (karel.direction) {
          case "north":
            let newXE = karel.x + 1;
            if (newXE >= rows) return false;
            let newCellE = internalGrid[newXE][karel.y];
            return !newCellE.some((element) => element.isWall());
          case "south":
            let newXW = karel.x - 1;
            if (newXW < 0) return false;
            let newCellW = internalGrid[newXW][karel.y];
            return !newCellW.some((element) => element.isWall());
          case "east":
            let newYS = karel.y + 1;
            if (newYS >= cols) return false;
            let newCellS = internalGrid[karel.x][newYS];
            return !newCellS.some((element) => element.isWall());
          case "west":
            let newYN = karel.y - 1;
            if (newYN < 0) return false;
            let newCellN = internalGrid[karel.x][newYN];
            return !newCellN.some((element) => element.isWall());
          default:
            return false;
        }
      },
      rightIsBlocked() {
        return false; //temporary -- please remove
        // {
        //   return !this.rightIsClear();
        // }
      },

      //beeper logic
      beepersPresent() {
        let newCell = internalGrid[karel.x][karel.y];
        return newCell.some((element) => element.isBeeper());
      },
      noBeepersPresent() {
        return false; //temporary -- please remove
        // {
        //   return !this.beepersPresent();
        // }
      },
    }));

    return (
      <>
        <Grid
          pxWidth={pxWidth}
          pxHeight={pxHeight}
          rows={worldDimensions.width}
          cols={worldDimensions.height}
          internalGrid={internalGrid}
          karel={karel}
          images={images}
        />
      </>
    );
  }
);

export default RunnableGrid;
