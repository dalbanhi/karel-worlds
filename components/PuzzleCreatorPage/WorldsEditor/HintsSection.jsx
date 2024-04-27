import React from 'react';
import { BasePuzzleInfoContext } from '@app/puzzle-creator/page';
import { useEffect, useState, useContext } from 'react';

const HintsSection = () => {

    const [basePuzzleInfo, setBasePuzzleInfo] = useContext(BasePuzzleInfoContext);

    const [seeMore, setSeeMore] = useState(false);

    useEffect(() => {}, [basePuzzleInfo]);
    return (
        <section className='w-3/12'>
            <p className='form_label'>Hints:</p>
            <p className='form_instructions'>Give people attempting to solve your puzzle <strong><em>at least one </em></strong> hint. Make sure you make it meta-cognitive
                {seeMore ?
                    <>  
                        <br/>
                        <span>Check out <a className='see_more' target={`_blank`} href='https://youtu.be/f-4N7OxSMok?feature=shared&t=148'>this 2 minute video</a> to learn more about metacognition (watch until 5:02)! </span>
                        <span className='see_more' onClick={() => setSeeMore(false)}>...(see less)</span>
                    </>
                    : 
                    <span className='see_more' onClick={() => setSeeMore(true)}>(see more)</span>
                }.
            </p>
            <label htmlFor="hint1" className='form_label'>Hint 1 (Required)</label>
            <input 
                className='form_input' 
                type="text" 
                id="hint1" 
                name="hint1" 
                placeholder='Hint 1'
                value={basePuzzleInfo.hints[0]}
                onChange={(e) => setBasePuzzleInfo({
                    ...basePuzzleInfo,
                    hints: [e.target.value, basePuzzleInfo.hints[1], basePuzzleInfo.hints[2]]
                })} 
                required
            />
            <label htmlFor="hint2" className='form_label'>Hint 2</label>
            <input 
                className='form_input' 
                type="text" 
                id="hint2" 
                name="hint2" 
                placeholder='Hint 2'
                value={basePuzzleInfo.hints[1]}
                onChange={(e) => setBasePuzzleInfo({
                    ...basePuzzleInfo,
                    hints: [basePuzzleInfo.hints[0], e.target.value, basePuzzleInfo.hints[2]]
                })} 
            />
            <label htmlFor="hint3" className='form_label'>Hint 3</label>
            <input 
                className='form_input' 
                type="text" 
                id="hint3" 
                name="hint3" 
                placeholder='Hint 3'
                value={basePuzzleInfo.hints[2]}
                onChange={(e) => setBasePuzzleInfo({
                    ...basePuzzleInfo,
                    hints: [basePuzzleInfo.hints[0], basePuzzleInfo.hints[1], e.target.value]
                })} 
            />
        </section>
    )
}

export default HintsSection