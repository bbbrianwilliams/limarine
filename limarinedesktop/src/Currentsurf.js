import React from 'react'
import './styles/Currentsurf.css'

const Currentsurf = ({data}) => {

    let currentTime = new Date();
    let currentHour = currentTime.getHours();

  return (
    <div className='surf-info-container'>
        <div className='surf-height'>
            <div className='info-header'>
                <h2>Surf Height</h2>
            </div>
            <p>{data.hourly.wave_height[currentHour].toFixed(1)}FT</p>
        </div>
        <div className='swell-info'>
            <div className='info-header'>
                <h2>Swell Info</h2>
            </div>
            <p>{data.hourly.swell_wave_height[currentHour].toFixed(1)} ft @ {Math.round(data.hourly.swell_wave_period[currentHour])}s from {data.hourly.swell_wave_direction[currentHour]}°</p>
        </div>
        <div className='tide-info'>
            <div className='info-header'>
                <h2>Tide</h2>
            </div>
            <p>4.9 FT</p>
        </div>
    </div>
  )
}

export default Currentsurf