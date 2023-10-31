import React from 'react'
import './styles/Currentsurf.css'
import { spotData } from './Spotsdata';

const Currentsurf = ({surfData, tideData, tideHiLo, nameData}) => {

    let currentTime = new Date();
    let currentHour = currentTime.getHours();

    
    const convertTime = (t) => {
        t = t.split(":");
        let h = Number(t[0]);
        let m = Number(t[1]);

        let timeValue;

        if (h > 0 && h <= 12){
            timeValue = h;
        } else if(h > 12) {
            timeValue = (h - 12);
        } else if (h == 0) {
            timeValue = "12";
        }

        timeValue += (m < 10 ) ? ":0" + m : ":" + m;
        timeValue += (h >= 12) ? " PM" : " AM";

        return timeValue;
    }
    
    
  return (
    <>
    <h1 className='spot-header'>{nameData}</h1>
    <div className='surf-info-container'>
        <div className='surf-height'>
            <div className='info-header'>
                <h2>Surf Height</h2>
            </div>
            <p>{surfData.hourly.wave_height[currentHour].toFixed(1)}ft</p>
        </div>
        <div className='swell-info'>
            <div className='info-header'>
                <h2>Swell Info</h2>
            </div>
            <p>{surfData.hourly.swell_wave_height[currentHour].toFixed(1)}ft @ {Math.round(surfData.hourly.swell_wave_period[currentHour])}s from {surfData.hourly.swell_wave_direction[currentHour]}°</p>
        </div>
        <div className='tide-info'>
            <div className='info-header'>
                <h2>Tide</h2>
            </div>
            <div className='current-hi-lo'>
                <div className='daily-current'>
                    <h5>Current</h5>
                    <p><strong>{Number(tideData.predictions[currentHour].v).toFixed(1)}ft</strong></p>
                    <p>as of</p>
                    <p>{convertTime((tideData.predictions[currentHour].t).substr(10))}</p>
                </div>
                <div className='daily-high-tide'>
                    <h5>High</h5>
                    <p><strong>{Number(tideHiLo.predictions[0].v).toFixed(1)}ft</strong></p>
                    <p>{convertTime((tideHiLo.predictions[0].t).substr(10))}</p>

                    <p><strong>{Number(tideHiLo.predictions[2].v).toFixed(1)}ft</strong></p>
                    <p>{convertTime((tideHiLo.predictions[2].t).substr(10))}</p>
                </div>
                <div className='daily-low-tide'>
                    <h5>Low</h5>
                    <p><strong>{Number(tideHiLo.predictions[1].v).toFixed(1)}ft</strong></p>      
                    <p>{convertTime((tideHiLo.predictions[1].t).substr(10))}</p>

                    <p><strong>{Number(tideHiLo.predictions[3].v).toFixed(1)}ft</strong></p>      
                    <p>{convertTime((tideHiLo.predictions[3].t).substr(10))}</p>      
                </div>
            </div>
        </div>
    </div>
    </>
    
  )
}

export default Currentsurf