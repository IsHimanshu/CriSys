import React, { useState } from 'react'
import Channels from './Channels'
import ChannelFeedArea from './ChannelFeedArea'

const CommunityArea = () => {

    const [showChannels, setShowChannels] = useState(false);

    return (
        <>
            <div className="d-flex w-[90%] max-w-[950px] my-4 h-[80vh] rounded-md overflow-hidden mx-auto bg-white shadow-md border border-blue-700 relative">
                <Channels showChannels={showChannels} setShowChannels={setShowChannels} />
                <ChannelFeedArea showChannel={showChannels} setShowChannels={setShowChannels} />
            </div>
        </>
    )
}

export default CommunityArea