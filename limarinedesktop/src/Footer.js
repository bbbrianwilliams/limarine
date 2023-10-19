import React from 'react'
import './styles/Footer.css'

const Footer = () => {

    const date = new Date();
    const currentYear = date.getFullYear();

  return (
    <div className='footer-container'>
        <div className='left-section'></div>
        <div className='middle-section'>
          <ul>
            <li>&copy; {currentYear} LI Marine, Inc.</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>
        <div className='right-section'></div>
    </div>
  )
}

export default Footer