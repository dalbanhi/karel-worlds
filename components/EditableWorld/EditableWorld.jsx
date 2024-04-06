'use client'
//Dependencies
import { useEffect, useState} from 'react';
import {Stage, Container} from '@pixi/react';
// import {Text, TextStyle, BlurFilter} from 'pixi.js';


//sub components
import EditingShelf from './EditingShelf';

//PixiJS components
import Grid from '@components/PixiJS/Grid';


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


    
    useEffect(() => {   
        if(karel.x >= worldDimensions.width){
            setKarel({...karel, x: worldDimensions.width - 1});
        }
        if(karel.y >= worldDimensions.height){
            setKarel({...karel, y: worldDimensions.height- 1});
        }
        
        //update grid
        let newGrid = Array.from({length: worldDimensions.width}, () => Array.from({length: worldDimensions.height}, () => "empty"));

        newGrid[karel.x >= worldDimensions.width? worldDimensions.width-1: karel.x][karel.y >= worldDimensions.height? worldDimensions.height-1: karel.y] = "karel";
        setInternalGrid(newGrid);

        //update Karel img
        setKarel({...karel, img: karelImg});


    }, [worldDimensions.width, worldDimensions.height, karel.x, karel.y, karel.direction, karel.beeperBag, karel.placedBeepers, karelImg])
    
    return (
        <div>
            {/* {name}, {interactableName}, {worldDimensions.width}, {worldDimensions.height}, karelImg */}
        {/* {canvasSize.width}, {canvasSize.height} */}
        {/* {console.log('internalGrid', internalGrid)} */}
            <EditingShelf
                karel={karel}
                setKarel={setKarel}
                worldDimensions={worldDimensions}
            />
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