import React from 'react'
import './styles/Footer.css'

const Footer = () => {

    const date = new Date();
    const currentYear = date.getFullYear();

  return (
    <div className='footer-container'>
        <div className='left-section'>&copy; {currentYear} </div>
        <div className='middle-section'>Middle</div>
        <div className='right-section'>Right</div>
    </div>
  )
}

export default Footer