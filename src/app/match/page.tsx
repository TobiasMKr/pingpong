"use client";
import { useEffect } from "react";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { useRouter } from "next/navigation";

export default function MatchPage() {
    const [userProbability, setUserProbability] = useState<number>(0);
    const [opponentProbability, setOpponentProbability] = useState<number>(0);
    const [winEloChange, setWinEloChange] = useState<number>(0);
    const [loseEloChange, setLoseEloChange] = useState<number>(0);
    const [opponentWinChange, setOpponentWinChange] = useState<number>(0);
    const [opponentLoseChange, setOpponentLoseChange] = useState<number>(0);
    const { user } = useAuth();
    const [userData, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();


    const searchParams = useSearchParams();

    const opponentUid = searchParams.get("uid");
    const opponentElo = searchParams.get("elo");
    const opponentUsername = searchParams.get("username");

    useEffect(() => {
        const fetchAndCalculate = async () => {
            if (!user?.uid || !opponentElo) return;

            // 1. Fetch current user data from Firestore
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);

            if (!docSnap.exists()) return;

            const data = docSnap.data();
            setUserData(data); // Needed for display later

            // 2. Parse opponent ELO and user's current ELO
            const userElo = data.elo;
            const opponentEloNumber = parseInt(opponentElo, 10);

            // 3. Calculate probabilities
            const userWinProb = 1 / (1 + Math.pow(10, (opponentEloNumber - userElo) / 400));
            const opponentWinProb = 1 - userWinProb;

            setUserProbability(userWinProb);
            setOpponentProbability(opponentWinProb);

            // 4. Calculate ELO changes
            const winElo = calculateEloChange(userElo, opponentEloNumber, true);
            const loseElo = calculateEloChange(userElo, opponentEloNumber, false);
            const opponentLoses = calculateEloChange(opponentEloNumber, userElo, false);
            const opponentWins = calculateEloChange(opponentEloNumber, userElo, true);

            setWinEloChange(winElo);        // What the user gains if they win
            setLoseEloChange(loseElo);      // What the user loses if they lose
            setOpponentWinChange(opponentWins); // you can create another state
            setOpponentLoseChange(opponentLoses);


            // 5. Done loading
            setLoading(false);
        };

        fetchAndCalculate();
    }, [user, opponentElo]);


    function calculateEloChange(playerElo: number, opponentElo: number, didWin: boolean): number {
        const k = 32;
        const expectedScore = 1 / (1 + Math.pow(10, (opponentElo - playerElo) / 400));
        const actualScore = didWin ? 1 : 0;
        return Math.round(k * (actualScore - expectedScore));
    }

    async function userWon() {
        const userRef = doc(db, "users", userData.uid);
        const opponentRef = doc(db, "users", opponentUid ?? "");

        const newUserElo = userData.elo + winEloChange;
        const opponentNewElo = (opponentElo ? parseInt(opponentElo, 10) : 0) - winEloChange;

        try {
            await updateDoc(userRef, { elo: newUserElo });
            await updateDoc(opponentRef, { elo: opponentNewElo });

            alert("ELO updated! ✅");
            router.push("/")
        } catch (error) {
            console.error("Failed to update ELO:", error);
            alert("Noe gikk galt med å oppdatere ELO.");
        }
    }

    async function opponentWon() {
        const userRef = doc(db, "users", userData.uid);
        const opponentRef = doc(db, "users", opponentUid ?? "");

        const newUserElo = userData.elo - loseEloChange;
        const opponentNewElo = (opponentElo ? parseInt(opponentElo, 10) : 0) + loseEloChange;

        try {
            await updateDoc(userRef, { elo: newUserElo });
            await updateDoc(opponentRef, { elo: opponentNewElo });

            alert("ELO updated! ✅");
            router.push("/")
        } catch (error) {
            console.error("Failed to update ELO:", error);
            alert("Noe gikk galt med å oppdatere ELO.");
        }
    }



    if (!userData) return <div>Loading...</div>;
    return (
        <>
            <div className="flex justify-center py-12">
                <div className="max-w-lg w-full bg-white p-6 rounded-lg shadow-md mt-6">
                    <h2 className="text-xl font-bold mb-4">Match</h2>
                    <>
                        <p>Opponent: {opponentUsername}</p>
                        <p>Your ELO: {Math.round(userData.elo)}</p>
                        <p>Opponent ELO: {opponentElo ? Math.round(parseInt(opponentElo, 10)) : "N/A"}</p>
                        <p>Your Probability of Winning: {(userProbability * 100).toFixed(2)}%</p>
                        <p>Opponent Probability of Winning: {(opponentProbability * 100).toFixed(2)}%</p>
                        <p>Win ELO change: {Math.round(winEloChange)}</p>
                        <p>Lose ELO change: {Math.round(loseEloChange)}</p>
                    </>
                    <h2 className="text-lg font-semibold mb-2">Who won?</h2>
                    <button onClick={userWon} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                        {userData.username}
                    </button>
                    <button onClick={opponentWon} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ml-4">
                        {opponentUsername}
                    </button>
                </div>
            </div>
        </>
    );
}