import React from 'react';
import {Sprite, Text} from '@pixi/react';

const Beeper = ({x, y, width, height, beeper}) => {


    return (
        <>
            <Sprite
                x={x}
                y={y}
                width={width}
                height={height}
                image={beeper.img}
                anchor={0.5}
                zIndex={3}
            />
            <Text
                x={x}
                y={y}
                text={beeper.beeperCount}
                style={{fill: 'white', stroke: 'black', strokeThickness: 2}}
                anchor={0.5}
                zIndex={4}
            />
        </>
    )
}

export default Beeper;