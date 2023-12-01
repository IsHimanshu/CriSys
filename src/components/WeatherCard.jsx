import React from 'react'

const WeatherCard = ({ date1, temp, sunset, sunrise, humidity, windSpeed, imgLink }) => {

    const apiKey = 'SlAngGxsol3pwSFuBhBOa5brjllcDJtkWIyU4vOX';
    const date = '2023-05-10';
    const time = '00:00:00';
    const latitude = 40.7128;
    const longitude = -74.006;

    

    async function checkDisaster() {
        try {
            const response = await fetch(`https://api.aerisapi.com/severe/alerts/closest?p=${latitude},${longitude}&from=${date}T${time}&to=${date}T${time}&limit=1&client_id=${apiKey}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            if (!data.response[0] || !data.response[0].alerts) {
                throw new Error('No alerts found.');
            }
            const alerts = data.response[0].alerts;
            const isReal = alerts.some(alert => alert.active === true);
            return isReal;
        } catch (error) {
            console.error(error);
        }
    }

    checkDisaster()
        .then(result => console.log(result))
        .catch(error => console.error(error));









    return (
        <>
            <div className="w-72 min-w-max rounded-md p-2 text-black glass">
                <h3 className='text-xl md:text-2xl text-center'>{date1}</h3>
                <div className='w-full flex justify-between items-center' >
                    <h3 className='text-5xl  md:text-6xl'>{temp}°</h3>
                    <img className='w-20 md:w-24' src={imgLink} alt="" />
                </div>

                <div className="w-full grid grid-rows-2 my-2 grid-cols-2 gap-3">
                    <div>
                        <h4 className="text-base font-semibold">Wind Speed:</h4>
                        <p className='text-sm' >{windSpeed}</p>
                    </div>
                    <div>
                        <h4 className="text-base font-semibold">Humidity</h4>
                        <p className='text-sm' >{humidity}</p>
                    </div>

                    <div>
                        <h4 className="text-base font-semibold">Sunrise</h4>
                        <p className='text-sm' >{sunrise}</p>
                    </div>
                    <div>
                        <h4 className="text-base font-semibold">Sunset</h4>
                        <p className='text-sm' >{sunset}</p>
                    </div>

                </div>

            </div>
        </>
    )
}

export default WeatherCard