import React from 'react';
import { useEffect, useState } from 'react';

/**
 * This is an example for data fetching inside of the `useEffect` hook
 */
export default function App() {
  const [temperature, setTemperature] = useState();

  // We're using this boolean state variable as a flag/toggle to decide whether the data should be fetched again
  const [shouldFetchData, setShouldFetchData] = useState(false);

  const getWeatherFromApi = () => {
    console.log('Fetching weather data');
    fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=53.55&longitude=9.99&hourly=temperature_2m'
    )
      .then((data) => data.json())
      .then((value) => setTemperature(value.hourly.temperature_2m[0]));
      
    //  Alternatively you can use async/await syntax
    // const data = await fetch(
    //   'https://api.open-meteo.com/v1/forecast?latitude=53.55&longitude=9.99&hourly=temperature_2m'
    // ).then((data) => data.json());
    // setTemperature(data.hourly.temperature_2m[0]); 
  
  };

  // This effect has an empty dependency array -> it will only run on the initial render of the component
  useEffect(() => {
    getWeatherFromApi();
  }, []);

  // This effect will run, whenever shouldFetchData changes
  useEffect(() => {
    getWeatherFromApi();
    setShouldFetchData(false)
  }, [shouldFetchData]);

  return (
    <>
      {temperature && <h1>The temperature in Hamburg is: {temperature} Degree Celsius</h1>}
      <button onClick={() => setShouldFetchData(true)}>Get new data</button>
    </>
  );
}
