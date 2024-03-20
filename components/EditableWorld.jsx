// 'use client'
import { NextReactP5Wrapper } from '@p5-wrapper/next';

import Interactable from '@utils/p5-utils/Interactable';
import Grid from '@utils/p5-utils/Grid';

const EditableWorld = ({name, canvasSize, interactableName, worldDimensions}) => {

    const sketch = (p5) => {

        // let interactable;
        let grid;

        p5.setup = () => {
            p5.createCanvas(canvasSize.width, canvasSize.height);
            p5.rectMode(p5.CENTER);
            p5.background(200);
            grid = new Grid(p5, canvasSize.width, canvasSize.height, worldDimensions.width, worldDimensions.height, "black");
            grid.display();
            // interactable = new Interactable(p5, 100, 100, 50, 50, "interactable");
        };
      
        p5.draw = () => {
          
        //   interactable.display();
        };
    };
    return (
        <div>{name}, {interactableName}, {worldDimensions.width}, {worldDimensions.height}
            <NextReactP5Wrapper sketch={sketch} />
        </div>
    )
}

export default EditableWorld;