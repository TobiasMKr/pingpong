"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext"; // Use AuthContext

const SignInPage = () => {
    const router = useRouter();
    const { login } = useAuth(); // Get login function from context
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async () => {
        setError(""); // Clear previous errors
        try {
            await login(email, password); // Call login from context
            router.push("/match"); // Redirect to account page
        } catch (error: any) {
            setError(error.message); // Set error message
        }
    };

    return (
        <div className="flex justify-center py-12">
            <div className="max-w-lg w-full bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-6">Logg inn</h1>
                
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email"
                        required
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="password" className="block text-gray-700">Passord</label>
                    <input
                        type="password"
                        id="password"
                        required
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button
                    type="button"
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                    onClick={handleSubmit}
                >
                    Logg inn
                </button>

                <div className="block text-center mt-4">
                    <Link href="/account/signup" className="text-blue-500 hover:text-blue-600 hover:underline">
                        Ny bruker
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignInPage;
