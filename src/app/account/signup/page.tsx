"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext"; // Use AuthContext
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../../lib/firebase";

const SignUpPage = () => {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async () => {
        setError(""); // Clear previous errors

        try {
            // Opprett bruker i Firebase Auth
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Lag bruker-dokument i Firestore
            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                email: user.email,
                createdAt: new Date(),
                role: "user", // legg til flere felter om du ønsker
                elo: 1000, // Standard ELO-verdi
            });

            console.log("User created and profile saved!");
            router.push("/account");
        } catch (error: any) {
            setError(error.message);
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
