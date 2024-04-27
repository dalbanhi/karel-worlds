'use client'
import { BasePuzzleInfoContext } from '@app/puzzle-creator/page';
import { useEffect, useState, useContext } from 'react';

const BasePuzzleInfo = ({maxWorldWH, minWorldWH, defaultWorldWH}) => {

    const [basePuzzleInfo, setBasePuzzleInfo] = useContext(BasePuzzleInfoContext);

    useEffect(() => {}, [basePuzzleInfo]);

    return (
      <section className="w-3/12">
        <label htmlFor="worldName" className='form_label'>Puzzle Name</label>
        <input 
            className='form_input' 
            type="text" 
            id="worldName" 
            name="worldName" 
            placeholder='Puzzle Name'
            value={basePuzzleInfo.name}
            onChange={(e) => setBasePuzzleInfo({
                ...basePuzzleInfo,
                name: e.target.value
            })} 
            required
        />
        <label htmlFor="worldDescription" className='form_label'>Puzzle Description</label>
        <textarea 
            className='form_input form_textarea' 
            type="text" 
            id="worldDescription" 
            name="worldDescription" 
            placeholder='Enter a description of your puzzle'
            value={basePuzzleInfo.description}
            onChange={(e) => setBasePuzzleInfo({
                ...basePuzzleInfo,
                description: e.target.value
            })} 
            required 
        />
        <label htmlFor="worldWidth" className='form_label'>
                World Width: <span>{basePuzzleInfo.worldDimensions.width}</span>
        </label>
        <input type="range" id="worldWidth" name="worldWidth" 
            min={`${minWorldWH}`} max={`${maxWorldWH}`} 
            value={basePuzzleInfo.worldDimensions.width || defaultWorldWH}
            className='form_range' 
            onChange={(e) => {setBasePuzzleInfo({
                    ...basePuzzleInfo,
                    worldDimensions:{
                        ...basePuzzleInfo.worldDimensions,
                        width: Number(e.target.value)
                    }
                })}
            } 
        />
        <label htmlFor="worldHeight" className='form_label'>
            World Height: <span>{basePuzzleInfo.worldDimensions.height}</span>
        </label>
        <input type="range" id="worldHeight" name="worldHeight"
            min={`${minWorldWH}`} max={`${maxWorldWH}`} 
            value={basePuzzleInfo.worldDimensions.height || defaultWorldWH} 
            className='form_range'
            onChange={(e) => 
                setBasePuzzleInfo({
                    ...basePuzzleInfo,
                    worldDimensions:{
                        ...basePuzzleInfo.worldDimensions,
                        height: Number(e.target.value)
                    }
            })} 
        />  
      </section>
    )
}

export default BasePuzzleInfo;