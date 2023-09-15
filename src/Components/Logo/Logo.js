import React from 'react';
import Tilt from 'react-parallax-tilt';
import brain from './brain.png'
import './Logo.css';


const Logo = () => {
    return(
        <div className='ma4 mt0'>
            <Tilt className='shadow-2' style={{ height: '150px', width: '150px', backgroundColor: 'smokewhite' }}>
                <div className='pa3'>
                    <img 
                        alt='logo' 
                        src={brain}
                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    />
                </div>
            </Tilt>
        </div>
    )
}

export default Logo;