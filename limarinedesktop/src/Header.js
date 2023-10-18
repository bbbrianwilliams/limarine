import React, { useState } from 'react'
import './styles/Header.css'
import { spotData } from "./coordinates";



const Header = ({onClickChange}) => {

  const handleClick = (spot) => {

    onClickChange(spot)

  
  }

  return (
    <>
    <div className='header-container'>
        <div className='left-section'>
            <h1>LI Marine</h1>
        </div>
        <div className='middle-section'></div>
        <div className='right-section'>Right</div>
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