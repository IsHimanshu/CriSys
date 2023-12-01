import React from 'react'

const WeatherSmallCard = ({date, imgLink, temp}) => {
    return (
        <>
            <div className="w-36 rounded-md flex flex-col justify-between items-center p-2 text-white bg-blue-500">
                <h3 className='text-lg md:text-xl text-center'>{date}</h3>

                <img className='w-28' src={imgLink} alt="" />
                <h3 className='text-3xl  md:text-4xl'>{temp}°</h3>

            </div>
        </>
    )
}

export default WeatherSmallCard