import React, { useState } from 'react';

const ChatBox = ({ onClose }) => {
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);

    const sendMessage = async () => {
        // Add user message to chat history
        setChatHistory(chatHistory => [...chatHistory, { message: message, sender: 'user' }]);

        try {
            // Send message to chatbot API and wait for response
            const apiResponse = await fetch('YOUR_CHATBOT_API_ENDPOINT', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Include other headers as required by your Chatbot API
                },
                body: JSON.stringify({ message: message })
            });

            if (!apiResponse.ok) {
                throw new Error('API response not ok');
            }

            const data = await apiResponse.json();
            const botMessage = data.answer; // Assuming 'answer' contains the chatbot's reply

            // Add chatbot response to chat history
            setChatHistory(chatHistory => [...chatHistory, { message: botMessage, sender: 'bot' }]);
        } catch (error) {
            console.error('Error fetching chatbot response:', error);
            // Handle error by adding an error message to chat history or alerting the user
        }

        // Clear input field
        setMessage('');
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-[90%] md:max-w-[400px] h-auto overflow-y-auto">
                <div className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Chat-box</h2>
                    <div className="mb-4">
                        {chatHistory.map((chat, index) => (
                            <div
                                key={index}
                                className={`text-${chat.sender === 'user' ? 'blue' : 'gray'}-700 mb-2`}
                            >
                                {chat.message}
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center">
                        <input
                            type="text"
                            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:border-blue-500"
                            placeholder="Type your message..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <button
                            className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 focus:outline-none"
                            onClick={sendMessage}
                        >
                            Send
                        </button>
                    </div>
                </div>
                <div className="p-4 bg-gray-100 flex justify-end">
                    <button
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatBox;
