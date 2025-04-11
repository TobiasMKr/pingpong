"use client";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "../../../lib/firebase";


export default function Header() {
    const { user, logout } = useAuth();
    const pathname = usePathname();
    const router = useRouter();

    const isAuthPage = pathname === "/account/signin" || pathname === "/account/signup";


    const handleLogout = async () => {
        await signOut(auth);
        router.push("/account/signin");
    };

    return (
        <header className="bg-gray-800 text-white p-4">
            <h1 className="text-2xl font-bold">Ping Pong Elo Calculator</h1>
            <nav className="mt-4">
                <ul className="flex space-x-4">
                    <li>
                        <a href="/" className="hover:underline">Home</a>
                    </li>
                    <li>
                        <a href="/match" className="hover:underline">Match</a>
                    </li>
                    <li>
                    {user ? (
                    <div>
                        <Link href="/account" className="ml-10">
                            Profil
                        </Link>
                        <button onClick={handleLogout} className="ml-10">
                            Logg ut
                        </button>
                    </div>
                ) : !isAuthPage && (
                    <Link href="/account/signin">
                        Logg inn
                    </Link>
                )}
                    </li>
                </ul>
            </nav>
        </header>
    );
}