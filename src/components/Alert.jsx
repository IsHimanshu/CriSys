import React, { useEffect, useState } from 'react'

const Alert = ({ title, message, type }) => {

    const [showAlert, setShowAlert] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowAlert(false);
        }, 200000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {
                showAlert &&
                <div className="w-full fixed top-[4.1rem] d-flex z-[1000]">
                    <div className={`flex p-4 border border-${type}-800 text-sm text-${type}-800 rounded-lg bg-${type}-100`} >
                        <span className="font-bold mr-2">{title}:</span><p>{message}</p>
                    </div>
                </div>
            }
        </>
    )
}

export default Alert