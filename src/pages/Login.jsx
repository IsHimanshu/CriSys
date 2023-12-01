import React, { useState } from "react";
import Wave from "../components/Wave";
import { useNavigate } from "react-router-dom";
import { auth } from '../firebase-config';
import { signInWithEmailAndPassword } from "firebase/auth";
import Alert from "../components/Alert";

const Login = () => {

    const [err, setErr] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handelSubmit = async (e) => {
        e.preventDefault();

        const email = e.target[0].value;
        const password = e.target[1].value;

        if (email && password) {
            setErr(null)

            setLoading(true);
            try {
                await signInWithEmailAndPassword(auth, email, password);


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
        <div className="absolute top-0 left-0 w-full -z-10">
            <div className="w-full h-[100vh] flex justify-center items-center bg-gradient-to-r from-[#A0BEF8] to-[#B5F0F0] relative">

                {err && <Alert type="red" message={err} title="Error" />}

                <form className="bg-white w-[85%] sm:w-[380px] md:w-[380px] p-8 py-6 flex flex-col items-center rounded-md z-10" onSubmit={e => handelSubmit(e)}>

                    <h2 className="text-4xl m-2 font-bold">Login</h2>
                    <div className="relative z-0 w-full m-6 my-8 group">
                        <input
                            type="email"
                            className="block pt-2.5 py-1 px-1 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                        />
                        <label
                            htmlFor="floating_email"
                            className="peer-focus:font-medium absolute text-base text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Email address
                        </label>
                    </div>

                    <div className="relative z-0 w-full mb-4 group">
                        <input
                            type="password"
                            name="floating_password"
                            id="floating_password"
                            className="block pt-2.5 py-1 px-1 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                        />
                        <label
                            htmlFor="floating_password"
                            className="peer-focus:font-medium absolute text-base text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Password
                        </label>
                    </div>

                    <button
                        type="submit"
                        className={`text-white mt-3 cursor-pointer ${loading ? 'bg-blue-300' : 'bg-blue-600'} hover:bg-blue-700 font-medium rounded-md text-base sm:w-auto px-4 py-1.5 text-center`} disabled={loading}
                    >
                        Submit
                    </button>
                </form>

                <div className="w-full absolute bottom-0">
                    <Wave />
                </div>
            </div>
        </div>
    );
};

export default Login;