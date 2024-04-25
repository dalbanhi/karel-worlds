
import React from 'react';
import {useState, useContext} from 'react';
import { SpriteImagesContext } from '@app/puzzle-creator/page';

function toCamelCase(str) {
    const words = str.split(' ');
    const camelCaseWords = words.map((word, index) => {
        if(index === 0){
            return word.toLowerCase();
        }
        return word[0].toUpperCase() + word.slice(1).toLowerCase();
    });
}

const CustomizableSpriteInfo = ({spriteName}) => {

    const [customSprite, setCustomSprite] = useState(false);
    const [customSpriteUploadOption, setCustomSpriteUploadOption] = useState("url");

    const camelCaseSpriteName = toCamelCase(spriteName);

    const {spriteImages, setSpriteImages} = useContext(SpriteImagesContext);

    const onSpriteImageFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            // setKarelImg(e.target.result);
            //add a check for which image to set based on spriteName
            setSpriteImages({
                ...spriteImages,
                [camelCaseSpriteName]: e.target.result
            });
        }
        try{
            reader.readAsDataURL(file);
        }
        catch(err){
            console.log(err);
            alert('Error uploading image. Please try again.');
        }
    }
    
    return (
        <section className='w-2/12'>
            <label htmlFor={`custom${spriteName}`} className='form_label'>{`Custom ${spriteName}:`}</label>
            <select 
                className='form_input' 
                id={`custom${spriteName}`}
                name={`custom${spriteName}`} 
                required
                onChange={(e) => {
                    setCustomSprite(e.target.value === 'custom' ? true : false)
                    if (e.target.value === 'default') {
                        // setKarelImg(originalKarelImg);
                        //add a check for which image to set based on spriteName
                        setSpriteImages((oldSprites) => ({
                            ...oldSprites,
                            [camelCaseSpriteName]: oldSprites.defaultKarel
                        }));
                    }
                }}
                >
                <option value="default">Default</option>
                <option value="custom">Custom</option>
            </select>
            {customSprite &&
                <>
                    <label htmlFor={`custom${spriteName}UploadOption`} className='form_label'>Upload from your computer or by URL:</label>
                    <select
                        className='form_input'
                        id={`custom${spriteName}UploadOption`}
                        name={`custom${spriteName}UploadOption`}
                        required
                        defaultValue={"url"}
                        onChange={(e) => setCustomSpriteUploadOption(e.target.value)}
                    >
                        <option value="url">URL</option>
                        <option value="file">File</option>
                    </select>
                    {customSpriteUploadOption &&
                        <label htmlFor={`${spriteName}Image`} className='form_label'>Upload an image (make sure it's dimensions are square for best results)</label>}
                    {customSpriteUploadOption === 'url' &&
                        <input 
                            className='form_input' 
                            type="text" 
                            id={`${spriteName}Image`} 
                            name={`${spriteName}Image`} 
                            placeholder={`New ${spriteName} Image URL`} 
                            required
                            onChange={(e) => {
                                console.log(e.target.value);
                                // setKarelImg(e.target.value);
                                //add a check for which image to set based on spriteName
                                setSpriteImages({
                                    ...spriteImages,
                                    [camelCaseSpriteName]: e.target.value
                                });
                            }}
                        />
                    }
                    {customSpriteUploadOption === 'file' &&
                        <input 
                            className='form_input' 
                            type="file" 
                            id={`${spriteName}Image`} 
                            name={`${spriteName}Image`} 
                            required
                            onChange={(e) => {
                                onSpriteImageFileChange(e);
                            }}
                        />
                    }
                </>
                
            }
        </section>
    )
}

export default CustomizableSpriteInfo;