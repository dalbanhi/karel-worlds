import React from 'react'
import { useEffect, useState, useRef } from 'react';
import {forwardRef, useImperativeHandle} from 'react';
//sub components
import Grid from './Grid';

import '@pixi/events';


import KarelElement from '@utils/karel-elements/KarelElement';
import { set } from 'mongoose';

// const possibleObjects = {
//     "hWall": 1,
//     "vWall": 2,
//     "beeper": 3,
//     "karel": 4,
//     "empty": 0
// }
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

const RunnableGrid = forwardRef(function RunnableGrid(props, ref) {
    const {pxWidth, pxHeight, rows, cols, maxWorldWH, initialKarel, initialBeeper, initialBeepersList} = props;

    const propsRef = useRef(props);
    const [karel, setKarel] = useState({
        ...initialKarel
    });

    const [beeper, setBeeper] = useState({
        ...initialBeeper
    });

    const [testBeeperList, setTestBeeperList] = useState(
        [...initialBeepersList]
    );

    const initialNewGrid = makeNewGrid(rows, cols);

    const [internalGrid, setInternalGrid] = useState(initialNewGrid);

    useEffect(() => {

        
        //update grid
        let newGrid = makeNewGrid(rows, cols);

        //add beepers to the grid
        testBeeperList.forEach(beeper => {
            let placeToPutBeeper = newGrid[beeper.x][beeper.y];
            if(placeToPutBeeper[0].type === "empty"){
                newGrid[beeper.x][beeper.y] = [beeper];
            }
        });

        //add walls to the grid


        //update Karel's location
        //only unshift if there are beepers. if it's empty, replace the first element
        let karelX = karel.x >= rows? rows-1: karel.x;
        let karelY = karel.y >= cols? cols-1: karel.y;
        if(newGrid[karelX][karelY][0].type === "empty"){
            newGrid[karelX][karelY][0] = new KarelElement("karel", karelX, karelY);
        }
        else{
            newGrid[karelX][karelY].unshift(new KarelElement("karel", karelX, karelY));
        };

        setInternalGrid(newGrid);

        setKarel({...karel});
    
    }, [karel.x, karel.y, karel.direction, karel.beeperBag, rows, cols, testBeeperList, initialBeepersList])

    useImperativeHandle(ref, () => ({

        //not callable by user code
        resetGrid() {
            let newGrid = makeNewGrid(rows, cols);

            //add any initial beepers
            initialBeepersList.forEach(beeper => {
                let placeToPutBeeper = newGrid[beeper.x][beeper.y];
                if(placeToPutBeeper[0].type === "empty"){
                    newGrid[beeper.x][beeper.y] = [beeper];
                }
            });

            //add any walls

            //prepend karel to the grid only if there are beepers, otherwise, replace the first element
            newGrid[initialKarel.x][initialKarel.y].unshift(new KarelElement("karel", initialKarel.x, initialKarel.y));

            setTestBeeperList([...initialBeepersList]);
            setInternalGrid(newGrid);
            setKarel({...initialKarel});
            
        },

        //callable by user code
        //movement actions
        moveForward() {
            let newKarel = {...karel};

            const onEdgeError = new Error("Karel cannot move forward. Karel is at the edge of the grid");
            const wouldHitWallError = new Error("Karel cannot move forward. Karel would hit a wall");
            switch(karel.direction){
                case "north":
                    if(karel.y - 1 < 0) throw onEdgeError;
                    let newKarelCellN = internalGrid[karel.x][karel.y-1];
                    if(newKarelCellN.some(element => element.isWall())){
                        throw wouldHitWallError;
                    }
                    newKarel.y = karel.y - 1;
                    break;
                case "south":
                    if(karel.y + 1 >= cols) throw onEdgeError;
                    let newKarelCellS = internalGrid[karel.x][karel.y+1];
                    if(newKarelCellS.some(element => element.isWall())){
                        throw wouldHitWallError;
                    }
                    newKarel.y = karel.y + 1;
                    break;
                case "east":
                    if(karel.x + 1 >= rows) throw onEdgeError;
                    let newKarelCellE = internalGrid[karel.x+1][karel.y];
                    if(newKarelCellE.some(element => element.isWall())){
                        throw wouldHitWallError;
                    }
                    newKarel.x = karel.x + 1;
                    break;
                case "west":
                    if(karel.x - 1 < 0) throw onEdgeError;
                    let newKarelCellW = internalGrid[karel.x-1][karel.y];
                    if(newKarelCellW.some(element => element.isWall())){
                        throw wouldHitWallError;
                    }
                    newKarel.x = karel.x - 1;
                    break;
            }
            setKarel(newKarel);
        },

        turnLeft() {
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

        //beeper actions
        putBeeper() {
            let newKarel = {...karel};
            //check if karel still has beepers left
            if(newKarel.beeperBag <= 0){
                throw new Error("Karel does not have any beepers left");
            }

            // //check if there is already a beeper in the beeperlist
            let beeperExists = testBeeperList.find(beeper => beeper.x === newKarel.x && beeper.y === newKarel.y);

            if(!beeperExists){
                let newBeeper = new KarelElement("beeper", newKarel.x, newKarel.y);
                setTestBeeperList([...testBeeperList, newBeeper]);
            }
            else{
                //find the index of the beeper in the list
                let index = testBeeperList.findIndex(beeper => beeper.x === newKarel.x && beeper.y === newKarel.y);

                setTestBeeperList((prevBeepers) =>{
                    let newBeepers = [...prevBeepers];
                    let updatedBeeper = new KarelElement("beeper", newKarel.x, newKarel.y, prevBeepers[index].count);
                    updatedBeeper.addOne();
                    newBeepers[index] = updatedBeeper;
                    return newBeepers;
                })
            }
            setKarel(newKarel);
        },

        takeBeeper(){
            let newKarel = {...karel};
            //check if there is a beeper in the beeperlist
            let beeperExists = testBeeperList.find(beeper => beeper.x === newKarel.x && beeper.y === newKarel.y);

            if(!beeperExists){
                throw new Error("Karel cannot take a beeper. There is no beeper at this location");
            }
            else{
                //find the index of the beeper in the list
                let index = testBeeperList.findIndex(beeper => beeper.x === newKarel.x && beeper.y === newKarel.y);

                setTestBeeperList((prevBeepers) =>{
                    let newBeepers = [...prevBeepers];
                    let updatedBeeper = new KarelElement("beeper", newKarel.x, newKarel.y, prevBeepers[index].count);
                    updatedBeeper.subtractOne();
                    if(updatedBeeper.count === 0){
                        newBeepers.splice(index, 1);
                    }
                    else{
                        newBeepers[index] = updatedBeeper;
                    }
                    return newBeepers;
                })
            }
            setKarel(newKarel);
        },

        //direction logic
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


        //block/clear logic
        frontIsClear(){
            switch(karel.direction){
                case "north":
                    let newYN = karel.y - 1;
                    if(newYN < 0) return false;
                    let newCellN = internalGrid[karel.x][newYN];
                    return !newCellN.some(element => element.isWall());
                case "south":
                    let newYS = karel.y + 1;
                    if(newYS >= cols) return false;
                    let newCellS = internalGrid[karel.x][newYS];
                    return !newCellS.some(element => element.isWall());
                case "east":
                    let newXE = karel.x + 1;
                    if(newXE >= rows) return false;
                    let newCellE = internalGrid[newXE][karel.y];
                    return !newCellE.some(element => element.isWall());
                case "west":
                    let newXW = karel.x - 1;
                    if(newXW < 0) return false;
                    let newCellW = internalGrid[newXW][karel.y];
                    return !newCellW.some(element => element.isWall());
            }
        }, frontIsBlocked(){{ return !this.frontIsClear(); }},

        leftIsClear(){
            switch(karel.direction){
                case "north":
                    let newXW = karel.x - 1;
                    if(newXW < 0) return false;
                    let newCellW = internalGrid[newXW][karel.y];
                    return !newCellW.some(element => element.isWall());
                case "south":
                    let newXE = karel.x + 1;
                    if(newXE >= rows) return false;
                    let newCellE = internalGrid[newXE][karel.y];
                    return !newCellE.some(element => element.isWall());
                case "east":
                    let newYN = karel.y - 1;
                    if(newYN < 0) return false;
                    let newCellN = internalGrid[karel.x][newYN];
                    return !newCellN.some(element => element.isWall());
                case "west":
                    let newYS = karel.y + 1;
                    if(newYS >= cols) return false;
                    let newCellS = internalGrid[karel.x][newYS];
                    return !newCellS.some(element => element.isWall());
            }
        }, leftIsBlocked(){{ return !this.leftIsClear(); }},

        rightIsClear(){
            switch(karel.direction){
                case "north":
                    let newXE = karel.x + 1;
                    if(newXE >= rows) return false;
                    let newCellE = internalGrid[newXE][karel.y];
                    return !newCellE.some(element => element.isWall());
                case "south":
                    let newXW = karel.x - 1;
                    if(newXW < 0) return false;
                    let newCellW = internalGrid[newXW][karel.y];
                    return !newCellW.some(element => element.isWall());
                case "east":
                    let newYS = karel.y + 1;
                    if(newYS >= cols) return false;
                    let newCellS = internalGrid[karel.x][newYS];
                    return !newCellS.some(element => element.isWall());
                case "west":
                    let newYN = karel.y - 1;
                    if(newYN < 0) return false;
                    let newCellN = internalGrid[karel.x][newYN];
                    return !newCellN.some(element => element.isWall());
            }
        }, rightIsBlocked(){{ return !this.rightIsClear(); }},

        //beeper logic
        beepersPresent(){
            let newCell = internalGrid[karel.x][karel.y];
            return newCell.some(element => element.isBeeper());
        }, noBeepersPresent(){{ return !this.beepersPresent(); }},


    }));

    return (
        <>
            <Grid
                pxWidth={pxWidth}
                pxHeight={pxHeight}
                rows={rows}
                cols={cols}
                internalGrid={internalGrid}
                karel={karel}
                beeper={beeper}
                maxWorldWH={maxWorldWH}
            />
        </>
        
    );
});

export default RunnableGrid