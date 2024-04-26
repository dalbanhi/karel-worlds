'use client'
import React from 'react';

import {useState, useEffect} from 'react';
import {Stage, Container} from '@pixi/react';

import Grid from '@components/PixiJS/Grid';

import KarelElement from '@utils/karel-elements/KarelElement';


function makeNewGrid(rows, cols){
    let newGrid = [];
    for(let i = 0; i < rows; i++){
        newGrid.push([]);
        for(let j = 0; j < cols; j++){
            newGrid[i].push([new KarelElement("empty", i, j)]);
        }
    }
    return newGrid;
}

const ViewableWorld = ({initialKarel, initialBeeper, initialBeepersList, canvasSize, hints, name, worldDimensions, maxWorldWH}) => {

    const [karel, setKarel] = useState({...initialKarel});
    const [beeper, setBeeper] = useState({...initialBeeper});
    const [beepers, setBeepers] = useState([...initialBeepersList]);

    const firstEmptyGrid = makeNewGrid(worldDimensions.width, worldDimensions.height);

    const [internalGrid, setInternalGrid] = useState(firstEmptyGrid);

    useEffect(() => {
        let newGrid = makeNewGrid(worldDimensions.width, worldDimensions.height);


        //add beepers to the grid
        beepers.forEach(beeper => {
            let placeToPutBeeper = newGrid[beeper.x][beeper.y];
            if(placeToPutBeeper[0].type === "empty"){
                newGrid[beeper.x][beeper.y] = [beeper];
            }
        });

        //add karel to the grid
        let boundKarelX = karel.x >= worldDimensions.width? worldDimensions.width-1: karel.x;
        let boundKarelY = karel.y >= worldDimensions.height? worldDimensions.height-1: karel.y;

        //only unshift if there is a beeper, otherwise, replace
        if(newGrid[boundKarelX][boundKarelY][0].type === "beeper"){
            newGrid[boundKarelX][boundKarelY].unshift(new KarelElement("karel", boundKarelX, boundKarelY));
        } else{
            newGrid[boundKarelX][boundKarelY] = [new KarelElement("karel", boundKarelX, boundKarelY)];
        }
        setInternalGrid(newGrid);

    }, [initialKarel, initialBeeper, initialBeepersList]);

  return (
    <>
        <div>
            {name && <h1 className='text-xl font-extrabold'>{name}'s Goal</h1>}
            {hints && <h2 className='text-lg font-bold'>Hints: {hints}</h2>}
            <Stage 
                width={canvasSize.width} height={canvasSize.height} options={{background: 0xFFFFFF}}
                >
                <Container 
                    x={0} y={0} 
                    sortableChildren={true}
                    eventMode='static'
                    >
                    <Grid 
                        pxWidth={canvasSize.width} 
                        pxHeight={canvasSize.height} 
                        rows={worldDimensions.width} 
                        cols={worldDimensions.height} 
                        internalGrid={internalGrid}
                        karel={karel}
                        beeper={beeper}
                        maxWorldWH={maxWorldWH}
                    />
                </Container>
            </Stage>
        </div>
    </>
  )
}

export default ViewableWorld