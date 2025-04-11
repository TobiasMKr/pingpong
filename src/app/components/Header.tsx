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
        <nav className="flex items-center justify-between py-4 px-10 bg-blue-400 text-white">
            <div className="flex items-center">
                <Link href="/" className="text-4xl font-bold ml-7">
                    Ping Pong
                </Link>
            </div>
            <div>
                {user ? (
                    <div>
                        <Link href="/account" className="ml-10">
                            Profil
                        </Link>
                        <button 
                            onClick={handleLogout} 
                            className="ml-10 hover:cursor-pointer">
                            Logg ut
                        </button>
                    </div>
                ) : !isAuthPage && (
                    <Link href="/signin">
                        Logg inn
                    </Link>
                )}
            </div>
        </nav>
    );
}