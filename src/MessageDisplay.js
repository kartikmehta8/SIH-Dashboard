import React, { useEffect, useState } from "react";
import axios from "axios";

export const MessageDisplay = ({ pin }) => {
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        axios
            .post(
                "https://earlysuraksha.herokuapp.com/api/es/MessagesFromUsers",
                {
                    pin: pin,
                }
            )
            .then((response) => {
                setMessages(response.data.messages);
            });
    }, [pin]);
    return (
        <div>
            {messages.map((message) => (
                <div className="ml-8 border-gray-600 w-full border-l-2 pl-4 border-b-2 py-2 text-md text-gray-800 sans">
                    {message}
                    <br />
                </div>
            ))}
        </div>
    );
};
