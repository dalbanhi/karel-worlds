import React from 'react'
import { Fragment } from 'react';

import { useEffect, useState, useCallback, useRef } from 'react';

import {Graphics} from '@pixi/react';

//sub components
import Circle from './Circle';
import Karel from './Karel';
import Beeper from './Beeper';

import '@pixi/events';


const Grid = ({pxWidth, pxHeight, rows, cols, internalGrid, karel, beeper, maxWorldWH}) => {
    const circle = useRef(null);
    const [mounted, setMounted] = useState(false);
    const smCircleRadius = 3;
    const mdCircleRadius = 4;


    useEffect(() => {
        setMounted(true);
    }, []);


    const currPxWidth = rows >= cols ? pxWidth : Math.floor(pxWidth * (rows/cols));

    const currPxHeight = rows >= cols ? Math.floor(pxHeight * (cols/rows)) : pxHeight;

    const xPxStep = currPxWidth / rows;
    const yPXStep = currPxHeight / cols;

    const radius = rows >= maxWorldWH/2 || cols >= maxWorldWH/2 ? smCircleRadius : mdCircleRadius;

    const gridDotColor = 0x0000FF;

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
            <Circle x={0} y={0} radius={radius} 
            color={gridDotColor} ref={circle}/>
            {mounted && (
                <>
                    <Graphics draw={draw} />
                    {internalGrid.map((col, colIndex) => {
                        return (
                            <Fragment key={colIndex}>
                                {col.map((row, rowIndex) => {
                                    return (
                                        <Fragment key={`${colIndex}-${rowIndex}`}>
                                        {row.map((element, elementIndex) => {
                                            if(element.isKarel()){
                                                return (
                                                    <Karel
                                                        key={`${colIndex}-${rowIndex}-${elementIndex}-karel`}
                                                        x={colIndex * xPxStep + xPxStep / 2}
                                                        y={rowIndex * yPXStep + yPXStep / 2}
                                                        width={xPxStep}
                                                        height={yPXStep}
                                                        karel={karel}
                                                    />
                                                )
                                            }
                                            else if(element.isBeeper()){
                                                return (
                                                    <Beeper
                                                        key={`${colIndex}-${rowIndex}-${elementIndex}-beeper`}
                                                        x={colIndex * xPxStep + xPxStep / 2}
                                                        y={rowIndex * yPXStep + yPXStep / 2}
                                                        width={xPxStep}
                                                        height={yPXStep}
                                                        beeper={{
                                                            img: beeper.img, 
                                                            beeperCount: element.count
                                                        }}
                                                    />
                                                )
                                            }
                                            else{
                                                return (
                                                    <Graphics
                                                        key={`${colIndex}-${rowIndex}-${elementIndex}-grid-dot`}
                                                        x={colIndex * xPxStep + xPxStep / 2}
                                                        y={rowIndex * yPXStep + yPXStep / 2}
                                                        radius={radius}
                                                        color={gridDotColor}
                                                        eventMode="static"
                                                        click={() => console.log("circle clicked")}
                                                        geometry={circle.current}
                                                        zIndex={1}
                                                    />
                                                )
                                            }
                                        })}
                                    </Fragment>
                                )})}
                            </Fragment>
                        )
                    })}
                </>
            )}
        </>
    );
}

export default Grid