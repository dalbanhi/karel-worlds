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
                eventMode="static"
                onclick={() => {}}
            />
            <Text
                x={x}
                y={y}
                text={beeper.beeperCount}
                style={{fill: 'white', stroke: 'black', strokeThickness: 3, fontSize: height / 2, align: 'center'}}
                anchor={0.5}
                zIndex={4}
                eventMode="static"
                //TODO: Add onclick to edit the beeper count
                onclick={() => {}}
            />
        </>
    )
}

export default Beeper;