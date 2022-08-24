import React, { useState } from "react";
import axios from "axios";

export default function Messages({ data }) {
    const [message, setMessage] = useState({});
    const [messagesFU, setMessagesFU] = useState({});

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
                        pincode: response.data.messages[0],
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
    };

    return (
        <div>
            <div className="flex justify-center text-xl py-4">Locations</div>
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
                                <span className="font-bold text-lg">
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
                                <div className="grid grid-cols-2">
                                    <div>
                                        <span className="text-sm text-gray-800 font-bold">
                                            State : &nbsp;&nbsp;&nbsp;
                                        </span>
                                        {item.state}
                                    </div>{" "}
                                    <div>
                                        <span className="text-sm text-gray-800 font-bold">
                                            Pincode : &nbsp;&nbsp;&nbsp;
                                        </span>
                                        {item.pincode}
                                    </div>{" "}
                                    <div>
                                        <span className="text-sm text-gray-800 font-bold">
                                            Latitude : &nbsp;&nbsp;&nbsp;
                                        </span>
                                        {item.loc.lat}
                                    </div>{" "}
                                    <div>
                                        <span className="text-sm text-gray-800 font-bold">
                                            Longitude : &nbsp;&nbsp;&nbsp;
                                        </span>
                                        {item.loc.long}
                                    </div>{" "}
                                    <div>
                                        <span className="text-sm text-green-600 font-bold">
                                            Food : &nbsp;&nbsp;&nbsp;
                                        </span>
                                        {item.food}
                                    </div>{" "}
                                    <div>
                                        <span className="text-sm text-green-600 font-bold">
                                            Shelter : &nbsp;&nbsp;&nbsp;
                                        </span>
                                        {item.shelter}
                                    </div>{" "}
                                    <div>
                                        <span className="text-sm text-green-600 font-bold">
                                            Medical Staff : &nbsp;&nbsp;&nbsp;
                                        </span>
                                        {item.medicalStaff}
                                    </div>{" "}
                                </div>
                                <div>
                                    <div>
                                        <span className="text-sm text-green-600 font-bold">
                                            Messages : &nbsp;&nbsp;&nbsp;
                                        </span>
                                        {JSON.stringify(messagesFU["pincode"])}
                                    </div>{" "}
                                    <span
                                        style={{ cursor: "pointer" }}
                                        onClick={() => fetchMessage()}
                                    >
                                        Refresh
                                    </span>
                                    <br />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-center my-2  mx-12">
                                    <input
                                        type="text"
                                        value={message[item._id]}
                                        onChange={(e) =>
                                            setMessage(e.target.value)
                                        }
                                        placeholder="Message..."
                                        className="py-2 px-6 border-2 border-r-0 border-black w-3/4"
                                    />
                                    <span
                                        className="py-2 px-6 bg-blue-600 border-2 border-black border-l-0 text-white hover:bg-blue-700"
                                        style={{ cursor: "pointer" }}
                                        onClick={() =>
                                            handleSubmit(item.pincode, message)
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
