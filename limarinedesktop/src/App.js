import Header from "./Header";
import Footer from "./Footer";
import Currentweather from "./Currentweather";
import Currentsurf from "./Currentsurf";
import { useState } from "react";
import { SURF_INFO_API, WEATHER_API_KEY, WEATHER_API_URL, TIDE_API_URL } from "./Api";
import { spotData } from "./coordinates";


function App() {

  const [currentWeather, setCurrentWeather] = useState('')
  const [surfData, setSurfData] = useState('')
  const [tideData, setTideData] = useState('')
  const [tideHiLo, setTideHiLo] = useState('')

  let currentTime = new Date();
  let currentHour = currentTime.getHours();
  let currentDate = currentTime.toLocaleDateString();
  

  
  


    const handleOnClickChange = (spot) => {

      const currentSpot = spot;


      const currentWeatherFetch = fetch(`${WEATHER_API_URL}weather?lat=${currentSpot.lat}&lon=${currentSpot.lon}&appid=${WEATHER_API_KEY}&units=imperial`);
      const currentSurfFetch = fetch(`${SURF_INFO_API}latitude=${currentSpot.lat}&longitude=${currentSpot.lon}&hourly=wave_height,wave_period,swell_wave_height,swell_wave_direction,swell_wave_period&length_unit=imperial&timezone=America%2FNew_York`);
      const currentTideFetch = fetch(`${TIDE_API_URL}begin_date=${currentDate}&range=96&station=${currentSpot.stationId}&product=predictions&datum=MLLW&time_zone=lst_ldt&interval=60&units=english&application=DataAPI_Sample&format=json`);
      const tideHiLo = fetch(`${TIDE_API_URL}begin_date=${currentDate}&range=120&station=${currentSpot.stationId}&product=predictions&datum=MLLW&time_zone=lst_ldt&interval=hilo&units=english&application=DataAPI_Sample&format=json`);

      Promise.all([currentWeatherFetch, currentSurfFetch, currentTideFetch, tideHiLo])
      .then(async (response) => {
      const weatherResponse = await response[0].json();
      const surfResponse = await response[1].json();
      const tideResponse = await response[2].json();
      const tideHiLoResponse = await response[3].json();

      setCurrentWeather(weatherResponse);
      setSurfData(surfResponse);
      setTideData(tideResponse);
      setTideHiLo(tideHiLoResponse);
      
    })
      .catch((err) => console.log(err));

  }

  /* console.log(tideData);

  console.log(tideHiLo);  */

  

  

  

  


    

  return (
    <>
    <Header onClickChange={handleOnClickChange}/>
    {surfData && <Currentsurf data={surfData} tideData={tideData} tideHiLo={tideHiLo}/>} 
    {currentWeather && <Currentweather data={currentWeather}/>}
    <Footer />
    </>
  );
}

export default App;
