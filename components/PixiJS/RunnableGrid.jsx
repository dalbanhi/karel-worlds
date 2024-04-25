import React from 'react'
import { useEffect, useState, useRef } from 'react';
import {forwardRef, useImperativeHandle} from 'react';
//sub components
import Grid from './Grid';

import '@pixi/events';

// const possibleObjects = {
//     "hWall": 1,
//     "vWall": 2,
//     "beeper": 3,
//     "karel": 4,
//     "empty": 0
// }


const RunnableGrid = forwardRef(function RunnableGrid(props, ref) {
    const {pxWidth, pxHeight, rows, cols, maxWorldWH, initialKarel} = props;

    const propsRef = useRef(props);

    const [karel, setKarel] = useState({
        ...initialKarel
    });

    const [internalGrid, setInternalGrid] = useState(
        Array.from({length: rows}, () => Array.from({length: cols}, () => ["empty"]))
    );

    useEffect(() => {
        console.log("Running useEffect");
        
        //update grid
        let newGrid = Array.from({length: rows}, () => Array.from({length: cols}, () => ["empty"]));

        //add beepers to the grid

        //add walls to the grid


        //update Karel's location
        console.log("Karel's location: ", karel.x, karel.y, karel.direction, karel.beeperBag, karel.placedBeepers);
        newGrid[karel.x >= rows? rows-1: karel.x][karel.y >= cols? cols-1: karel.y].unshift("karel");
        setInternalGrid(newGrid);
    
    }, [karel.x, karel.y, karel.direction, karel.beeperBag, karel.placedBeepers, rows, cols])

    useImperativeHandle(ref, () => ({

        //not callable by user code
        resetGrid() {
            let newGrid = Array.from({length: rows}, () => Array.from({length: cols}, () => ["empty"]));

            //add any beepers

            //add any walls

            //prepend karel to the grid
            newGrid[initialKarel.x][initialKarel.y].unshift("karel");

            setKarel({...initialKarel});
            setInternalGrid(newGrid);
        },

        //callable by user code

        moveForward() {
            console.log("Moving forward in the grid!!!!");
            let newKarel = {...karel};

            //TODO: check if karel CAN move forward, if not, return an error or something
            const onEdgeError = new Error("Karel cannot move forward. Karel is at the edge of the grid");
            const wouldHitWallError = new Error("Karel cannot move forward. Karel would hit a wall");
            switch(karel.direction){
                case "north":
                    if(karel.y - 1 < 0) throw onEdgeError;
                    let newKarelCellN = internalGrid[karel.x][karel.y-1];
                    if(newKarelCellN.some(element => element.includes("Wall"))){
                        console.log("Karel would hit a wall");
                        throw wouldHitWallError;
                    }
                    newKarel.y = karel.y - 1;
                    break;
                case "south":
                    if(karel.y + 1 >= cols) throw onEdgeError;
                    let newKarelCellS = internalGrid[karel.x][karel.y+1];
                    if(newKarelCellS.some(element => element.includes("Wall"))){
                        console.log("Karel would hit a wall");
                        throw wouldHitWallError;
                    }
                    newKarel.y = karel.y + 1;
                    break;
                case "east":
                    if(karel.x + 1 >= rows) throw onEdgeError;
                    let newKarelCellE = internalGrid[karel.x+1][karel.y];
                    if(newKarelCellE.some(element => element.includes("Wall"))){
                        console.log("Karel would hit a wall");
                        throw wouldHitWallError;
                    }
                    newKarel.x = karel.x + 1;
                    break;
                case "west":
                    if(karel.x - 1 < 0) throw onEdgeError;
                    let newKarelCellW = internalGrid[karel.x-1][karel.y];
                    if(newKarelCellW.some(element => element.includes("Wall"))){
                        console.log("Karel would hit a wall");
                        throw wouldHitWallError;
                    }
                    newKarel.x = karel.x - 1;
                    break;
            }
            setKarel(newKarel);
        },

        turnLeft() {
            console.log("Turning left in the grid!!!!");
            let newKarel = {...karel};
            switch(karel.direction){
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
        },

        isFacingEast(){
            return karel.direction === "east";
        },
        isNotFacingEast(){{ return !this.isFacingEast(); }},
        isFacingNorth(){
            return karel.direction === "north";
        }, isNotFacingNorth(){{ return !this.isFacingNorth(); }},
        isFacingSouth(){
            return karel.direction === "south";
        }, isNotFacingSouth(){{ return !this.isFacingSouth(); }},
        isFacingWest(){
            return karel.direction === "west";
        }, isNotFacingWest(){{ return !this.isFacingWest(); }},

        frontIsClear(){
            switch(karel.direction){
                case "north":
                    let newYN = karel.y - 1;
                    if(newYN < 0) return false;
                    let newCellN = internalGrid[karel.x][newYN];
                    return !newCellN.some(element => element.includes("Wall"));
                case "south":
                    let newYS = karel.y + 1;
                    if(newYS >= cols) return false;
                    let newCellS = internalGrid[karel.x][newYS];
                    return !newCellS.some(element => element.includes("Wall"));
                case "east":
                    let newXE = karel.x + 1;
                    if(newXE >= rows) return false;
                    let newCellE = internalGrid[newXE][karel.y];
                    return !newCellE.some(element => element.includes("Wall"));
                case "west":
                    let newXW = karel.x - 1;
                    if(newXW < 0) return false;
                    let newCellW = internalGrid[newXW][karel.y];
                    return !newCellW.some(element => element.includes("Wall"));
            }
        }, frontIsBlocked(){{ return !this.frontIsClear(); }},
    }));

    return (
        <Grid
            pxWidth={pxWidth}
            pxHeight={pxHeight}
            rows={rows}
            cols={cols}
            internalGrid={internalGrid}
            karel={karel}
            maxWorldWH={maxWorldWH}
        />
    );
});

export default RunnableGrid