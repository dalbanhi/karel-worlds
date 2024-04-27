'use client'
import { useState, useContext } from 'react';

import { BasePuzzleInfoContext } from '@app/puzzle-creator/page';

const EditingShelf = ({karel, setKarel, handleEditElement, worldInfo, onWorldInfoChange}) => {
    const [basePuzzleInfo, setBasePuzzleInfo] = useContext(BasePuzzleInfoContext);
    const worldDimensions = basePuzzleInfo.worldDimensions;

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function toRegularSpace(string){
        string = capitalizeFirstLetter(string);
        return string.replace(/([A-Z])/g, ' $1').trim();
    }

    const [editingMode, setEditingMode] = useState('');

    const [elementEditing, setElementEditing] = useState('beeper');

    const [elementEditingCoords, setElementEditingCoords] = 
    useState({row: 0, column: 0});

    return (
        <>
            <label htmlFor="karelX" className='form_label'>
                Karel X Position: <span>{karel.x}</span>
            </label>
            <input type="range" id="karelX" name="karelX"
                min="0" max={String(worldDimensions.width-1)} 
                value={karel.x} 
                className='form_range'
                onChange={(e) => {
                    setKarel({...karel, x: Number(e.target.value)});
                    onWorldInfoChange({
                        ...worldInfo,
                        karel: {
                            ...karel,
                            x: Number(e.target.value)
                        }
                    });
                }}
             />
            <label htmlFor="karelY" className='form_label'>
                Karel Y Position: <span>{karel.y}</span>
            </label>
            <input type="range" id="karelY" name="karelY"
                min="0" max={String(worldDimensions.height-1)} 
                value={karel.y} 
                className='form_range'
                onChange={(e) => {
                    setKarel({...karel, y: Number(e.target.value)});
                    onWorldInfoChange({
                        ...worldInfo,
                        karel: {
                            ...karel,
                            y: Number(e.target.value)
                        }
                    });
                }}
                
             />
             <div className="flex flex-col">
                <label htmlFor="direction" className='form_label'>
                    Karel is facing: <span>{capitalizeFirstLetter(karel.direction)}</span>
                </label>
                <select 
                    name="direction" id="direction" className='form_input_short' 
                    defaultValue={karel.direction}
                    onChange={(e) => {
                        setKarel({...karel, direction: e.target.value});
                        onWorldInfoChange({
                            ...worldInfo,
                            karel: {
                                ...karel,
                                direction: e.target.value
                            }
                        });
                    }}
                >
                    <option value="north">North</option>
                    <option value="east">East</option>
                    <option value="south">South</option>
                    <option value="west">West</option>
                </select> 

            </div>
            
            <div className="flex justify-start gap-2 mb-2">
                <div className="flex flex-col">
                    <label htmlFor="editingMode" className='form_label'>
                        Editing Mode:
                    </label>  
                    <select
                        name="editingMode"
                        id="editingMode"
                        className='form_input'
                        value={editingMode}
                        onChange={(e) => setEditingMode(e.target.value)}
                    >
                        <option value="">--</option>
                        <option value="add">Add</option>
                        <option value="remove">Remove</option>
                    </select>   
                </div>
                {editingMode !== '' &&(
                    <>
                        <div className="flex flex-col">
                            <label htmlFor={`${editingMode}Elements`} className='form_label'>
                                {capitalizeFirstLetter(editingMode)}:
                            </label>
                            <select
                                name={`${editingMode}Elements`}
                                id={`${editingMode}Elements`}
                                className='form_input'
                                value={elementEditing}
                                onChange={(e) => setElementEditing(e.target.value)}
                            >
                                {/* <option value="">--</option> */}
                                <option value="beeper">Beepers</option>
                                {/* <option value="wallPiece">Wall Piece</option>
                                <option value="wallCorner">Wall Corner</option> */}
                            </select>   
                        </div>
                        {[{name: 'row', max: worldDimensions.height-1}, {name: 'column', max: worldDimensions.width-1}]
                            .map(({name, max}) => {
                                return (
                                    <div className='flex flex-col' key={name}>
                                        <label htmlFor={name} className='form_label'>
                                            {capitalizeFirstLetter(name)}:
                                        </label>
                                        <input 
                                            type="number"
                                            id={name}
                                            name={name}
                                            className='form_input'
                                            placeholder={0}
                                            min="0"
                                            max={String(max)}
                                            value={elementEditingCoords[name]}
                                            onChange={(e) => setElementEditingCoords(
                                                {...elementEditingCoords, 
                                                [name]: Number(e.target.value)
                                            })}
                                        />
                                    </div>
                                )
                            })
                        }
                        <button 
                            className="edit_world_button" 
                            onClick={() => {

                                if(elementEditingCoords.row >= worldDimensions.height || elementEditingCoords.column >= worldDimensions.width){
                                    alert('Invalid coordinates');
                                    return;
                                }
                            
                                handleEditElement(editingMode, elementEditing, '', elementEditingCoords);
                            }}
                        >
                            {capitalizeFirstLetter(editingMode)} {toRegularSpace(elementEditing)}
                        </button>
                    </>
                    
                )}

            </div>
               
        </>
    )
}

export default EditingShelf