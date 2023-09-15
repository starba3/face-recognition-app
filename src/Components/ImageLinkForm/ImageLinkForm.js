import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({onInputChange, onDetectClick}) => {
    return(
        <div>
            <p className='f3'>
                { 'Enter a link and we will the faces in it!' }
            </p>
            <div className='center'>
                <div className='pa4 br3 shadow-5 form'>
                    <input type="text" onChange={onInputChange}  className='f4 pa2 w-70'/>
                    <button
                     className='f4 grow w-30 ph3 pv2 dib white bg-green'
                     onClick={onDetectClick}
                    >   
                        Detect
                    </button>
                </div>
                
            </div>
        </div>
    )
}

export default ImageLinkForm;