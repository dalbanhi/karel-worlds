'use client'
//Dependencies
import { useEffect, useState, useContext} from 'react';
import {Stage, Container} from '@pixi/react';
//sub components
import EditingShelf from './EditingShelf';

//PixiJS components
import Grid from '@components/PixiJS/Grid';

//context
import { SpriteImagesContext } from '@app/puzzle-creator/page';

//utils
import KarelElement from '@utils/karel-elements/KarelElement';
import { BasePuzzleInfoContext } from '@app/puzzle-creator/page';

/**
 * A helper function that creates a new empty grid for the world
 * @param {Number} rows - number of rows in the world
 * @param {Number} cols - number of columns in the world
 * @returns 
 */
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

const EditableWorld = ({name, canvasSize, worldInfo, onWorldInfoChange, maxWorldWH}) => {

    const [basePuzzleInfo, setBasePuzzleInfo] = useContext(BasePuzzleInfoContext);

    const worldDimensions = basePuzzleInfo.worldDimensions;
    const [spriteImages, setSpriteImages] = useContext(SpriteImagesContext);

    const [karel, setKarel] = useState({
        x: 0,
        y: 0,
        direction: "east",
        beeperBag: 0,
        img: spriteImages.defaultKarel
    });

    const [beeper, setBeeper] = useState({
        img: spriteImages.defaultBeeper
    })

    const [beepers, setBeepers] = useState([]);

    function handleEditBeeper(editingMode, row, column){
        let beeperExists = beepers.find(beeper => beeper.x === row && beeper.y === column);
            if(editingMode === "add"){

                if(!beeperExists){
                    let newBeeper = new KarelElement("beeper", row, column);
                    setBeepers([...beepers, newBeeper]);
                }
                else{
                    //find the index of the beeper
                    let beeperIndex = beepers.findIndex(beeper => beeper.x === row && beeper.y === column);

                    setBeepers( (prevBeepers) => {
                        let newBeepers = [...prevBeepers];
                        let updatedBeeper = new KarelElement("beeper", row, column, prevBeepers[beeperIndex].count);
                        updatedBeeper.addOne();
                        newBeepers[beeperIndex] = updatedBeeper;
                        return newBeepers;
                    } );

                }
            } else if(editingMode === "remove"){

                //if the beeper exists, subtract one, if it's zero, completely remove it
                if(beeperExists){
                    //find the index of the beeper
                    let beeperIndex = beepers.findIndex(beeper => beeper.x === row && beeper.y === column);

                    setBeepers( (prevBeepers) => {
                        let newBeepers = [...prevBeepers];
                        let updatedBeeper = new KarelElement("beeper", row, column, prevBeepers[beeperIndex].count);
                        updatedBeeper.subtractOne();
                        if(updatedBeeper.count === 0){
                            newBeepers.splice(beeperIndex, 1);
                        }else{
                            newBeepers[beeperIndex] = updatedBeeper;
                        }
                        return newBeepers;
                    });
                }
                else{
                    alert("No beeper to remove");
                }
            }

    }

    /**
     * 
     * @param {String} editingMode - "add" or "remove"
     * @param {String} elementName - "beeper" or "wall"
     * @param {String} elementSubType - "horizontal" or "vertical" or various "corner" types
     * @param {Object} elemCoords - {row: Number, column: Number} - the coordinates of the element
     */
    function handleEditElement(editingMode, elementName, elementSubType, elemCoords){
        let {row, column} = elemCoords;
        if(elementName === "beeper"){
            handleEditBeeper(editingMode, column, row);
        }
        //TODO: handle adding walls
    }

    let initialGrid = makeNewGrid(worldDimensions.width, worldDimensions.height);

    const [internalGrid, setInternalGrid] = useState(initialGrid
    );

    /** TODO: Double check if this needs to be 2D Arrays and can't just be a 1D array 
     * Helper function for use effect to know if two arrays are equal
     * @param {Array} arr1 - 2D array of KarelElements
     * @param {Array} arr2 - 2D array of KarelElements
     * @returns 
     */
    const arraysAreEqual = (arr1, arr2) => {
        if(arr1.length !== arr2.length) return false;
        for(let i = 0; i < arr1.length; i++){
            if(arr1[i].length !== arr2[i].length) return false;
            for(let j = 0; j < arr1[i].length; j++){
                if(arr1[i][j].length !== arr2[i][j].length) return false;
                for(let k = 0; k < arr1[i][j].length; k++){
                    if(arr1[i][j][k].type !== arr2[i][j][k].type) return false;
                }
            }
        }
        return true;
    }


    //use Effect for karel image and beeper image
    useEffect(() => {

        setKarel({
            ...karel,
            img: spriteImages.karel
        });
        //also update the world info
        onWorldInfoChange({
            ...worldInfo,
            karel: {
                ...karel,
                img: spriteImages.karel
            }
        });

        setBeeper({
            ...beeper,
            img: spriteImages.beeper
        });
        //also update the world info
        // onWorldInfoChange({
        //     ...worldInfo,
        //     beeper: {
        //         ...beeper,
        //         img: spriteImages.beeper
        //     }
        // });

    }, [karel.img, beeper.img, spriteImages.karel, spriteImages.defaultKarel, spriteImages.defaultBeeper, spriteImages.beeper]);

    
    useEffect(() => {   
        if(karel.x >= worldDimensions.width){
            setKarel({...karel, x: worldDimensions.width - 1});
            onWorldInfoChange({
                ...worldInfo,
                karel: {
                    ...karel,
                    x: worldDimensions.width - 1
                }
            });
        }
        if(karel.y >= worldDimensions.height){
            setKarel({...karel, y: worldDimensions.height- 1});
            onWorldInfoChange({
                ...worldInfo,
                karel: {
                    ...karel,
                    y: worldDimensions.height - 1
                }
            });
        }
        //make a new empty grid
        let newGrid = makeNewGrid(worldDimensions.width, worldDimensions.height);

        //remove beepers that are out of bounds
        let newBeepers = beepers.filter(beeper => beeper.x < worldDimensions.width && beeper.y < worldDimensions.height);


        // //add beepers to the grid
        newBeepers.forEach(beeper => {
            // if new placement is empty, add beeper
            let placeToPutBeeper = newGrid[beeper.x][beeper.y];
            if(placeToPutBeeper[0].type === "empty"){
                newGrid[beeper.x][beeper.y] = [beeper];
            }
        });
        

        let boundKarelX = karel.x >= worldDimensions.width? worldDimensions.width-1: karel.x;
        let boundKarelY = karel.y >= worldDimensions.height? worldDimensions.height-1: karel.y;

        //only unshift if there is a beeper, otherwise, replace
        if(newGrid[boundKarelX][boundKarelY][0].type === "beeper"){
            newGrid[boundKarelX][boundKarelY].unshift(new KarelElement("karel", boundKarelX, boundKarelY));
        } else{
            newGrid[boundKarelX][boundKarelY] = [new KarelElement("karel", boundKarelX, boundKarelY)];
        }
        
        //set the new grid
        setInternalGrid(newGrid);
        onWorldInfoChange({
            karel: karel,
            beepers: newBeepers
        });

        //update beepers only if it changed
        if(!arraysAreEqual(beepers, newBeepers)){
            setBeepers(newBeepers);
            onWorldInfoChange({
                ...worldInfo,
                beepers: newBeepers
            });
        }

    }, [worldDimensions, karel.x, karel.y, karel.direction, karel.beeperBag, spriteImages, beepers])
    
    return (
        <section>
            <h5 className='world_title'>{name}</h5>
            <EditingShelf
                karel={karel}
                setKarel={setKarel}
                handleEditElement={handleEditElement}
                worldInfo={worldInfo}
                onWorldInfoChange={onWorldInfoChange}
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