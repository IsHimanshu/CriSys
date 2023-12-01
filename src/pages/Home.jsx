import React from 'react'
import FeedCard from '../components/FeedCard'
import WeatherRow from '../components/WeatherRow'
import { useContext } from 'react';
import { FeedsContext } from '../context/FeedContext';
import AlertBtn from '../components/AlertBtn';
// import AlertBtn from '../components/AlertBtn'

const Home = () => {
    const feeds = useContext(FeedsContext);

    // console.log(feeds);

    return (
        <>
            <div className="w-[95%] m-auto">
                <AlertBtn />
                <WeatherRow />

                <h1 className='text-3xl font-semibold md:text-4xl my-5'>Latest post</h1>

                <div className="w-full grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 justify-items-center gap-5 md:gap-6 lg:gap-8 p-3 my-grid">
                    {
                        feeds.map((ele, i) => (

                            <FeedCard key={i} title={ele.title} date={ele.date} content={ele.content} imageLink={ele.image} adminName={ele.adminName} />
                        ))
                    }
                    
                </div>
            </div>
        </>
    )
}

export default Home