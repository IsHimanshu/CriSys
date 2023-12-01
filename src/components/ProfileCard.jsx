import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase-config';

const ProfileCard = () => {

    const currentUser = useContext(AuthContext);
    const [userData, setUserData] = useState([]);

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


    return (

        <>
            <div className="bg-white w-[max-content] md:max-w-[600px] max-w-[350px] mx-auto my-5 flex md:flex-row flex-col md:justify-start justify-center items-center rounded p-2 md:p-3 shadow gap-5 md:gap-6 lg:gap-8">

                <img src={userData.photoURL}
                    className='md:w-48 md:h-48 w-[90%] h-36 object-cover rounded' alt="profile" />

                <div className='bg-white md:h-48 h-36 flex justify-evenly items-start flex-col gap-2' >
                    <div>
                        <h3 className='mr-2 text-base font-semibold inline-block' >Name:</h3>
                        <p className='text-sm inline-block' >{userData.displayName}</p>
                    </div>
                    <div>
                        <h3 className='mr-2 text-base font-semibold inline-block' >Phone Number:</h3>
                        <p className='text-sm inline-block' >{userData.phoneNum}</p>
                    </div>
                    <div>
                        <h3 className='mr-2 text-base font-semibold inline-block' >Email:</h3>
                        <p className='text-sm inline-block' >{userData.email}</p>
                    </div>
                    <div>
                        <h3 className='mr-2 text-base font-semibold inline-block' >Address:</h3>
                        <p className='text-sm inline-block' >{userData.address}</p>
                        <p className='text-sm'>{userData.country}, {userData.state}, {userData.city}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileCard