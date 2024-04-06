import React from 'react'
import { useEffect, useState, useCallback, useRef } from 'react';
import {Graphics} from '@pixi/react';

//sub components
import Circle from './Circle';
import Karel from './Karel';

import '@pixi/events';

//grid would need to have the same dimensions as world and paint a rectangle just like it did in p5. then karel would be a sprite that moves around the grid. grid would also draw circles in each cell to represent a space. 






const Grid = ({pxWidth, pxHeight, rows, cols, internalGrid, karel, maxWorldWH}) => {
    const circle = useRef(null);
    const [mounted, setMounted] = useState(false);
    const smCircleRadius = 1;
    const mdCircleRadius = 2;

    useEffect(() => {
        setMounted(true);
    }, []);


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
}

export default Grid