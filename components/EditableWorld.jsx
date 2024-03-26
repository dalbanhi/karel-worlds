// 'use client'
import { NextReactP5Wrapper } from '@p5-wrapper/next';

import Karel from '@utils/p5-utils/Karel';
import Grid from '@utils/p5-utils/Grid';
import { useEffect, useState } from 'react';

const EditableWorld = ({name, canvasSize, interactableName, worldDimensions, karelImg}) => {


    const [karelX, setKarelX] = useState(0);
    const [karelY, setKarelY] = useState(0);
    
    useEffect(() => {   

        if(karelX >= worldDimensions.width){
            setKarelX(worldDimensions.width - 1);
        }
        if(karelY >= worldDimensions.height){
            setKarelY(worldDimensions.height - 1);
        } 
    }, [worldDimensions.width, worldDimensions.height, karelX, karelY])
    

    const sketch = (p5) => {

        let karel;
        let karelP5Img;
        let grid;

        // p5.preload = () => {
        //     // console.log("preload");
        //     karelP5Img = p5.loadImage(karelImg);
        //     // karelP5Img.resize(50, 50);
        // }

        p5.setup = () => {
            p5.createCanvas(canvasSize.width, canvasSize.height);
            p5.rectMode(p5.CENTER);
            // p5.background(200);
            grid = new Grid(p5, canvasSize.width, canvasSize.height, worldDimensions.width, worldDimensions.height, "black");
            grid.display();
            karel = new Karel(p5, karelX, karelY, grid, "interactable", karelP5Img);
            karel.display();
        };
      
        p5.draw = () => {
          
        //   karel.display();
        };
    };
    return (
        <div>{name}, {interactableName}, {worldDimensions.width}, {worldDimensions.height}, {karelImg}
            <label htmlFor="karelX" className='form_label'>
                Karel X Position: <span>{karelX}</span>
            </label>
            <input type="range" id="karelX" name="karelX"
                min="0" max={String(worldDimensions.width-1)} 
                value={karelX} 
                className='form_range'
                onChange={(e) => {setKarelX(e.target.value)}}
             />
             <label htmlFor="karelY" className='form_label'>
                Karel Y Position: <span>{karelY}</span>
            </label>
            <input type="range" id="karelY" name="karelY"
                min="0" max={String(worldDimensions.height-1)} 
                value={karelY} 
                className='form_range'
                onChange={(e) => {setKarelY(e.target.value)}}
             />
            <NextReactP5Wrapper sketch={sketch} />
        </div>
    )
}

export default EditableWorld;