import React from 'react'
import { useEffect, useState, useCallback, useRef } from 'react';
import {Graphics} from '@pixi/react';
import {forwardRef, useImperativeHandle} from 'react';
//sub components
import Circle from './Circle';
import Karel from './Karel';

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
        Array.from({length: rows}, () => Array.from({length: cols}, () => "empty"))
    );

    

    const circle = useRef(null);
    const [mounted, setMounted] = useState(false);
    const smCircleRadius = 1;
    const mdCircleRadius = 2;

    useEffect(() => {
        setMounted(true);
        // propsRef.current = props;
    }, []);

    useEffect(() => {
        console.log("Running useEffect");
        
        //update grid
        let newGrid = Array.from({length: rows}, () => Array.from({length: cols}, () => "empty"));


        //update Karel's location
        newGrid[karel.x >= rows? rows-1: karel.x][karel.y >= cols? cols-1: karel.y] = "karel";
        setInternalGrid(newGrid);
    
    }, [karel.x, karel.y, karel.direction, karel.beeperBag, karel.placedBeepers, rows, cols])

    useImperativeHandle(ref, () => ({

        //not callable by user code
        resetGrid() {
            setKarel({...initialKarel});
            //need to reset the grid by actual values, not just all to empty TODO
            setInternalGrid(
                Array.from({length: rows}, () => Array.from({length: cols}, () => "empty"))
            );
        },

        //callable by user code

        moveForward() {
            console.log("Moving forward in the grid!!!!");
            let newKarel = {...karel};

            //TODO: check if karel CAN move forward, if not, return an error or something
            switch(karel.direction){
                case "north":
                    newKarel.y = karel.y - 1;
                    break;
                case "south":
                    newKarel.y = karel.y + 1;
                    break;
                case "east":
                    newKarel.x = karel.x + 1;
                    break;
                case "west":
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
                    return internalGrid[karel.x][newYN] !== "hWall" && internalGrid[karel.x][newYN] !== "vWall";
                    break;
                case "south":
                    let newYS = karel.y + 1;
                    if(newYS >= cols) return false;
                    return internalGrid[karel.x][newYS] !== "hWall" && internalGrid[karel.x][newYS] !== "vWall";
                case "east":
                    let newXE = karel.x + 1;
                    if(newXE >= rows) return false;
                    return internalGrid[newXE][karel.y] !== "hWall" && internalGrid[newXE][karel.y] !== "vWall";
                case "west":
                    let newXW = karel.x - 1;
                    if(newXW < 0) return false;
                    return internalGrid[newXW][karel.y] !== "hWall" && internalGrid[newXW][karel.y] !== "vWall";
            }
        }, frontIsBlocked(){{ return !this.frontIsClear(); }},





    }));


    const currPxWidth = rows >= cols ? pxWidth : Math.floor(pxWidth * (rows/cols));

    const currPxHeight = rows >= cols ? Math.floor(pxHeight * (cols/rows)) : pxHeight;

    const xPxStep = currPxWidth / rows;
    const yPXStep = currPxHeight / cols;

    const radius = rows >= maxWorldWH/2 || cols >= maxWorldWH/2 ? smCircleRadius : mdCircleRadius;

    const draw = useCallback(
        (g) => {
            g.clear();
            g.beginFill(0xebebeb);
            g.drawRect(0, 0, currPxWidth, currPxHeight);
            g.endFill();   
        },
        [pxWidth, pxHeight, rows, cols],
    );
    return (
        <>
            <Circle x={0} y={0} radius={radius} ref={circle}/>
            {console.log('karel direction', karel.direction)}
            {mounted && (
                <>
                    <Graphics draw={draw} />
                    {internalGrid.map((col, colIndex) => {
                        return (
                            <>
                                {col.map((row, rowIndex) => {

                                    if(row === "karel"){
                                        return (
                                            <Karel
                                                key={`${colIndex}-${rowIndex}`}
                                                x={colIndex * xPxStep + xPxStep / 2}
                                                y={rowIndex * yPXStep + yPXStep / 2}
                                                width={xPxStep}
                                                height={yPXStep}
                                                karel={karel}
                                            />
                                        )
                                    }
                                    else{
                                        return (
                                            <Graphics
                                                key={`${colIndex}-${rowIndex}`}
                                                x={colIndex * xPxStep + xPxStep / 2}
                                                y={rowIndex * yPXStep + yPXStep / 2}
                                                radius={radius}
                                                geometry={circle.current}
                                                eventMode={"static"}
                                                click={() => console.log('circle clicked')}
                                            />
                                        )
                                    }
                                })}
                            </>
                        )
                    })}
                </>
            )}
        </>
    );
});

export default RunnableGrid