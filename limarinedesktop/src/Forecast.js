import React from 'react'
import './styles/forecaststyle.css'


const Forecast = ({data, surfData, tideData, tideHiLo}) => {

  //Define days in week and determine which days need to be displayed in forecast
    
    const WEEK_DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const dayInWeek = new Date().getDay();
    const forecastDays = WEEK_DAYS.slice(dayInWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInWeek));
    

//filter data returned to map over specific times/values to display in forecast

    let filteredIdx = [4, 12, 20];

    let filteredDays = data.list.filter((_, index) => filteredIdx.includes(index));
    
    
  return (

          <div className='forecast-container'>
            <div className='weather-forecast' style={{
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
            }}>
              {filteredDays.map((item, idx) => (
                  <div className='daily-item' key={idx} style={{
                    width: "100px",
                    textAlign: "center",
                    margin: "10px 110px",
                  }}>
                    <div><label className='day'>{forecastDays[idx]}</label></div>
                    <div>
                      <img 
                          className='icon-small' 
                          alt="weather" 
                          src={`icons/${item.weather[0].icon}.png`} 
                          style={{
                            width: "40px"
                          }}
                          />
                    </div>
                    <div><label className='min-max'>{Math.round(item.main.temp_max)} °F</label></div>
                  </div>
              ))}
            </div>

            <div className='wave-forecast' style={{
              display: "flex",
              justifyContent: "center",
            }}>
              {surfData.daily.wave_height_max.slice(0, 3).map((item, idx) => (
                  <div className='max-wave-height' key={idx} style={{
                    textAlign: "center",
                    margin: "10px 100px",
                  }}>
                    <div><label>Max wave height</label></div>
                    <div><strong>{item.toFixed(1)} ft</strong></div>
                  </div>
              ))}
            </div>
          </div>
  )
}

export default Forecast