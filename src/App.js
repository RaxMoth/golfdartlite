import React, { useState, useRef } from "react";
import "./App.css";
import DartBoardTracker from "./DartboardTracker";
import TEXT from "./text.js";
import YouTube from "react-youtube";

function App() {
    const playerRef = useRef(null);

    const handlePlayAudioSegment = () => {
        if (playerRef.current) {
            const player = playerRef.current.internalPlayer;
            player.seekTo(12, true);
            player.playVideo();
            setTimeout(() => {
                player.pauseVideo();
            }, (20 - 12) * 1000);
        }
    };

    const opts = {
        height: "0", // Hides the visual player
        width: "0",
        playerVars: {
            autoplay: 0,
            controls: 0,
            rel: 0,
            modestbranding: 1,
            showinfo: 0,
        },
    };

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
                <div className="relative">
                    <div>
                        <YouTube
                            videoId="yp-3HWjBMBA" // Replace with your YouTube video ID
                            opts={{
                                height: "0",
                                width: "0",
                                playerVars: {
                                    autoplay: 0,
                                    controls: 0,
                                    rel: 0,
                                    modestbranding: 1,
                                },
                            }}
                            ref={playerRef}
                        />
                    </div>
                    {isSidebarVisible && (
                        <button
                            onClick={handlePlayAudioSegment}
                            className="absolute mt-4 px-4 py-2 bg-blue-500  top-4 right-4 border text-white rounded-lg hover:bg-blue-400 focus:ring-2 focus:ring-blue-300"
                        >
                            Play Audio
                        </button>
                    )}
                </div>
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
