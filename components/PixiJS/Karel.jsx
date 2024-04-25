import React from 'react';
import {Sprite} from '@pixi/react';

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
                zIndex={2}
                eventMode="static"
                onclick={() => console.log("Karel was clicked")}
            />
    )
}

export default Karel