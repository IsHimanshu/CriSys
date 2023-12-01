import React from 'react'

const ChannelCard = ({ showChannels, setShowChannels }) => {
    return (
        <>
            <div className="flex justify-start items-center w-full p-2 hover:bg-[#212121cf] cursor-pointer gap-4 bg-[#212121] border-b border-black" onClick={() => setShowChannels(!showChannels)}>
                <img
                    className="w-10 h-10 rounded-full inline"
                    src="https://firebasestorage.googleapis.com/v0/b/infinity-blogs.appspot.com/o/profileImages%2FIron%20Man1668356649409?alt=media&token=441df548-91b5-44d7-ae5a-29fcb26e839c"
                    alt="Rounded avatar"
                />

                <h3 className='text-base md:text-lg max-w-[280px] trim-content text-white'>Unity</h3>
            </div>
        </>
    )
}

export default ChannelCard