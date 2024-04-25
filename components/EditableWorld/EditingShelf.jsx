'use client'

const EditingShelf = ({karel, setKarel, worldDimensions}) => {

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <>
            <label htmlFor="karelX" className='form_label'>
                Karel X Position: <span>{karel.x}</span>
            </label>
            <input type="range" id="karelX" name="karelX"
                min="0" max={String(worldDimensions.width-1)} 
                value={karel.x} 
                className='form_range'
                onChange={(e) => {setKarel({...karel, x: e.target.value})}}
             />
            <label htmlFor="karelY" className='form_label'>
                Karel Y Position: <span>{karel.y}</span>
            </label>
            <input type="range" id="karelY" name="karelY"
                min="0" max={String(worldDimensions.height-1)} 
                value={karel.y} 
                className='form_range'
                onChange={(e) => {setKarel({...karel, y: e.target.value})}}
                
             />
            <label htmlFor="Karel Direction" className='form_label'>
                Karel is facing: <span>{capitalizeFirstLetter(karel.direction)}</span>
            </label>
            <select 
                name="direction" id="direction" className='form_input_short' 
                defaultValue={karel.direction}
                onChange={(e) => {setKarel({...karel, direction: e.target.value})}}
            >
                <option value="north">North</option>
                <option value="east">East</option>
                <option value="south">South</option>
                <option value="west">West</option>
            </select>        
        </>
    )
}

export default EditingShelf