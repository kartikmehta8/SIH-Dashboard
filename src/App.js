// import MapContainer from "./Map.js";
import ReactGoogleMaps from "./Map.js";
import Messages from "./Messages";

function App() {
    return (
        <div>
            <div className="flex justify-end py-4 px-6 bg-blue-600 text-white">
                Dashboard
            </div>
            <div className="grid grid-cols-2 gap-4" style={{ height: "100vh" }}>
                <div>
                    <div className="flex justify-center my-10">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="py-4 px-6 border-2 border-r-0 border-black"
                        />
                        <span
                            className="py-4 px-6 bg-blue-600 border-2 border-black border-l-0 text-white hover:bg-blue-700"
                            style={{ cursor: "pointer" }}
                        >
                            Search
                        </span>
                    </div>
                    <div>
                        <ReactGoogleMaps />
                    </div>
                </div>
                <div>
                    <Messages />
                </div>
            </div>
            <div
                className="grid grid-cols-4 py-4 bg-blue-600 text-white"
                style={{ textAlign: "center" }}
            >
                <div>Location</div>
                <div>Active Cases</div>
                <div>Food</div>
                <div>Shelter</div>
            </div>
        </div>
    );
}

export default App;
