// 'use client'
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import { useMemo, useRef } from 'react';
// import Karel from '@utils/p5-utils/Karel';
// import Grid from '@utils/p5-utils/Grid';
import { useEffect, useState, useCallback } from 'react';
import { forwardRef } from 'react';

import {Stage, Container, Sprite, Graphics} from '@pixi/react';
import {Text, TextStyle, BlurFilter} from 'pixi.js';
import '@pixi/events';



const Circle = forwardRef(function Circle(props, ref) {
    const {x, y, radius} = props;

    const draw = useCallback(
        (g) => {
            g.clear();
            g.beginFill(0xff0000);
            g.drawCircle(x, y, radius);
            g.endFill();
        },
        [x, y, radius],
    );

    return <Graphics draw={draw} ref={ref} />  
  });



//grid would need to have the same dimensions as world and paint a rectangle just like it did in p5. then karel would be a sprite that moves around the grid. grid would also draw circles in each cell to represent a space. 

const Karel = ({x, y, width, height, karel}) => {

    const directions = {
        "east": 0,
        "south": 90,
        "west": 180,
        "north": 270
    };

    return (
            <Sprite
                x={x}
                y={y}
                width={width}
                height={height}
                image={karel.img}
                anchor={0.5}
                angle={directions[karel.direction]}
            />
    )
}

function Grid({pxWidth, pxHeight, rows, cols, internalGrid, karel, maxWorldWH}){


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
                                                key={rowIndex}
                                                x={colIndex * xPxStep + xPxStep / 2}
                                                y={rowIndex * yPXStep + yPXStep / 2}
                                                width={xPxStep}
                                                height={yPXStep}
                                                karel={karel}
                                            />

                                        )
                                    }

                                    return (
                                        <Graphics
                                            key={rowIndex}
                                            x={colIndex * xPxStep + xPxStep / 2}
                                            y={rowIndex * yPXStep + yPXStep / 2}
                                            radius={radius}
                                            geometry={circle.current}
                                            eventMode={"static"}
                                            click={() => console.log('circle clicked')}
                                        />
                                    )
                                })}
                            </>
                        )
                    })}
                </>
            )}
        </>
    );
}


const EditableWorld = ({name, canvasSize, interactableName, worldDimensions, karelImg, maxWorldWH}) => {

    const [karel, setKarel] = useState({
        x: 0,
        y: 0,
        direction: "east",
        beeperBag: 0,
        placedBeepers: [],
        img: karelImg
    });


    const [internalGrid, setInternalGrid] = useState(
        Array.from({length: worldDimensions.width}, () => Array.from({length: worldDimensions.height}, () => "empty"))
    );

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    useEffect(() => {   
        if(karel.x >= worldDimensions.width){
            setKarel({...karel, x: worldDimensions.width - 1});
        }
        if(karel.y >= worldDimensions.height){
            setKarel({...karel, y: worldDimensions.height- 1});
        }
        
        let newGrid = Array.from({length: worldDimensions.width}, () => Array.from({length: worldDimensions.height}, () => "empty"));

        newGrid[karel.x >= worldDimensions.width? worldDimensions.width-1: karel.x][karel.y >= worldDimensions.height? worldDimensions.height-1: karel.y] = "karel";
        setInternalGrid(newGrid);
    }, [worldDimensions.width, worldDimensions.height, karel.x, karel.y])
    
    return (
        <div>{name}, {interactableName}, {worldDimensions.width}, {worldDimensions.height}, {karelImg}
        {canvasSize.width}, {canvasSize.height}
        {console.log('internalGrid', internalGrid)}
            <label htmlFor="karelX" className='form_label'>
                Karel X Position: <span>{karel.x}</span>
            </label>
            <input type="range" id="karelX" name="karelX"
                min="0" max={String(worldDimensions.width-1)} 
                value={karel.x} 
                className='form_range'
                onChange={(e) => {setKarel({...karel, x: e.target.value})}}
             />
            <label htmlFor="karelY" className='form_label'>
                Karel Y Position: <span>{karel.y}</span>
            </label>
            <input type="range" id="karelY" name="karelY"
                min="0" max={String(worldDimensions.height-1)} 
                value={karel.y} 
                className='form_range'
                onChange={(e) => {setKarel({...karel, y: e.target.value})}}
                
             />
            <label htmlFor="Karel Direction" className='form_label'>
                Karel is facing: <span>{capitalizeFirstLetter(karel.direction)}</span>
            </label>
            <select name="direction" id="direction" className='form_select' onChange={(e) => {setKarel({...karel, direction: e.target.value})}}>
                <option value="north">North</option>
                <option value="east" selected>East</option>
                <option value="south">South</option>
                <option value="west">West</option>
            </select>
            <Stage 
                width={canvasSize.width} height={canvasSize.height} options={{background: 0xFFFFFF}}>   
                <Container 
                    x={0} y={0} >
                    <Grid 
                        pxWidth={canvasSize.width} 
                        pxHeight={canvasSize.height} 
                        rows={worldDimensions.width} 
                        cols={worldDimensions.height} 
                        internalGrid={internalGrid}
                        karel={karel}
                        maxWorldWH={maxWorldWH}
                    />
                </Container>
            
            </Stage>
        </div>
    )
}

export default EditableWorld;