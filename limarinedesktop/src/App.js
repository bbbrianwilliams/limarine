import Header from "./Header";
import Footer from "./Footer";
import Currentweather from "./Currentweather";
import Forecast from "./Forecast";
import Currentsurf from "./Currentsurf";
import { useState } from "react";
import { SURF_INFO_API, WEATHER_API_KEY, WEATHER_API_URL, TIDE_API_URL } from "./Api";
import ClipLoader from "react-spinners/ClipLoader";
import { spotData } from "./Spotsdata";


function App() {

  const [spotName, setSpotName] = useState('')
  const [currentWeather, setCurrentWeather] = useState('')
  const [forecastWeather, setForecastWeather] = useState('')
  const [surfData, setSurfData] = useState('')
  const [tideData, setTideData] = useState('')
  const [tideHiLo, setTideHiLo] = useState('')
  const [loading, setLoading] = useState(false)

  let currentTime = new Date();
  let currentHour = currentTime.getHours();
  let currentDateString = currentTime.getFullYear() + ('0' + (currentTime.getMonth()+1)).slice(-2) + ('0' + currentTime.getDate()).slice(-2);
  

//Define click handler

    const handleOnClickChange = (spot) => {

//While loading data, display spinner

      setLoading(true);

//Set spot name

      const currentSpot = spot;
      setSpotName(currentSpot.name)

//fetch data for current spot

      const currentWeatherFetch = fetch(`${WEATHER_API_URL}weather?lat=${currentSpot.lat}&lon=${currentSpot.lon}&appid=${WEATHER_API_KEY}&units=imperial`);
      const forecastWeatherFetch = fetch(`${WEATHER_API_URL}forecast?lat=${currentSpot.lat}&lon=${currentSpot.lon}&appid=${WEATHER_API_KEY}&units=imperial`);
      const currentSurfFetch = fetch(`${SURF_INFO_API}latitude=${currentSpot.lat}&longitude=${currentSpot.lon}&hourly=wave_height,wave_period,swell_wave_height,swell_wave_direction,swell_wave_period&daily=wave_height_max&length_unit=imperial&timezone=America%2FNew_York`);
      const currentTideFetch = fetch(`${TIDE_API_URL}begin_date=${currentDateString}&range=96&station=${currentSpot.stationId}&product=predictions&datum=MLLW&time_zone=lst_ldt&interval=60&units=english&application=DataAPI_Sample&format=json`);
      const tideHiLo = fetch(`${TIDE_API_URL}begin_date=${currentDateString}&range=120&station=${currentSpot.stationId}&product=predictions&datum=MLLW&time_zone=lst_ldt&interval=hilo&units=english&application=DataAPI_Sample&format=json`);

      Promise.all([currentWeatherFetch, forecastWeatherFetch, currentSurfFetch, currentTideFetch, tideHiLo])
      .then(async (response) => {
      const weatherResponse = await response[0].json();
      const forecastResponse = await response[1].json();
      const surfResponse = await response[2].json();
      const tideResponse = await response[3].json();
      const tideHiLoResponse = await response[4].json();

      setCurrentWeather(weatherResponse);
      setForecastWeather(forecastResponse);
      setSurfData(surfResponse);
      setTideData(tideResponse);
      setTideHiLo(tideHiLoResponse);
      
    })
      .catch((err) => console.log(err))
  
      .finally(() => setLoading(false))

  }

  

  return (
    <>
    <Header onClickChange={handleOnClickChange}/>

  {/* Display spinner while data is being fetched */}

    {loading ? 
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '500px',
      }}>
      <ClipLoader
        size={'150px'}
        speedMultiplier={.2}
      />
    </div>
    

   : surfData && <Currentsurf 
    nameData={spotName} 
    surfData={surfData} 
    tideData={tideData} 
    tideHiLo={tideHiLo}
    />} 


    {/* Current weather component */}

    {loading ? null : currentWeather && <Currentweather data={currentWeather}/>}


    {/* Weather Forecast component */}

    {loading ? null : forecastWeather && <Forecast 
    data={forecastWeather} 
    surfData={surfData} 
    tideData={tideData} 
    tideHiLo={tideHiLo}
    />}

    <Footer />
    </>
  );
}

export default App;
