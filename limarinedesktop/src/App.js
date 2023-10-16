import Header from "./Header";
import Footer from "./Footer";
import Currentweather from "./Currentweather";
import Currentsurf from "./Currentsurf";
import { useState, useEffect } from "react";
import { SURF_INFO_API, WEATHER_API_KEY, WEATHER_API_URL } from "./Api";
import { gilgoCoords, mtkCoords, lbCoords, gilgoLat, gilgoLon } from "./coordinates";


function App() {

  const [currentWeather, setCurrentWeather] = useState('')
  const [surfData, setSurfData] = useState('')
  

  

    const handleOnClickChange = (e) => {

    const [lat, lon] = e.value.split(" ");

    const currentWeatherFetch = fetch(`${WEATHER_API_URL}weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=imperial`);
    const currentSurfFetch = fetch(`${SURF_INFO_API}latitude=${lat}&longitude=${lon}&hourly=wave_height,wave_period,swell_wave_height,swell_wave_direction,swell_wave_period&length_unit=imperial&timezone=America%2FNew_York`)

    Promise.all([currentWeatherFetch, currentSurfFetch])
    .then(async (response) => {
      const weatherResponse = await response[0].json();
      const surfResponse = await response[1].json();

      setCurrentWeather(weatherResponse);
      setSurfData(surfResponse);
      
    })
    .catch((err) => console.log(err));
  }


  

  let currentTime = new Date();
  let currentHour = currentTime.getHours();

  

  console.log(surfData);
  console.log(currentWeather);


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
