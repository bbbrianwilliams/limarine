import React, { useState } from 'react'
import './styles/Header.css'
import { spotData } from "./coordinates";




const Header = ({onClickChange}) => {

const [active, setActive] = useState(false)

  const handleClick = (spot) => {

    onClickChange(spot)

    setActive(!active)
    
  }

  return (
    <>
    <div className='header-container'>
        <div className='left-section'></div>
        <div className='middle-section'>
          <h1>LI Marine</h1>
        </div>
        <div className='right-section'></div>
    </div>
  
    <div className='navbar-container'>
    <nav>
        <button className='rkwy-btn' onClick={(e) => handleClick(spotData[0])}>Rockaway</button>
        <button className='lb-btn' onClick={(e) => handleClick(spotData[1])}>Long Beach</button>
        <button className='gilgo-btn' onClick={(e) => handleClick(spotData[2])}>Gilgo</button>
        <button className='mtk-btn' onClick={(e) => handleClick(spotData[3])}>Montauk</button>
    </nav>
    </div>
    

    </>
  )
}

export default Header