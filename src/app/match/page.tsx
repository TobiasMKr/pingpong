"use client";
import { useState } from "react";

export default function MatchPage() {
    const [userElo, setUserElo] = useState<number>(0);
    const [opponentElo, setOpponentElo] = useState<number>(0);
    const [userProbability, setUserProbability] = useState<number>(0);
    const [opponentProbability, setOpponentProbability] = useState<number>(0);
    const [newElo, setNewElo] = useState<number>(0);
    const [newOpponentElo, setNewOpponentElo] = useState<number>(0);

    function calculateEloChange(userElo: number, opponentElo: number, userWin: boolean): number {
        const k = 32;
        const expectedScore = 1 / (1 + Math.pow(10, (opponentElo - userElo) / 400));
        const actualScore = userWin ? 1 : 0;
        return k * (actualScore - expectedScore);
    }

    function calculateProbability(): [number, number] {
        console.log(userElo, opponentElo);
        let probability1 = 1 / (1 + Math.pow(10, (opponentElo - userElo) / 400));
        let probability2 = 1 - probability1;
        return [probability1, probability2];
    }

    function calculateScore() {
        let probabilities = calculateProbability();
        const userEloChange = calculateEloChange(userElo, opponentElo, true); // Assuming user wins
        const opponentEloChange = calculateEloChange(opponentElo, userElo, false); // Opponent loses
        setUserProbability(probabilities[0]);
        setOpponentProbability(probabilities[1]);
        setNewElo(userElo + userEloChange);
        setNewOpponentElo(opponentElo + opponentEloChange);
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <h1 className="text-4xl font-bold text-blue-600 mb-6">Ping Pong Match</h1>
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">
                    Elo Ratings
                </h2>
                <p className="text-gray-600 mb-4">
                    {userElo} vs {opponentElo}
                </p>
                <p className="text-gray-600 mb-4">
                    Probability: {userProbability.toFixed(2)} vs {opponentProbability.toFixed(2)}
                </p>
                <p className="text-gray-600 mb-4">
                    New Elo: {Math.round(newElo)} vs {Math.round(newOpponentElo)}
                </p>
                <div className="space-y-4">
                    <input
                        type="number"
                        placeholder="Your Elo"
                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => {
                            const newElo = parseInt(e.target.value);
                            setUserElo(newElo);
                        }}
                    />
                    <input
                        type="number"
                        placeholder="Opponent Elo"
                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => {
                            const newElo = parseInt(e.target.value);
                            setOpponentElo(newElo);
                        }}
                    />
                    <button
                        className="w-full bg-blue-500 text-white rounded-lg p-2 hover:bg-blue-600 transition"
                        onClick={() => {
                            calculateScore();
                        }}
                    >
                        Calculate
                    </button>
                </div>
            </div>
        </div>
    );
}