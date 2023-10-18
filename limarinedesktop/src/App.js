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
  //const [tideData, setTideData] = useState('')

  let currentTime = new Date();
  let currentHour = currentTime.getHours();


    const handleOnClickChange = (spot) => {

      const currentSpot = spot;


      const currentWeatherFetch = fetch(`${WEATHER_API_URL}weather?lat=${currentSpot.lat}&lon=${currentSpot.lon}&appid=${WEATHER_API_KEY}&units=imperial`);
      const currentSurfFetch = fetch(`${SURF_INFO_API}latitude=${currentSpot.lat}&longitude=${currentSpot.lon}&hourly=wave_height,wave_period,swell_wave_height,swell_wave_direction,swell_wave_period&length_unit=imperial&timezone=America%2FNew_York`);
    //const currentTideFetch = fetch(`${TIDE_API_URL}date=today&station=${stationId}&product=predictions&datum=MLLW&time_zone=lst_ldt&interval=hilo&units=english&application=DataAPI_Sample&format=json`);

      Promise.all([currentWeatherFetch, currentSurfFetch])
      .then(async (response) => {
      const weatherResponse = await response[0].json();
      const surfResponse = await response[1].json();
     // const tideResponse = await response[2].json();

      setCurrentWeather(weatherResponse);
      setSurfData(surfResponse);
      //setTideData(tideResponse);
      
    })
      .catch((err) => console.log(err));

      console.log(currentSpot);

  }


    

  return (
    <>
    <Header onClickChange={handleOnClickChange}/>
    {surfData && <Currentsurf data={surfData} />} 
    {currentWeather && <Currentweather data={currentWeather}/>}
    <Footer />
    </>
  );
}

export default App;
