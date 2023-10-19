import React from 'react'
import './styles/Currentsurf.css'

const Currentsurf = ({data, tideData, tideHiLo}) => {

    let currentTime = new Date();
    let currentHour = currentTime.getHours();

    

   

  return (
    <div className='surf-info-container'>
        <div className='surf-height'>
            <div className='info-header'>
                <h2>Surf Height</h2>
            </div>
            {<p>{data.hourly.wave_height[currentHour].toFixed(1)}FT</p>}
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
            <div className='current-hi-lo'>
                <div className='daily-current'>
                    <h5>Current</h5>
                    {<p>{tideData.predictions[currentHour].v} FT</p>}
                    {<p>{tideData.predictions[currentHour].t}</p>}
                </div>
                <div className='daily-high-tide'>
                    <h5>High</h5>
                    <p>{tideHiLo.predictions[0].v} FT</p>
                    <p>{tideHiLo.predictions[0].t}</p>

                    <p>{tideHiLo.predictions[2].v} FT</p>
                    <p>{tideHiLo.predictions[2].t}</p>
                </div>
                <div className='daily-low-tide'>
                    <h5>Low</h5>
                    <p>{tideHiLo.predictions[1].v} FT</p>      
                    <p>{tideHiLo.predictions[1].t}</p>

                    <p>{tideHiLo.predictions[3].v} FT</p>      
                    <p>{tideHiLo.predictions[3].t}</p>      
                </div>
            </div>
        </div>
    </div>
  )
}

export default Currentsurf