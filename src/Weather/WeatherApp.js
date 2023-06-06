import React, {useState, useEffect} from 'react'
import "./style.css"
import WeatherCard from "./WeatherCard"

const WeatherApp = () => {
    const [searchValue, setSearchValue] = useState("Pune");
    const [tempInfo, setTempInfo] = useState({});

    const getWeatherinfo = async () => {
        try{
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=a64f2c79148945cbfa999c1bcb344c32`;

            const res = await fetch(url);
            const data = await res.json();
            
            const {temp, humidity, pressure} = data.main;
            const {main : weatherMood} = data.weather[0];
            const {name} = data;
            const {speed} = data.wind;
            const {country, sunset} = data.sys;

            const myNewWeatherInfo = {
                temp, humidity, pressure, weatherMood, name, country, sunset, speed
            }

            setTempInfo(myNewWeatherInfo);

            console.log(temp);
            console.log(data);
        } catch(error){
            console.log(error);
        }
    }
    useEffect(() => {
        getWeatherinfo();
    }, [])
  return (
    <>
        <div className='wrap'>
            <div className='search'>
                <input type="search" placeholder="Type Somethi.." autoFocus id='search' className='searchTerm' value={searchValue} onChange={(e) => setSearchValue(e.target.value)}></input>
                <button className='searchButton' type='button' onClick={getWeatherinfo}>Search</button>
            </div>
        </div>

        <WeatherCard  tempInfo={tempInfo} />
    </>
  )
}

export default WeatherApp
