"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext"; // Use AuthContext

const SignUpPage = () => {
    const router = useRouter();
    const { signup } = useAuth(); // Get signup function from AuthContext

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async () => {
        setError(""); // Clear previous errors
        try {
            await signup(email, password); // Call signup from AuthContext
            router.push("/match"); // Redirect to account page
        } catch (error: any) {
            setError(error.message); // Set error message
        }
    };

    return (
        <div className="flex justify-center py-12">
            <div className="max-w-lg w-full bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-6">Opprett ny bruker</h1>
                
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email"
                        required
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="password" className="block text-gray-700">Passord</label>
                    <input
                        type="password"
                        id="password"
                        required
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button
                    type="button"
                    className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
                    onClick={handleSubmit}
                >
                    Opprett ny bruker
                </button>

                <div className="block text-center mt-4">
                    <Link href="/account/signin" className="text-green-500 hover:text-green-600 hover:underline">
                        Logg inn
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
