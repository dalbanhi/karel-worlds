import React from 'react'

const CustomizableSpriteInfo = ({customKarel, setCustomKarel, setKarelImg, setcustomKarelUploadOption, customKarelUploadOption, onKarelImageFileChange, originalKarelImg}) => {
    return (
        <section className='w-3/12'>
            <label htmlFor="customKarel" className='form_label'>Custom Karel:</label>
            <select 
                className='form_input' 
                id="customKarel" 
                name="customKarel" 
                required
                onChange={(e) => {
                    setCustomKarel(e.target.value === 'custom' ? true : false)
                    if (e.target.value === 'original') {
                        setKarelImg(originalKarelImg);
                    }
                }}
                >
                <option value="original">Original</option>
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
                        defaultValue={"url"}
                        onChange={(e) => setcustomKarelUploadOption(e.target.value)}
                    >
                        <option value="url">URL</option>
                        <option value="file">File</option>
                    </select>
                    {customKarelUploadOption &&
                        <label htmlFor="karelImage" className='form_label'>Upload an image (make sure it's dimensions are square for best results)</label>}
                    {customKarelUploadOption === 'url' &&
                        <input className='form_input' type="text" id="karelImage" name="karelImage" placeholder='Karel Image URL' required
                        onChange={(e) => {
                            console.log(e.target.value);
                            setKarelImg(e.target.value)}}
                        />
                    }
                    {customKarelUploadOption === 'file' &&
                        <input className='form_input' type="file" id="karelImage" name="karelImage" required
                        onChange={(e) => {onKarelImageFileChange(e)}}
                        />
                    }
                </>
                
            }
        </section>
    )
}

export default CustomizableSpriteInfo;