'use client'

import {useState } from 'react';

const WorldsEditor = ({handleSubmit, worldDimensions, setWorldDimensions}) => {

    // const [worldWidth, setWorldWidth] = useState(worldDimensions.width);
    // const [worldHeight, setWorldHeight] = useState(worldDimensions.height);
    return (
        <section className='w-full max-w-full flex-start flex-col'>
            <h3 className='form_header green_purple_gradient'>Edit Your Puzzle Here...</h3>
            <p className='form_instructions'>Edit attributes that correspond to both worlds below.</p>
            <p className='form_instructions'>Click on the buttons on top of the world and then click on the world itself to edit its specific attributes.</p>
            <form
                onSubmit={(e) => {handleSubmit(e);}}
                className='flex-start flex-col gap-4'
            >
                <label htmlFor="worldName">Puzzle Name:</label>
                <input className='form_input' type="text" id="worldName" name="worldName" placeholder='Puzzle Name' required/>
                <label htmlFor="worldDescription">Puzzle Description:</label>
                <textarea className='form_input form_textarea' type="text" id="worldDescription" name="worldDescription" placeholder='Enter a description of your puzzle' required />
                <label htmlFor="worldWidth">
                        World Width: <span>{worldDimensions.width}</span>
                </label>
                <input type="range" id="worldWidth" name="worldWidth" 
                    min="1" max="50" 
                    value={worldDimensions.width || 10} 
                    onChange={(e) => setWorldDimensions({
                        width: e.target.value,
                        height: worldDimensions.height
                    })} 
                />
                <label htmlFor="worldHeight">
                    World Height: <span>{worldDimensions.height}</span>
                </label>
                <input type="range" id="worldHeight" name="worldHeight"
                    min="1" max="50" 
                    value={worldDimensions.height || 10} 
                    onChange={(e) => setWorldDimensions({
                        width: worldDimensions.width,
                        height: e.target.value
                    })} />

                <button className='form_button' type="submit">Save Puzzle</button>

            </form>
        </section>
  )
}

export default WorldsEditor