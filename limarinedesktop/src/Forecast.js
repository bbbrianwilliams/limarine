import React from 'react'
import './styles/forecast.css'

const Forecast = ({data, surfData, tideData, tideHiLo}) => {

  const nthElement = (arr, n = 0) =>
  (n === -1 ? arr.slice(n) : arr.slice(n, n + 1))[0];
    

    const WEEK_DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const dayInWeek = new Date().getDay();
    const forecastDays = WEEK_DAYS.slice(dayInWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInWeek));

    let filteredIdx = [5, 13, 21];

    let filteredDays = data.list.filter((_, index) => filteredIdx.includes(index));

    console.log(data);

    

   

  return (
    <>
    <div className='title'><strong>Daily Forecast</strong></div>

    <div className='forecast-container'>
      <div className='daily-item-container'>

      <div className='surf-daily-container'>
      {surfData.daily.wave_height_max.slice(0, 3).map((item, idx) => (
        <div key={idx} className='max-wave-height'>
          <label>Max wave height:</label>
          <strong>{item.toFixed(1)} ft</strong>
        </div>
      ))}
      </div>

    <div className='daily-weather-container'>
    {filteredDays.map((item, idx) => (
      <div key={idx} className='daily-item'>
          <img 
              className='icon-small' 
              alt="weather" 
              src={`icons/${item.weather[0].icon}.png`} 
          />
          <label className='day'>{forecastDays[idx]}</label>
          <label className='min-max'>{Math.round(item.main.temp_max)} °F</label>
      </div>
    ))} 
    </div>
        
      </div>
    </div>
    
    </>
  )
}

export default Forecast