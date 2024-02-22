import React, { useState, useEffect } from "react";

const dartNumbers = Array.from({ length: 21 }, (_, i) => i + 1).map((num) =>
    num <= 20 ? num : "25"
);

const DartBoardTracker = ({ name }) => {
    const [hits, setHits] = useState(
        dartNumbers.reduce((acc, number) => {
            acc[number] = { count: 0, checked: false };
            return acc;
        }, {})
    );

    const [totalHits, setTotalHits] = useState(0);
    const [gameFinished, setGameFinished] = useState(false);

    useEffect(() => {
        // Check if all checkboxes are ticked
        const allChecked = Object.values(hits).every((hit) => hit.checked);
        setGameFinished(allChecked);
    }, [hits]);

    const incrementHit = (number) => {
        setHits((prevHits) => {
            const newCount = prevHits[number].count + 1;
            const newChecked = newCount > 0;
            return {
                ...prevHits,
                [number]: { count: newCount, checked: newChecked },
            };
        });
        setTotalHits((prevTotal) => prevTotal + 1);
    };

    const toggleCheck = (number) => {
        setHits((prevHits) => {
            const newCount = !prevHits[number].checked
                ? prevHits[number].count
                : 0;
            return {
                ...prevHits,
                [number]: {
                    count: newCount,
                    checked: !prevHits[number].checked,
                },
            };
        });
        // Adjust total hits accordingly when unchecking
        if (hits[number].checked) {
            setTotalHits((prevTotal) => prevTotal - hits[number].count);
        }
    };

    return (
        <div className="w-full lg:w-1/2 xl:w-1/3 bg-white border p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center mb-4">{name}</h2>
            <p className="text-center mb-4 font-medium">Punkte: {totalHits}</p>
            {dartNumbers.map((number) => (
                <div
                    key={number}
                    className="flex items-center justify-between mb-2"
                >
                    <span className="text-lg font-semibold">
                        {number === "" ? "Bullseye (25)" : number}
                    </span>
                    <button
                        onClick={() => incrementHit(number)}
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out"
                    >
                        Hit {hits[number].count}
                    </button>
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            checked={hits[number].checked}
                            onChange={() => toggleCheck(number)}
                            className="form-checkbox h-5 w-5 text-blue-600 transition duration-150 ease-in-out ml-4"
                        />
                    </label>
                </div>
            ))}
            {gameFinished && (
                <div className="text-center mt-4 font-bold">
                    {name} machte das Ding dicht mit {totalHits} Punkten 🎉
                </div>
            )}
        </div>
    );
};

export default DartBoardTracker;
