import { collection, onSnapshot } from "firebase/firestore";
import { useState, useEffect, createContext } from "react";
import { db } from "../firebase-config";

// creating context
export const FeedsContext = createContext();


export const FeedsContextProvider = ({ children }) => {

    // creating an empty array for storing users data
    const colRef = collection(db, "feeds");
    const [feeds, setFeeds] = useState([]);

    //! Fetching data of all users
    useEffect(() => {
        const unsub = onSnapshot(colRef, snapshot => {
            // sorting the data and set it
            setFeeds(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })).sort((p1, p2) => {
                const propertyName = 'date';
                return p1[propertyName] < p2[propertyName] ? 1 : p1[propertyName] > p2[propertyName] ? -1 : 0
            }));
        });

        return () => {
            unsub();
        }

        // eslint-disable-next-line
    }, [])



    return (
        <FeedsContext.Provider value={feeds} >
            {children}
        </FeedsContext.Provider>
    );

}
