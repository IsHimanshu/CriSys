import React from "react";
import ReadFeed from "./ReadFeed";

const FeedCard = ({ imageLink, date, title, content, adminName }) => {


    const manageStr = (str, maxLetter) => {
        if (str?.length > maxLetter) return str.slice(0, maxLetter) + "...";
        else return str;
    };



    return (
        <>
            <div className="card rounded-lg bg-white shadow-md w-[90%]  lg:w-[96%] md:w-[95%] max-w-[400px] text-white flex flex-col justify-center items-start gap-2 p-4">
                <img
                    className="w-full h-64 sm:h-52 lg:h-64 md:h-56 rounded-lg object-cover"
                    src={imageLink}
                    alt="feed pic"
                />

                <span className="text-gray-700 text-[13px] md:text-sm">
                    {date}
                </span>

                <h2 className="text-[17px] max-w-[95%] trim-content font-semibold text-black">
                    {title}
                </h2>

                <p className="text-gray-900 text-[15px] py-1 h-[75px] max-h-[88px]">
                    {manageStr(
                        `${content}`,
                        120
                    )}
                </p>

                <ReadFeed imageLink={imageLink} title={title} content={content} />

                <div className="w-full">

                    <h3 className="text-lg md:text-base text-black font-semibold inline">
                        {manageStr(`${adminName}`, 25)}
                    </h3>

                </div>
            </div>
        </>
    );
};

export default FeedCard;
