import React from 'react'
import { useEffect, useState, useCallback, useRef } from 'react';
import {Graphics} from '@pixi/react';
import {forwardRef, useImperativeHandle} from 'react';
//sub components
import Circle from './Circle';
import Karel from './Karel';

import '@pixi/events';

const RunnableGrid = forwardRef(function RunnableGrid(props, ref) {
    const {pxWidth, pxHeight, rows, cols, maxWorldWH} = props;

    const [karel, setKarel] = useState({
        x: 0,
        y: 0,
        direction: "east",
        beeperBag: 0,
        placedBeepers: [],
        img: "/assets/images/karel/karel.png"
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

        moveForward() {
            console.log("Moving forward in the grid!!!!");
            let newKarel = {...karel};
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
        }

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
    )


    return (
        <>
            <Circle x={0} y={0} radius={radius} ref={circle}/>
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