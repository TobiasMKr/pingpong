"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "./context/AuthContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase";
import UserCard from "./components/UserCard";
import { Timestamp } from "firebase/firestore";

export default function Home() {
  type UserData = {
    username: string;
    uid: string;
    email: string;
    createdAt: Date;
    role: string;
    elo: number;
  };

  const [users, setUsers] = useState<UserData[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      if (!user?.uid) return;

      const usersDb = await getDocs(collection(db, "users"));
      const usersData = usersDb.docs
        .map((doc) => {
          const data = doc.data();
          return {
            username: data.username,
            uid: data.uid,
            email: data.email,
            createdAt: (data.createdAt as Timestamp)?.toDate?.() || new Date(),
            role: data.role,
            elo: data.elo,
          };
        })
        .filter((userData) => userData.uid !== user.uid); // 👈 ekskluder innlogget bruker

      setUsers(usersData);
    };

    fetchUsers();
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4">
      {users.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {users.map((userData) => (
            <UserCard key={userData.uid} user={userData} />
          ))}
        </div>
      ) : (
        <div className="text-center mt-12">
          <h1 className="text-2xl font-bold mb-4">Ingen brukere funnet</h1>
          <Link href="/account/signup" className="text-blue-500 underline">
            Registrer deg nå!
          </Link>
        </div>
      )}
    </div>
  );
  
}