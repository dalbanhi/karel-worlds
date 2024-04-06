'use client'

import {useState } from 'react';

const WorldsEditor = ({handleSubmit, worldDimensions, setWorldDimensions, setKarelImg, maxWorldWH}) => {

    const minWorldWH = 1;
    const defaultWorldWH = 10;

    const [customKarel, setCustomKarel] = useState(false);

    const [customKarelUploadOption, setcustomKarelUploadOption] = useState(null);

    // const [worldWidth, setWorldWidth] = useState(worldDimensions.width);
    // const [worldHeight, setWorldHeight] = useState(worldDimensions.height);
    return (
        <section className='w-full max-w-full flex-start flex-col'>
            <h3 className='form_header green_purple_gradient'>Edit Your Puzzle Here...</h3>
            <p className='form_instructions'>Edit attributes that correspond to both worlds below.</p>
            <p className='form_instructions'>Edit the start/end worlds individually with the buttons and widgets on top of each world.</p>
            <form
                onSubmit={(e) => {handleSubmit(e)}}
                className='flex-start flex-col gap-4'
            >
                <label htmlFor="worldName" className='form_label'>Puzzle Name</label>
                <input className='form_input' type="text" id="worldName" name="worldName" placeholder='Puzzle Name' required/>
                <label htmlFor="worldDescription" className='form_label'>Puzzle Description</label>
                <textarea className='form_input form_textarea' type="text" id="worldDescription" name="worldDescription" placeholder='Enter a description of your puzzle' required />
                <label htmlFor="worldWidth" className='form_label'>
                        World Width: <span>{worldDimensions.width}</span>
                </label>
                <input type="range" id="worldWidth" name="worldWidth" 
                    min={`${minWorldWH}`} max={`${maxWorldWH}`} 
                    value={worldDimensions.width || defaultWorldWH}
                    className='form_range' 
                    onChange={(e) => {setWorldDimensions({
                            width: Number(e.target.value),
                            height: Number(worldDimensions.height)
                        })}
                    } 
                />
                <label htmlFor="worldHeight" className='form_label'>
                    World Height: <span>{worldDimensions.height}</span>
                </label>
                <input type="range" id="worldHeight" name="worldHeight"
                    min={`${minWorldWH}`} max={`${maxWorldWH}`} 
                    value={worldDimensions.height || defaultWorldWH} 
                    className='form_range'
                    onChange={(e) => 
                        setWorldDimensions({
                            width: Number(worldDimensions.width),
                            height: Number(e.target.value)
                    })} />

                <label htmlFor="customKarel" className='form_label'>Custom Karel:</label>
                <select 
                    className='form_input' 
                    id="customKarel" 
                    name="customKarel" 
                    required
                    onChange={(e) => setCustomKarel(e.target.value === 'custom' ? true : false)}
                    >
                    <option value="">Original</option>
                    <option value="custom">Custom</option>
                </select>
                {customKarel &&
                    <>
                        <label htmlFor="customKarelUploadOption" className='form_label'>Upload from your computer or by URL:</label>
                        <select
                            className='form_input'
                            id="customKarelUploadOption"
                            name="customKarelUploadOption"
                            required
                            onChange={(e) => setcustomKarelUploadOption(e.target.value)}
                        >
                            <option value="url">URL</option>
                            <option value="file">File</option>
                        </select>
                        {customKarelUploadOption &&
                            <label htmlFor="karelImage" className='form_label'>Upload an image (make sure it's dimensions are square for best results)</label>}
                        {customKarelUploadOption === 'url' &&
                            <input className='form_input' type="text" id="karelImage" name="karelImage" placeholder='Karel Image URL' required/>
                        }
                        {customKarelUploadOption === 'file' &&
                            <input className='form_input' type="file" id="karelImage" name="karelImage" required/>
                        }
                        {/* <label htmlFor="customKarel" className='form_label'>Upload an Image for your Karel:</label> */}
                        {/* <input className='form_input' type="text" id="karelImage" name="karelImage" placeholder='Karel Image URL' required/> */}
                    </>
                    
                }
                <button className='form_button' type="submit">Save Puzzle</button>

            </form>
        </section>
  )
}

export default WorldsEditor;