import React, { useState } from 'react'
import './styles/Currentsurf.css'



const Currentsurf = (props) => {
    
    let currentTime = new Date();
    let currentHour = currentTime.getHours();



//Destructure properties that will be used in forecast
    const {
        hourly: 
        {
            wave_height: waveHeight,
            swell_wave_period: swellPeriod,
            swell_wave_height: swellHeight,
            swell_wave_direction: swellDirection,
        },
    } = props.surfData;

//Define objects that will contain tide data

    let highTideData = {
        time: '',
        value: '',
    };

    let lowTideData = {
        time: '',
        value: '',  
     };

      let currentTideData = {
        time: '',
        value: '',
     }; 

  


// Convert time to easy-to-read format

    const convertTime = (t) => {
        t = t.split(":");
        let h = Number(t[0]);
        let m = Number(t[1]);

        let timeValue;

        if (h > 0 && h <= 12){
            timeValue = h;
        } else if(h > 12) {
            timeValue = (h - 12);
        } else if (h === 0) {
            timeValue = "12";
        }

        timeValue += (m < 10 ) ? ":0" + m : ":" + m;
        timeValue += (h >= 12) ? " PM" : " AM";

        return timeValue;
    }

    
//Get current/high/low tide value and time

    function getCurrentTide() {
        
        currentTideData.value = Number(props.tideData.predictions[currentHour].v).toFixed(1);    
        currentTideData.time = (props.tideData.predictions[currentHour].t).substr(10);

       return currentTideData;

    }



    function getHighTide(i) {
        const highTide = props.tideHiLo.predictions[i].type === 'H';
        
        if (highTide) {
            highTideData.value = Number(props.tideHiLo.predictions[i].v).toFixed(1);
            highTideData.time = (props.tideHiLo.predictions[i].t).substr(10);
        }

        else {
            i++;
            highTideData.value = Number(props.tideHiLo.predictions[i].v).toFixed(1);
            highTideData.time = (props.tideHiLo.predictions[i].t).substr(10);
        }   

        return highTideData;  
    }

    function getLowTide(i) {

        let lowTide = props.tideHiLo.predictions[i].type === 'L';
        
            if (lowTide) {
                lowTideData.value = Number(props.tideHiLo.predictions[i].v).toFixed(1);
                lowTideData.time = (props.tideHiLo.predictions[i].t).substr(10);
            }

            else {
                i++;
                lowTideData.value = Number(props.tideHiLo.predictions[i].v).toFixed(1);
                lowTideData.time = (props.tideHiLo.predictions[i].t).substr(10);
            }
            return lowTideData;  
        }
            

        
    
  return (
    <>
    <h1 className='spot-header'>{props.nameData}</h1>
    <div className='surf-info-container'>
        <div className='surf-height'>
            <div className='info-header'>
                <h2>Surf Height</h2>
            </div>
            {<p>{(waveHeight[currentHour]).toFixed(1)}ft</p>}
        </div>
        <div className='swell-info'>
            <div className='info-header'>
                <h2>Swell</h2>
            </div>
            <p>{(swellHeight[currentHour]).toFixed(1)}ft @ {Math.round(swellPeriod[currentHour])}s from {swellDirection[currentHour]}°</p>
        </div>
        <div className='tide-info'>
            <div className='info-header'>
                <h2>Tide</h2>
            </div>
            <div className='current-hi-lo'>
                <div className='daily-current'>
                    <h5>Current</h5>
                    <p><strong>{getCurrentTide().value}ft</strong></p>
                    <p>as of</p>
                    {convertTime(getCurrentTide().time)}
                </div>
                <div className='daily-high-tide'>
                    <h5>High</h5>
                    <p><strong>{getHighTide(0).value}ft</strong></p>
                    <p>{convertTime(getHighTide(0).time)}</p>

                    <p><strong>{getHighTide(2).value}ft</strong></p>
                    <p>{convertTime(getHighTide(2).time)}</p>
                </div>
                <div className='daily-low-tide'>
                    <h5>Low</h5>
                    <p><strong>{getLowTide(0).value}ft</strong></p>      
                    <p>{convertTime(getLowTide(0).time)}</p>

                    <p><strong>{getLowTide(2).value}ft</strong></p>      
                    <p>{convertTime(getLowTide(2).time)}</p>      
                </div>
            </div>
        </div>
    </div>
    </>
    
  )
}

export default Currentsurf