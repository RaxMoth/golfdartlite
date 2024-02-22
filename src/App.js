import React from "react";
import "./App.css";
import DartBoardTracker from "./DartboardTracker";

function App() {
    const trackers = [{ name: "Lörres" }, { name: "Max" }, { name: "Eumel" }];

    return (
        <div className="App min-h-screen bg-gray-100 flex flex-col justify-between">
            <header className="bg-blue-600 text-white text-3xl  text-center">
                DOPPEL4
            </header>
            <main className="flex-1">
                <div
                    className={`flex flex-wrap ${
                        trackers.length === 2
                            ? "justify-between"
                            : "justify-center"
                    } items-start mx-auto max-w-7xl`}
                >
                    {trackers.map((tracker) => (
                        <DartBoardTracker
                            key={tracker.name}
                            name={tracker.name}
                        />
                    ))}
                </div>
            </main>
            <footer className="bg-gray-800 text-white text-center p-4">
                © {new Date().getFullYear()} Junge Scheppert richtig.
            </footer>
        </div>
    );
}

export default App;
