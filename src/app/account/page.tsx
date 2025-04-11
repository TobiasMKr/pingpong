"use client";
import { useEffect, useState } from "react";
import { db } from "../../../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

export default function Account() {
  const { user } = useAuth();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.uid) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  if (!user || loading) return <div>Loading...</div>;

  return (
    <div className="flex justify-center py-12">
      <div className="max-w-lg w-full bg-white p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-xl font-bold mb-4">Brukerprofil</h2>
        {userData ? (
          <>
            <p>Navn: {userData.username}</p>
            <p>Email: {userData.email}</p>
            <p>ELO: {Math.round(userData.elo)}</p>
          </>
        ) : (
          <p>Data not available</p>
        )}
      </div>
    </div>
  );
}