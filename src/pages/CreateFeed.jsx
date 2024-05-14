import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { storage, db } from "../firebase-config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import * as tf from "@tensorflow/tfjs";

const CreateFeed = () => {
  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(false);
  const currentUser = useContext(AuthContext);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  useEffect(() => {
    const loadModel = async () => {
      const loadedModel = await tf.loadLayersModel(
        "https://crisys-eight.vercel.app/disasterlevel/model.json"
      );
      setModel(loadedModel);
    };

    loadModel();
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }, []);

  const predict = async (image) => {
    const tensor = tf.browser
      .fromPixels(image)
      .resizeNearestNeighbor([224, 224])
      .toFloat()
      .sub(tf.scalar(127.5))
      .div(tf.scalar(127.5))
      .expandDims();

    // Make predictions
    const predictions = await model.predict(tensor).data();
    console.log(predictions);
    // Check if the image is predicted as mild or severe disaster
    const maxIndex = predictions.indexOf(Math.max(...predictions));
    const isMildOrSevereDisaster=(maxIndex!==0);
    console.log(isMildOrSevereDisaster);
    return isMildOrSevereDisaster;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const title = e.target[0].value;
    const content = e.target[1].value;
    const file = document.getElementById("feed-pic").files[0];
    const date = new Date();
    const today = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} at ${date.getHours()}:${date.getMinutes()} : ${date.getSeconds()}`;

    if (file) {
      if (model) {
        const reader = new FileReader();
        reader.onload = async function () {
          const img = new Image();
          img.src = reader.result;
          img.onload = async function () {
            const isDisaster = await predict(img);

            if (isDisaster) {
              const feedRef = doc(db, "feeds", file.name);
              const storageRef = ref(
                storage,
                `feedImages/${currentUser.uid}/${file.name}`
              );

              setLoading(true);
              await uploadBytesResumable(storageRef, file).then(() => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                  try {
                    await setDoc(feedRef, {
                      fid: currentUser.uid + today,
                      uid: currentUser.uid,
                      title: title,
                      content: content,
                      image: downloadURL,
                      time: today,
                      latitude: latitude,
                      longitude: longitude,
                    });
                   alert("Successfully posted!");
                  } catch (error) {
                    console.log(error.message);
                  } finally {
                    setLoading(false);
                  }
                });
              });
            } else {
              alert(
                "The image you are trying to upload is not of disaster."
              );
            }
          };
        };

        reader.readAsDataURL(file);
      }
    }
  };



    return (
        <div className="w-full flex justify-center items-center">

            <div className=" w-[85%] sm:w-[80%] max-w-[800px] my-4 md:my-6 lg:my-8 ">
                <h2 className="text-4xl font-bold text-black mb-6 lg:mb-8">Create Blog</h2>
                <form
                    onSubmit={e => handleSubmit(e)}
                    action=""
                    className="bg-white p-6 rounded-md flex flex-col gap-8 shadow-[0px_0px_15px_1px_#00000024]"
                >
                    <div className="relative z-0 w-full group">
                        <input
                            type="text"
                            name="title"
                            id="floating_title"
                            className="block py-2.5 px-0 w-full text-lg text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                        />
                        <label
                            htmlFor="floating_title"
                            className="peer-focus:font-medium absolute text-md text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Title of Feed
                        </label>
                    </div>
                    <div className="relative z-0 w-full group">
                        <textarea
                            rows={5}
                            type="text"
                            name="description"
                            id="floating_title"
                            className="block py-2.5 px-0 w-full text-lg text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                        />
                        <label
                            htmlFor="floating_title"
                            className="peer-focus:font-medium absolute text-md text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Description
                        </label>
                    </div>

                    {/* <div>
                        <input
                            type="datetime-local"
                            name="datetime"
                            id="floating_datetime"
                            className="block py-2.5 px-0 mt-2 mb-2 w-full text-lg text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer cursor-pointer"
                            required
                        />
                    </div> */}

                    <div>
                        <label
                            className="block mb-2 text-md font-bold text-gray-700 cursor-pointer"
                            htmlFor="feed-pic"
                        >
                            Upload file
                        </label>
                        <input
                            id="feed-pic"
                            className="p-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer"
                            aria-describedby="file_input_help"
                            type="file"
                            name="feedImage"
                        />
                    </div>
                    <div className="text-center">
                        <button
                            type="submit"
                            className={`text-white mt-3 cursor-pointer ${loading ? 'bg-blue-300' : 'bg-blue-600'} hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-base sm:w-auto px-4 py-1.5 text-center`} disabled={loading}
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateFeed;
