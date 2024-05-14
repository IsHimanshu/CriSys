import React, { useState, useEffect, useContext } from 'react';
import FeedCard from '../components/FeedCard';
import { FeedsContext } from '../context/FeedContext';
import AlertBtn from '../components/AlertBtn';
import Footer from '../components/Footer';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { AiOutlineMessage } from 'react-icons/ai';

const Home = () => {
    const feeds = useContext(FeedsContext);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showChat, setShowChat] = useState(false);

    // Dummy images array for demonstration
    const images = [
        'https://i.ibb.co/GnW1r3Y/EMERGENCY-BUTTON.jpg',
        'https://t4.ftcdn.net/jpg/06/32/25/85/360_F_632258589_fHQIsIXfXCPtLITflcVlO0aly7fS64hm.jpg',
        'https://5.imimg.com/data5/SELLER/Default/2023/12/369974067/NM/XF/MS/9978962/emergency-preparedness.png',
        'https://media.licdn.com/dms/image/D5612AQFrDcQRT1Hg5A/article-cover_image-shrink_720_1280/0/1664286287175?e=2147483647&v=beta&t=4s6tMVpYXT2GQuUJ9wBLvYq2huFD-mAbiOor1Ww2kqI',
    ];

    // Function to update the current image index
    const updateImageIndex = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    // Effect to change image index after certain interval
    useEffect(() => {
        const intervalId = setInterval(updateImageIndex, 5000); // Change image every 5 seconds
        return () => clearInterval(intervalId); // Clear interval on component unmount
    }, []);

    // Function to toggle the chat window
    const toggleChat = () => {
        setShowChat(!showChat);
    };

    return (
        <div className="w-[95%] m-auto">
            <AlertBtn />

            {/* Image Carousel */}
            <div className="flex justify-center">
                <h1 className='text-3xl font-semibold md:text-4xl my-5'>Public Awareness</h1>
            </div>
            <div className="flex justify-center">
                <div className="w-32 h-1 bg-gray-600 my-1"></div>
            </div>
            <br />
            <ImageCarousel images={images} currentImageIndex={currentImageIndex} />

            {/* Latest posts */}
            <SectionHeader title="Latest posts" />
            <FeedGrid feeds={feeds} />

            {/* Maps */}
            <SectionHeader title="Maps" />
            <MapWithMarker />
            <br />

            {/* Chat Button */}
            <ChatButton toggleChat={toggleChat} />

            {/* Chat Box */}
            {showChat && <ChatBox onClose={toggleChat} />}

            <Footer />
        </div>
    );
};

// Reusable component for image carousel
const ImageCarousel = ({ images, currentImageIndex }) => {
    return (
        <div className="w-full max-w-screen-lg mx-auto mb-6 border-2 border-gray-300 p-2 rounded-lg relative overflow-hidden">
            <div className="flex" style={{ transform: `translateX(-${currentImageIndex * 100}%)`, transition: 'transform 1s ease-in-out' }}>
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`carousel-${index}`}
                        className="w-full h-auto transition-all duration-300 transform scale-100 hover:scale-105"
                        style={{ minWidth: '100%', flex: '0 0 auto' }}
                    />
                ))}
            </div>
        </div>
    );
};

// Reusable component for section header
const SectionHeader = ({ title }) => {
    return (
        <>
            <div className="flex justify-center">
                <h1 className='text-3xl font-semibold md:text-4xl my-5'>{title}</h1>
            </div>
            <div className="flex justify-center">
                <div className="w-32 h-1 bg-gray-600 my-1"></div>
            </div>
            <br />
        </>
    );
};

// Reusable component for feed grid
const FeedGrid = ({ feeds }) => {
    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 justify-items-center gap-5 md:gap-6 lg:gap-8 p-3 my-grid">
            {feeds.map((ele, i) => (
                <FeedCard
                    key={i}
                    title={ele.title}
                    date={ele.date}
                    content={ele.content}
                    imageLink={ele.image}
                    adminName={ele.adminName}
                />
            ))}
        </div>
    );
};

// Reusable component for map with marker
const MapWithMarker = () => {
    const center = { lat: -34.397, lng: 150.644 }; // Center of the map
    return (
        <div style={{ height: '400px', width: '100%' }}>
            <LoadScript googleMapsApiKey="AIzaSyCV0FHfq56NFWxIEgsPpMOmT6Bj0XVmbao">
                <GoogleMap
                    mapContainerStyle={{ height: '100%', width: '100%' }}
                    center={center}
                    zoom={8}
                >
                    <Marker position={center} />
                </GoogleMap>
            </LoadScript>
        </div>
    );
};

// Reusable component for chat button
const ChatButton = ({ toggleChat }) => {
    const [showName, setShowName] = useState(false);

    const handleMouseEnter = () => {
        setShowName(true);
    };

    const handleMouseLeave = () => {
        setShowName(false);
    };

    return (
       <></>
    );
};

// Reusable component for chat box
const ChatBox = ({ onClose }) => {
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);

    const sendMessage = () => {
        setChatHistory([...chatHistory, { message: message, sender: 'user' }]);
        // Simulated response from the chatbot
        const response = 'This is a simulated response from the chatbot.';
        setChatHistory([...chatHistory, { message: response, sender: 'bot' }]);
        setMessage('');
    };

    return (
        <div className="fixed bottom-8 right-8 bg-white p-4 rounded-lg shadow-lg w-[90%] md:w-[400px] max-h-[600px] overflow-y-auto">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold">Chat-Box</h2>
                <button className="text-gray-500 hover:text-gray-600" onClick={onClose}>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm-4.293-5.707a1 1 0 011.414-1.414L10 12.586l3.879-3.879a1 1 0 111.414 1.414L11.414 14l3.879 3.879a1 1 0 01-1.414 1.414L10 15.414l-3.879 3.879a1 1 0 01-1.414-1.414L8.586 14 4.707 10.121a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            </div>
            <div className="mb-4">
                {chatHistory.map((chat, index) => (
                    <div key={index} className={`text-${chat.sender === 'user' ? 'blue' : 'gray'}-700`}>
                        {chat.message}
                    </div>
                ))}
            </div>
            <div className="flex items-center">
                <input
                    type="text"
                    className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:border-blue-500"
                    placeholder="Ask your question..."
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
    );
};

export default Home;