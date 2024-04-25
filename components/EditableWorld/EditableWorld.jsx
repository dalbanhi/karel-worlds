'use client'
//Dependencies
import { useEffect, useState, useContext} from 'react';
import {Stage, Container} from '@pixi/react';
// import {Text, TextStyle, BlurFilter} from 'pixi.js';


//sub components
import EditingShelf from './EditingShelf';

//PixiJS components
import Grid from '@components/PixiJS/Grid';

import { SpriteImagesContext } from '@app/puzzle-creator/page';

import KarelElement from '@utils/karel-elements/KarelElement';


const EditableWorld = ({name, canvasSize, worldDimensions, karelImg, maxWorldWH}) => {

    const {spriteImages} = useContext(SpriteImagesContext);
    const [karel, setKarel] = useState({
        x: 0,
        y: 0,
        direction: "east",
        beeperBag: 0,
        placedBeepers: [],
        img: spriteImages.defaultKarel
    });

    const [beeper, setBeeper] = useState({
        img: spriteImages.defaultBeeper
    })


    const [internalGrid, setInternalGrid] = useState(
        Array.from({length: worldDimensions.width}, () => Array.from({length: worldDimensions.height}, () => [new KarelElement("empty")]))
    );


    
    useEffect(() => {   
        if(karel.x >= worldDimensions.width){
            setKarel({...karel, x: worldDimensions.width - 1});
        }
        if(karel.y >= worldDimensions.height){
            setKarel({...karel, y: worldDimensions.height- 1});
        }


        
        //update grid
        let newGrid = Array.from({length: worldDimensions.width}, () => Array.from({length: worldDimensions.height}, () => [new KarelElement("empty")]));

        //testing beeper
        newGrid[1][1] = [new KarelElement("beeper")];

        //make sure karel is at the beginning of the array if there are beepers, otherwise replace the first element

        newGrid[karel.x >= worldDimensions.width? worldDimensions.width-1: karel.x][karel.y >= worldDimensions.height? worldDimensions.height-1: karel.y].unshift(new KarelElement("karel"));
        
        

        setInternalGrid(newGrid);

        //update Karel img
        setKarel({...karel, img: spriteImages.karel});

        setBeeper({...beeper, img: spriteImages.beeper});


    }, [worldDimensions.width, worldDimensions.height, karel.x, karel.y, karel.direction, karel.beeperBag, karel.placedBeepers, spriteImages])

    // useEffect(() => {
    //     console.log("Sprite images in here: ", spriteImages.karelImg);
    //     setKarel({...karel, img: spriteImages.karelImg});
    // }, [spriteImages]);
    
    return (
        <section>
            <EditingShelf
                karel={karel}
                setKarel={setKarel}
                worldDimensions={worldDimensions}
            />
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
        </section>
    )
}

export default EditableWorld;