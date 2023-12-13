import React, { useState } from 'react'
import './styles/Header.css'
import { spotData } from "./Spotsdata";


const Header = ({onClickChange}) => {
  
  const handleClick = (spot) => {

    onClickChange(spot)

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
          {spotData.map((spot, id) => {
            return (
              <button key={id} onClick={(e) => handleClick(spot)}>{spot.name}</button>
            )
          })}
      </nav>
    </div>
    

    </>
  )
}

export default Header