// EmergencyPage.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const EmergencyPage = ({ sendMessage }) => {
    const [message, setMessage] = useState('');
    const history = useHistory();

    const handleSendMessage = () => {
        // Send message to other users
        sendMessage(message);
        // Redirect to user details page
        history.push('/user-details');
    };

    return (
        <div>
            <h1>Send Emergency Message</h1>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
            <button onClick={handleSendMessage}>Send</button>
        </div>
    );
};

export default EmergencyPage;
