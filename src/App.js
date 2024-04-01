import React, { useState } from "react";
import "./App.css";
import DartBoardTracker from "./DartboardTracker";
import TEXT from "./text.js";

function App() {
    const [players, setPlayers] = useState([
        { id: 1, name: TEXT.NAMES.LÖRRES },
        { id: 2, name: TEXT.NAMES.MAX },
        { id: 3, name: TEXT.NAMES.EUMEL },
    ]);
    const [isSidebarVisible, setIsSidebarVisible] = useState(true); // State to toggle sidebar visibility

    // Handle changing the number of players
    const handlePlayerCountChange = (event) => {
        const count = Number(event.target.value);
        const updatedPlayers = Array.from({ length: count }, (_, index) => {
            // Use existing player names if available, else create new names
            return (
                players[index] || { id: index + 1, name: `Player ${index + 1}` }
            );
        });
        setPlayers(updatedPlayers);
    };

    // Handle player name change
    const handlePlayerNameChange = (id, newName) => {
        const updatedPlayers = players.map((player) =>
            player.id === id ? { ...player, name: newName } : player
        );
        setPlayers(updatedPlayers);
    };

    // Toggle sidebar visibility
    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    return (
        <div className="App min-h-screen bg-gray-100">
            {/* Header across the top */}
            <header className="bg-blue-600 text-white text-3xl text-center relative">
                <button
                    onClick={toggleSidebar}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 px-4 py-2"
                >
                    {isSidebarVisible ? "Hide Sidebar" : "Show Sidebar"}
                </button>
                {TEXT.HEADER_TITLE}
            </header>

            {/* Flex container for sidebar + main content */}
            <div className="flex flex-1 min-h-screen">
                {/* Sidebar for player configuration */}
                {isSidebarVisible && (
                    <aside className="w-64 bg-blue-100 p-4">
                        <div className="mb-4">
                            <label
                                htmlFor="playerCount"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Number of Players
                            </label>
                            <input
                                type="number"
                                id="playerCount"
                                value={players.length}
                                onChange={handlePlayerCountChange}
                                className="mt-1 block w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                min="1" // Minimum of 1 player
                            />
                        </div>
                        {players.map((player, index) => (
                            <div key={player.id} className="mb-4">
                                <label
                                    htmlFor={`playerName-${player.id}`}
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    {`Player ${index + 1} Name`}
                                </label>
                                <input
                                    type="text"
                                    id={`playerName-${player.id}`}
                                    value={player.name}
                                    onChange={(e) =>
                                        handlePlayerNameChange(
                                            player.id,
                                            e.target.value
                                        )
                                    }
                                    className="mt-1 block w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        ))}
                    </aside>
                )}

                {/* Main content area */}
                <main className="flex-1">
                    <div
                        className={`flex flex-wrap ${
                            players.length === 2
                                ? "justify-between"
                                : "justify-center"
                        } items-start mx-auto max-w-7xl`}
                    >
                        {players.map((player) => (
                            <DartBoardTracker
                                key={player.id}
                                name={player.name}
                            />
                        ))}
                    </div>
                </main>
            </div>

            {/* Footer */}
            <footer className="bg-gray-800 text-white text-center p-4">
                {TEXT.FOOTER_COPYRIGHT.replace(
                    "{year}",
                    new Date().getFullYear()
                )}
            </footer>
        </div>
    );
}

export default App;
