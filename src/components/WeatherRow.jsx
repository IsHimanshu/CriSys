import React, { useEffect, useState } from 'react'
import WeatherCard from './WeatherCard'
import WeatherSmallCard from './WeatherSmallCard'

const WeatherRow = () => {
    const [weatherData, setWeatherData] = useState([]);
    useEffect(() => {
        const getLocation = async (latitude, longitude) => {
            // getting location using latitute and longitude
            const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
            const location = await res.json();
            const city = location.locality;


            const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=0bb905953dea44b8b4a81905230805&q=${city}&days=7&aqi=yes&alerts=no`);

            const weather = await response.json();
            setWeatherData(weather.forecast.forecastday)
        }

        navigator.geolocation.getCurrentPosition(function (position) {
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;
            getLocation(lat, lon)
        });

        // eslint-disable-next-line
    }, []);
    return (
        <>

            <h1 className='text-3xl font-semibold md:text-4xl my-5'>Weather</h1>

            <div className="w-full max-w[100%] overflow-x-auto flex gap-5 justify-between scrollbar-hide">
                <WeatherCard date={weatherData[0]?.date} sunrise={weatherData[0]?.astro.sunrise} sunset={weatherData[0]?.astro.sunset} temp={weatherData[0]?.day.avgtemp_c} windSpeed={weatherData[0]?.day.maxwind_kph} humidity={weatherData[0]?.day.avghumidity} imgLink={weatherData[0]?.day.condition.icon} />

                {
                    weatherData?.slice(1, 8).map((ele, i) => (
                        <WeatherSmallCard key={i} date={ele.date} imgLink={ele.day.condition.icon} temp={ele.day.avgtemp_c} />
                    ))
                }

            </div>


        </>
    )
}

export default WeatherRow