import React from 'react'
import ChannelCard from './ChannelCard'

const Channels = ({ showChannels, setShowChannels }) => {
    return (
        <>
            <div className={`md:w-[40%] h-full w-full absolute md:static ${showChannels ? 'left-0': '-left-full'} transition-all duration-300`}>
                <h2 className='h-14 d-flex w-full bg-[#212121] border-b border-white text-white text-lg md:text-xl font-semibold'>Channels</h2>

                <div className="w-full h-full bg-white overflow-y-auto my-scrollbar" style={{ height: 'calc(100% - 3.5rem)' }} >
                    <ChannelCard showChannels={showChannels} setShowChannels={setShowChannels} />
                    <ChannelCard showChannels={showChannels} setShowChannels={setShowChannels} />
                    <ChannelCard showChannels={showChannels} setShowChannels={setShowChannels} />
                    <ChannelCard showChannels={showChannels} setShowChannels={setShowChannels} />
                    <ChannelCard showChannels={showChannels} setShowChannels={setShowChannels} />
                    <ChannelCard showChannels={showChannels} setShowChannels={setShowChannels} />
                    <ChannelCard showChannels={showChannels} setShowChannels={setShowChannels} />
                    <ChannelCard showChannels={showChannels} setShowChannels={setShowChannels} />
                    <ChannelCard showChannels={showChannels} setShowChannels={setShowChannels} />
                    <ChannelCard showChannels={showChannels} setShowChannels={setShowChannels} />
                    <ChannelCard showChannels={showChannels} setShowChannels={setShowChannels} />
                    <ChannelCard showChannels={showChannels} setShowChannels={setShowChannels} />
                    <ChannelCard showChannels={showChannels} setShowChannels={setShowChannels} />
                    <ChannelCard showChannels={showChannels} setShowChannels={setShowChannels} />
                    <ChannelCard showChannels={showChannels} setShowChannels={setShowChannels} />
                    <ChannelCard showChannels={showChannels} setShowChannels={setShowChannels} />
                    <ChannelCard showChannels={showChannels} setShowChannels={setShowChannels} />
                    <ChannelCard showChannels={showChannels} setShowChannels={setShowChannels} />
                    <ChannelCard showChannels={showChannels} setShowChannels={setShowChannels} />
                    <ChannelCard showChannels={showChannels} setShowChannels={setShowChannels} />
                    <ChannelCard showChannels={showChannels} setShowChannels={setShowChannels} />
                    <ChannelCard showChannels={showChannels} setShowChannels={setShowChannels} />
                    <ChannelCard showChannels={showChannels} setShowChannels={setShowChannels} />
                    
                    
                </div>

            </div>
        </>
    )
}

export default Channels