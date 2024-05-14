import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase-config';
import axios from 'axios';

const AlertBtn = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const currentUser = useContext(AuthContext);
    const [userData, setUserData] = useState([]);
    
    const handleOptionSelect = async (option) => {
        setSelectedOption(option);
        setDropdownOpen(false);
        
    

          
           
       
    };

    const getCurrentPosition = () => {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    };

    const sendAlertMessage = async(message, location) => {
        // Your socket implementation to send the message and location
        // Replace this with your actual implementation
        try{

            const res = await axios.get('https://backend-epic.onrender.com/api/ackfront') ;
            console.log(res.data) ;
            if(res.data === true)
                {
                    const res = await axios.get('https://backend-epic.onrender.com/api/ackback') ;
                    alert("We have your Location, Help will arrive shortly.")
                }
        }
        catch(error){
            console.log(error) ;
        }
       
        // console.log(`Sending message: ${message} from location: ${location.latitude}, ${location.longitude}`);
       
       
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Get user's current location
                const position = await getCurrentPosition();
                const { latitude, longitude } = position.coords;
                const currentTime = new Date();
    
                const response = await axios.post('https://backend-epic.onrender.com/api/save', {
                    latitude,
                    longitude,
                    userData,
                    selectedOption,
                    currentTime
                });
    
                if (response.status === 200) {
                    alert('Location data sent successfully');
                } else {
                    console.error('Failed to send location data');
                }
            } catch (error) {
                console.error('Error sending location data:', error);
            }
        };
    
        // Fetch data only when selectedOption changes
        if (selectedOption !== null) {
            fetchData();
        }
    }, [selectedOption]);
  

    useEffect(() => {
        if (currentUser && currentUser.uid) {
            const docRef = doc(db, "users", currentUser.uid);

            const unsub = onSnapshot(docRef, (doc) => {
                setUserData(doc.data());
            });

            return () => {
                unsub();
            };
        }
    }, [currentUser]);
  
    useEffect(()=>{
        sendAlertMessage();
    })




    return (
        <div className="relative inline-block text-left">
            <div>
                <button
                    type="button"
                    className="focus:outline-none my-3 mx-auto text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base px-6 py-3 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                    Emergency &darr;
                </button>
            </div>
            {dropdownOpen && (
                <div className="absolute z-50 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div
                        className="py-1"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                    >
                        {/* Example options, replace with your desired disaster options */}
                        <button
                            className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            onClick={() => handleOptionSelect('Earthquake')}
                        >
                            Earthquake
                        </button>
                        <button
                            className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            onClick={() => handleOptionSelect('Landslide')}
                        >
                            Landslide
                        </button>
                        <button
                            className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            onClick={() => handleOptionSelect('Fire')}
                        >
                            Forest Fire
                        </button>
                        <button
                            className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            onClick={() => handleOptionSelect('Flood')}
                        >
                            Flood
                        </button>
                        {/* Add more options as needed */}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AlertBtn;
