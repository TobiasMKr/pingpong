"use client";
import {useRouter} from "next/navigation";

export default function UserCard({ user }: { user: any }) {
    const router = useRouter();

    const handleSubmit = () => {
        router.push(`/match?uid=${user.uid}&elo=${user.elo}&username=${user.username}`);
        
    }

    return (
        <div className="flex justify-center py-12">
            <div className="max-w-lg w-full bg-white p-6 rounded-lg shadow-md mt-6">
                {user ? (
                    <>
                        <h2 className="text-xl font-bold mb-4">{user.username}</h2>
                        <p>ELO: {Math.round(user.elo)}</p>
                    </>
                ) : (
                    <p>Data not available</p>
                )}
                <button type="button" onClick={handleSubmit} className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-800 mt-4">
                    Kamp
                </button>
            </div>
        </div>
    );
}
