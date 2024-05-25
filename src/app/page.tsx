"use client";
import { useSession } from "next-auth/react";
import MainPage from "../components/home/mainPage";
import LogoutButton from "../components/auth/signOut/signOut";
import Login from "../components/auth/logIn/login";
import { useEffect } from "react";

export default function Home() {
  const { data: session } = useSession();
  useEffect(()=>{
    
    // console.log(process.env);

  },[])
  return (
    <div className="flex min-h-screen flex-col items-center justify-between">
      {/* <div>
      {!session ? (
        <Login />
      ) : (
        <div>
          <p>Welcome, {session.user?.name}</p>
          <LogoutButton />
        </div>
      )}
    </div> */}
      <MainPage />
    </div>
  );
}
