import React, { useEffect, useState } from 'react'
import Wave from '../components/Wave'
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db, storage } from '../firebase-config';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { doc, setDoc} from 'firebase/firestore';
import { City, Country, State } from "country-state-city";
import Selector from "../components/Selector";
import Alert from '../components/Alert';

const Signup = () => {
    const [err, setErr] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    let countryData = Country.getAllCountries();
    const [stateData, setStateData] = useState();
    const [cityData, setCityData] = useState();
    const [userType, setUserType] = useState('Person')
    const [country, setCountry] = useState(countryData[0]);
    const [state, setState] = useState();
    const [city, setCity] = useState();

    useEffect(() => {
        setStateData(State.getStatesOfCountry(country?.isoCode));
    }, [country]);

    useEffect(() => {
        setCityData(City.getCitiesOfState(country?.isoCode, state?.isoCode));
    }, [country?.isoCode, state]);

    useEffect(() => {
        stateData && setState(stateData[0]);
    }, [stateData]);

    useEffect(() => {
        cityData && setCity(cityData[0]);
    }, [cityData]);


    const handelSubmit = async (e) => {
        e.preventDefault();

        const name = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const phoneNum = e.target[3].value;
        const address = e.target[4].value;
        const file = document.getElementById('profile-pic').files[0];


        // console.log(name, email, password, phoneNum, address, file, userType, country.name, state.name, city.name)

        if (name && email && password && phoneNum) {
            setErr(null)

            setLoading(true);
            try {
                const response = await createUserWithEmailAndPassword(auth, email, password);
                const user = response.user;
                const date = new Date().getTime();
                // creating ref of storage
                const storageRef = ref(storage, `profileImages/${name + date}`);
                // creating ref of user document
                const docRef = doc(db,"users",user.uid);
                await uploadBytesResumable(storageRef, file).then(() => {
                    getDownloadURL(storageRef).then(async (downloadURL) => {
                        try {
                            // updating profile of user
                            await updateProfile(user, {
                                displayName: name,
                                photoURL: downloadURL
                            })

                            // creating a doc for user
                            await setDoc(docRef, {
                                uid: user.uid,
                                displayName: name,
                                photoURL: downloadURL,
                                email: email,
                                phoneNum: phoneNum,
                                address: address,
                                userType: userType,
                                country: country.name,
                                state: state.name,
                                city: city.name
                            })

                        } catch (error) {
                            setErr(error.message)
                        }
                    })
                })

                // console.log(user)
                navigate("/");

            } catch (error) {
                setErr(error.message)
            }
            setLoading(false)


        }

        else {
            setErr("Please fill all fields")
        }


    }

    return (
        <>
            <div className="absolute top-0 left-0 w-full -z-10">
                
                <div className="w-full min-h-screen md:h-auto flex justify-center items-center bg-gradient-to-r from-[#A0BEF8] to-[#B5F0F0] relative pt-16 pb-8" >

                    {err && <Alert type="red" message={err} title="Error" />}

                    <form className="bg-white w-[85%] sm:w-[380px] md:w-[450px] p-8 py-6 flex flex-col items-center rounded-md z-10 gap-4" onSubmit={e => handelSubmit(e)}>
                        <h2 className="text-4xl m-2 font-bold">Register</h2>

                        {/* Name */}
                        <div className="relative z-0 w-full group">
                            <input
                                type="text"
                                name="floating_name"
                                id="floating_name"
                                className="block pt-2.5 py-0.5 px-1 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                required placeholder=' '
                            />
                            <label
                                htmlFor="floating_name"
                                className="peer-focus:font-medium absolute text-base text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Name
                            </label>
                        </div>

                        {/* Email */}
                        <div className="relative z-0 w-full group">
                            <input
                                type="email"
                                className="block pt-2.5 py-0.5 px-1 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                required placeholder=' '
                            />
                            <label
                                htmlFor="floating_email"
                                className="peer-focus:font-medium absolute text-base text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Email address
                            </label>
                        </div>

                        {/* Password */}
                        <div className="relative z-0 w-full group">
                            <input
                                type="password"
                                name="floating_pass-num"
                                id="floating_pass-num"
                                className="block pt-2.5 py-0.5 px-1 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                required placeholder=' '
                            />
                            <label
                                htmlFor="floating_pass-num"
                                className="peer-focus:font-medium absolute text-base text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Password
                            </label>
                        </div>

                        {/* Phone number */}
                        <div className="relative z-0 w-full group">
                            <input
                                type="text"
                                name="floating_phn-num"
                                id="floating_phn-num"
                                className="block pt-2.5 py-0.5 px-1 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                required placeholder=' '
                            />
                            <label
                                htmlFor="floating_phn-num"
                                className="peer-focus:font-medium absolute text-base text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Phone Number
                            </label>
                        </div>

                        {/* Address */}
                        <div className="relative z-0 w-full group">
                            <input type="text" name="floating_address" id="floating_address" className="block pt-2.5 py-0.5 px-1 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" required placeholder=' ' />
                            <label htmlFor="floating_address" className="peer-focus:font-medium absolute text-base text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >Address</label>
                        </div>

                        {/* Country, city, state */}
                        <div className="flex justify-between items-center w-full">

                            <Selector data={countryData} selected={country} setSelected={setCountry} />

                            {state && <Selector data={stateData} selected={state} setSelected={setState} />}

                            {city && <Selector data={cityData} selected={city} setSelected={setCity} />}

                        </div>

                        {/* User Type */}
                        <div className="w-full">
                            <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="file_input" >Type</label>

                            <div className="flex items-center mb-4">
                                <input id="radio-1" type="radio" value="Person" onChange={e => setUserType(e.target.value)} checked={userType === 'Person'} name="radio" className="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 " />
                                <label htmlFor="radio-1" className="ml-2 text-sm font-medium text-gray-900" >Person</label>
                            </div>

                            <div className="flex my-2 items-center">
                                <input checked={userType === 'Organization'} id="radio-2" type="radio" value="Organization" onChange={e => setUserType(e.target.value)} name="radio" className="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 " />
                                <label htmlFor="radio-2" className="ml-2 text-sm font-medium text-gray-900" >Organization</label>
                            </div>
                        </div>

                        {/* Photo */}
                        <div className="w-full mt-2">

                            <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="profile-pic">Upload photo</label>

                            <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 p-2" type="file" accept="image*" id='profile-pic' />

                        </div>

                        <button
                            type="submit"
                            className={`text-white mt-3 cursor-pointer ${loading ? 'bg-blue-300' : 'bg-blue-600'} hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-base sm:w-auto px-4 py-1.5 text-center`} disabled={loading}
                        >
                            Submit
                        </button>
                    </form>

                    <div className="w-full absolute bottom-0">
                        <Wave />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup