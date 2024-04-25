import React from 'react'
import { Fragment } from 'react';

import { useEffect, useState, useCallback, useRef } from 'react';

import {Graphics} from '@pixi/react';

//sub components
import Circle from './Circle';
import Karel from './Karel';
import Beeper from './Beeper';

import '@pixi/events';


const Grid = ({pxWidth, pxHeight, rows, cols, internalGrid, setInternalGrid, karel, setKarel, maxWorldWH}) => {
    const circle = useRef(null);
    const [mounted, setMounted] = useState(false);
    const smCircleRadius = 1;
    const mdCircleRadius = 2;

    const TestingBeeper = {
        beeperCount: 3,
        img: "/assets/images/karel/karel-beeper.png"
    }

    useEffect(() => {
        setMounted(true);
    }, []);


    const currPxWidth = rows >= cols ? pxWidth : Math.floor(pxWidth * (rows/cols));

    const currPxHeight = rows >= cols ? Math.floor(pxHeight * (cols/rows)) : pxHeight;

    const xPxStep = currPxWidth / rows;
    const yPXStep = currPxHeight / cols;

    const radius = rows >= maxWorldWH/2 || cols >= maxWorldWH/2 ? smCircleRadius : mdCircleRadius;

    const gridDotColor = 0xff0000;

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
            <Circle x={0} y={0} radius={radius} color={gridDotColor} ref={circle}/>
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
                                            if(element === "karel"){
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
                                            else if(element.includes("beeper")){
                                                return (
                                                    <Beeper
                                                        key={`${colIndex}-${rowIndex}-${elementIndex}-beeper`}
                                                        x={colIndex * xPxStep + xPxStep / 2}
                                                        y={rowIndex * yPXStep + yPXStep / 2}
                                                        width={xPxStep}
                                                        height={yPXStep}
                                                        beeper={TestingBeeper}
                                                    />
                                                )
                                            }
                                            else{
                                                return (
                                                    <Graphics
                                                        key={`${colIndex}-${rowIndex}-${elementIndex}-grid-dot`}
                                                        x={colIndex * xPxStep + xPxStep / 2}
                                                        y={rowIndex * yPXStep + yPXStep / 2}
                                                        draw={(g) => {
                                                            g.beginFill(gridDotColor);
                                                            g.drawCircle(0, 0, 2);
                                                            g.endFill();
                                                        }}
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