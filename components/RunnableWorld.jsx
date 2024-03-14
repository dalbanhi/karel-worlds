'use client'
import { Sketch } from '@p5-wrapper/react';
import { useState } from 'react';
import { NextReactP5Wrapper } from '@p5-wrapper/next';

import Interactable from '@utils/p5-utils/Interactable';
import Grid from '@utils/p5-utils/Grid';

const RunnableWorld = ({name, canvasSize, interactableName, worldDimensions, rawCode}) => {

    const [runDrawLoop, setRunDrawLoop] = useState(false);

    const sketch = (p5) => {

        let interactable;
        let grid;

        function moveForward(){
            interactable.x += 5;
        }

        p5.setup = () => {
            p5.createCanvas(canvasSize.width, canvasSize.height);
            p5.rectMode(p5.CENTER);
            p5.background(200);
            grid = new Grid(p5, canvasSize.width, canvasSize.height, worldDimensions.width, worldDimensions.height, "black");
            grid.display();
            interactable = new Interactable(p5, 100, 100, 50, 50, "interactable");
        };
      
        p5.draw = () => {
            if(runDrawLoop){
                interactable.display();
                // moveForward();
                try {
                    eval(rawCode);
                } catch (error) {
                    console.error(error);
                    
                }
            }
        };
    };
    return (
        <section>
            <p>{name}, {interactableName}, {worldDimensions.width}, {worldDimensions.height}</p>
            <button
                onClick={() => {setRunDrawLoop(true)}}
                className='form_button'
            >
                Run
            </button>
            <button
                className='form_button'
                onClick={() => {setRunDrawLoop(false)}}
            >   
                Reset
            </button>
            <NextReactP5Wrapper sketch={sketch} />
        </section>
    )
}

export default RunnableWorld;