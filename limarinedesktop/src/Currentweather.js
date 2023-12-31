import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'

const Currentweather = ({data}) => {


//Turn wind degree value into cardinal direction (i.e North, South, East, West etc)

    let windDirection;

    function getWindDirection(d){
        switch(true) {
            case (d === 0 || d === 360) :
                windDirection = "N";
            break;
            case (d === 90) :
                windDirection = "E";
            break;
            case (d === 180) :
                windDirection = "S";
            break;
            case (d === 270) :
                windDirection = "W";
            break;
            case (d>0 && d<90) :
                windDirection = "NE";
            break;
            case (d>90 && d<180) :
                windDirection = "SE";
            break;
            case (d>180 && d<270) :
                windDirection = "SW";
            break;
            case (d>270 && d<360) :
                windDirection = "NW";
            break;
            default:
                windDirection = "-"
                break;
        }

        return windDirection;
    }


  return (
    <div className='current-conditions-container' 
    style={{
        display: 'flex',
        justifyContent: 'center'
    }}>
        <div className='current-conditions'>
            <div className='info-header'>
                <h2>Current Conditions</h2>
            </div>

            <img className='weather-icon' 
                src={`./icons/${data.weather[0].icon}.png`} 
                alt='weather-icon'
                style={{height: '4em'
                }}>
            </img>

            <p>{Math.round(data.main.temp)}°</p>
            <p>{data.weather[0].description}</p>
        </div>

        <div className='current-wind' style={{marginLeft: '175px'}}>
            <div className='info-header'>
                <h2>Wind</h2>
            </div>
            <p>{getWindDirection(data.wind.deg)}</p>

            {data.wind.speed === 0 ? 
            <span style={{height: '50px'}}>Calm</span> : 
            <FontAwesomeIcon icon={faArrowDown} 
                size="3x" 
                style={{
                    transform: `rotateZ(${data.wind.deg}deg)`
                    }}/>}

            <p>{data.wind.deg}°</p>

            <p>{Math.round(data.wind.speed)}mph</p>
        </div>
    </div>
  )
}

export default Currentweather