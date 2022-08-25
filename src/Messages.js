import React, { useState } from "react";
import axios from "axios";
import { MessageDisplay } from "./MessageDisplay";

export default function Messages({ data }) {
    const [message, setMessage] = useState({});
    const [messagesFU, setMessagesFU] = useState({});
    const [c, setC] = useState(1);

    const items = data.data || [];
    const pincodes = [];

    items.map((item) => pincodes.push(item.pincode));

    const fetchMessage = () => {
        pincodes.map((pincode) =>
            axios
                .post(
                    "https://earlysuraksha.herokuapp.com/api/es/MessagesFromUsers",
                    {
                        pin: pincode,
                    }
                )
                .then((response) => {
                    setMessagesFU({
                        ...messagesFU,
                        [pincode]: response.data.messages[0],
                    });
                })
        );

        console.log(messagesFU);
    };

    const handleSubmit = (pincode, message) => {
        console.log({ pincode: pincode, message: message });
        axios
            .post(
                "https://earlysuraksha.herokuapp.com/api/es/MessagesToUsers",
                { pin: pincode, msg: message }
            )
            .then(console.log("Data Sent."));

        console.log(message);
        setC(0);
    };

    return (
        <div>
            <div className="flex text-xl py-4 justify-between px-12">
                <span className="text-3xl text-gray-800 sans">
                    <span className="text-black font-bold">#&nbsp;</span>
                    Locations
                </span>
                {/* <span
                    className="py-1 px-2 text-sm bg-red-600 text-white hover:bg-red-800"
                    style={{ cursor: "pointer" }}
                    onClick={() => fetchMessage()}
                >
                    Refresh Messages
                </span> */}
            </div>
            <div
                className="accordion accordion-flush"
                id="accordionFlushExample"
            >
                {items.map((item) => (
                    <div
                        className="accordion-item border-t-0 border-l-0 border-r-0 rounded-none bg-white border border-gray-200"
                        key={item._id}
                    >
                        <h2
                            className="accordion-header mb-0"
                            id="flush-headingOne"
                        >
                            <button
                                className="accordion-button
    relative
    flex
    items-center
    w-full
    py-4
    px-5
    text-base text-gray-800 text-left
    bg-white
    border-0
    rounded-none
    transition
    focus:outline-none"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#flush-collapseOne"
                                aria-expanded="false"
                                aria-controls="flush-collapseOne"
                            >
                                <span className="font-bold poppins text-2xl">
                                    {item.city}
                                </span>
                            </button>
                        </h2>
                        <div
                            id="flush-collapseOne"
                            className="accordion-collapse border-0 collapse show"
                            aria-labelledby="flush-headingOne"
                            data-bs-parent="#accordionFlushExample"
                        >
                            <div className="accordion-body py-4 px-5">
                                <div className="grid grid-cols-2 poppins">
                                    <div>
                                        <span className="text-lg text-gray-800 font-bold sans">
                                            State : &nbsp;&nbsp;&nbsp;
                                        </span>
                                        {item.state}
                                    </div>{" "}
                                    <div>
                                        <span className="text-lg text-gray-800 font-bold sans">
                                            Pincode : &nbsp;&nbsp;&nbsp;
                                        </span>
                                        {item.pincode}
                                    </div>{" "}
                                    <div>
                                        <span className="text-lg text-gray-800 font-bold sans">
                                            Latitude : &nbsp;&nbsp;&nbsp;
                                        </span>
                                        {item.loc.lat}
                                    </div>{" "}
                                    <div>
                                        <span className="text-lg text-gray-800 font-bold sans">
                                            Longitude : &nbsp;&nbsp;&nbsp;
                                        </span>
                                        {item.loc.long}
                                    </div>{" "}
                                    <div>
                                        <span className="text-lg text-green-600 font-bold sans">
                                            Food : &nbsp;&nbsp;&nbsp;
                                        </span>
                                        {item.food}
                                    </div>{" "}
                                    <div>
                                        <span className="text-lg text-green-600 font-bold sans">
                                            Shelter : &nbsp;&nbsp;&nbsp;
                                        </span>
                                        {item.shelter}
                                    </div>{" "}
                                    <div>
                                        <span className="text-lg text-green-600 font-bold sans">
                                            Medical Staff : &nbsp;&nbsp;&nbsp;
                                        </span>
                                        {item.medicalStaff}
                                    </div>{" "}
                                </div>
                                <div className="flex justify-between">
                                    <div>
                                        <span className="text-lg text-red-600 font-bold sans">
                                            Messages : &nbsp;&nbsp;&nbsp;
                                        </span>
                                        <MessageDisplay pin={item.pincode} />
                                    </div>{" "}
                                    <br />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-start my-2  mx-12 sans pb-12">
                                    <input
                                        type="text"
                                        value={c === 0 ? "" : message[item._id]}
                                        onChange={(e) => {
                                            setC(1);
                                            setMessage(e.target.value);
                                        }}
                                        placeholder={
                                            "Message to Pin:" + item.pincode
                                        }
                                        className="py-2 px-6 rounded-l-xl shadow-xl w-1/2"
                                    />
                                    <span
                                        className="py-2 px-6 bg-blue-600 shadow-xl rounded-r-xl text-white hover:bg-blue-700"
                                        style={{ cursor: "pointer" }}
                                        onClick={() =>
                                            handleSubmit(
                                                item.pincode,
                                                message
                                            ).then((message[item._id] = ""))
                                        }
                                    >
                                        Send
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
