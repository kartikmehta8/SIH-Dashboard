// import MapContainer from "./Map.js";
// import ReactGoogleMaps from "./Map.js";
import Messages from "./Messages";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
    const [data, setData] = useState();

    useEffect(() => {
        axios
            .get("https://earlysuraksha.herokuapp.com/api/es/getAllDanger")
            .then((data) => {
                setData(data.data);
            });
    }, []);

    if (!data) setData([{}]);

    return (
        <div className="mb-2">
            <div className="flex justify-end py-4 px-6 bg-blue-600 text-white poppins">
                Dashboard
            </div>
            <div
                className="grid grid-cols-1 gap-4 px-24"
                // style={{ height: "100vh" }}
            >
                <div>
                    <div className="flex justify-center my-10 sans">
                        <input
                            type="text"
                            placeholder="Search Here"
                            className="py-4 px-6 w-3/4 shadow-xl rounded-l-xl"
                        />
                        <span
                            className="py-4 px-6 bg-blue-600 border-2 rounded-r-xl shadow-xl  text-white hover:bg-blue-700"
                            style={{ cursor: "pointer" }}
                        >
                            Search
                        </span>
                    </div>
                    <div>{/* <ReactGoogleMaps /> */}</div>
                </div>
                <div>
                    <Messages data={data} />
                </div>
            </div>
            {/* <div
                className="grid grid-cols-4 py-4 bg-blue-600 text-white"
                style={{ textAlign: "center" }}
            >
                <div>Location</div>
                <div>Active Cases</div>
                <div>Food</div>
                <div>Shelter</div>
            </div> */}
        </div>
    );
}

export default App;
