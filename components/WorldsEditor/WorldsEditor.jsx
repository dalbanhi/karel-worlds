'use client'

import {useState } from 'react';
import BasePuzzleInfo from './BasePuzzleInfo';
import CustomizableSpriteInfo from './CustomizableSpriteInfo';
// import { SpriteImagesContext } from '@app/puzzle-creator/page';

const WorldsEditor = ({handleSubmit, worldDimensions, setWorldDimensions, maxWorldWH}) => {

    const minWorldWH = 1;
    const defaultWorldWH = 10;




    return (
        <section className='w-full max-w-full flex-start flex-col'>
            <h3 className='form_header green_purple_gradient'>Edit Your Puzzle Here...</h3>
            <p className='form_instructions'>Edit attributes that correspond to both worlds below.</p>
            <p className='form_instructions'>Edit the start/end worlds individually with the buttons and widgets on top of each world.</p>
            <form
                onSubmit={(e) => {handleSubmit(e)}}
                className='flex flex-start flex-wrap my-1 justify-evenly gap-1 w-full max-w-full p-3 border-2 border-blue-400 rounded-md bg-blue-100'
            >
                <BasePuzzleInfo
                    worldDimensions={worldDimensions}
                    setWorldDimensions={setWorldDimensions}
                    maxWorldWH={maxWorldWH}
                    minWorldWH={minWorldWH}
                    defaultWorldWH={defaultWorldWH}
                />
                <CustomizableSpriteInfo
                    spriteName='Karel'
                />
                <CustomizableSpriteInfo
                    spriteName='Beeper'
                />
                <CustomizableSpriteInfo
                    spriteName='Wall Piece'
                />
                <CustomizableSpriteInfo
                    spriteName='Wall Corner'
                />


                
                <button className='form_button' type="submit">Save Puzzle</button>

            </form>
        </section>
  )
}

export default WorldsEditor;