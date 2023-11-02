import React from 'react'
import './styles/Currentsurf.css'
import { spotData } from './Spotsdata';
import Currentweather from './Currentweather';

const Currentsurf = ({surfData, tideData, tideHiLo, nameData}) => {

    let currentTime = new Date();
    let currentHour = currentTime.getHours();

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
     }


    
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

    function getCurrentTide() {
        
        currentTideData.value = tideData.predictions[currentHour].v;
        currentTideData.time = tideData.predictions[currentHour].t;

        return currentTideData;
    }



    function getHighTide(i) {
        let highTide = tideHiLo.predictions[i].type === 'H';

            if (highTide) {
                highTideData.value = Number(tideHiLo.predictions[i].v).toFixed(1);
                highTideData.time = (tideHiLo.predictions[i].t).substr(10);

            }

            else {
                i++;
                highTideData.value = Number(tideHiLo.predictions[i].v).toFixed(1);
                highTideData.time = (tideHiLo.predictions[i].t).substr(10);
            }

            return highTideData;
            
        }

    function getLowTide(i) {
        let lowTide = tideHiLo.predictions[i].type === 'L';

            if (lowTide) {
                lowTideData.value = Number(tideHiLo.predictions[i].v).toFixed(1);
                lowTideData.time = (tideHiLo.predictions[i].t).substr(10);
            }

            else {
                i++;
                lowTideData.value = Number(tideHiLo.predictions[i].v).toFixed(1);
                lowTideData.time = (tideHiLo.predictions[i].t).substr(10);
            }

            return lowTideData;
            console.log(lowTideData);
            
        }

        let tideIsRising = true;

    /* function isTideRising() {
        if(currentTideData.value > lowTideData.value && currentTideData.time) {
            tideIsRising = true;
        } else {
            tideIsRising = false;
        }
    } */
            
        
    console.log();
    
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
                <h2>Swell</h2>
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
                    <p><strong>{Number(getCurrentTide().value).toFixed(1)}ft</strong></p>
                    <p>as of</p>
                    <p>{convertTime((getCurrentTide().time).substring(10))}</p>
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