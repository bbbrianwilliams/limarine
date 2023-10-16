import React, { useState } from 'react'
import './styles/Header.css'
import { lbCoords, gilgoCoords, mtkCoords } from "./coordinates";
import { asyncPaginate } from "react-select-async-paginate"


const Header = ({onClickChange}) => {

  

  const handleOnChange = (e) => {
    onClickChange(e.target)

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
        <button className='lb-btn' value={lbCoords} onClick={handleOnChange}>Long Beach</button>
        <button className='gilgo-btn' value={gilgoCoords} onClick={handleOnChange}>Gilgo</button>
        <button className='mtk-btn' value={mtkCoords} onClick={handleOnChange}>Montauk</button>
    </nav>
    </div>
    

    </>
  )
}

export default Header