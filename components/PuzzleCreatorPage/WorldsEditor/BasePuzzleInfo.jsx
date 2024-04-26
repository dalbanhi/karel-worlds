'use client'

const BasePuzzleInfo = ({worldDimensions, setWorldDimensions, maxWorldWH, minWorldWH, defaultWorldWH}) => {
    return (
      <section className="w-3/12">
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
            })} 
        />  
      </section>
    )
}

export default BasePuzzleInfo;