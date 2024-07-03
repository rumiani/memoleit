"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import loginPic from "@/public/assets/images/login/login.svg";
import ImgHoverZoom from "@/src/components/general/imgHoverZoom/imgHoverZoom";
import googleLogo from "@/public/assets/images/login/googleLogo.png";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/firebase/firebaseConfig";
import { signInWithGoogle } from "@/firebase/firebaseAuth";
import { saveUserData } from "@/firebase/firestore";

export default function Login() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      console.log("signed In");
      setTimeout(() => {
        redirect("/dashboard/review");
      }, 10000);
    } else {
      console.log("signed Out");
    }
  }, [session]);

  return (
    <section className="my-12 flex flex-col-reverse sm:flex-row ">
      <div className="my-8 h-auto w-full lg:w-1/2">
        <ImgHoverZoom src={loginPic} alt="Phone image" className="h-full" />
      </div>
      <div className="mx-auto my-8">
        <h2 className="font-bold text-center">Log in</h2>
        <button
          onClick={() => signIn("google")}
          title="Log in with Google"
          className="my-8 cursor-pointer text-gray-600 hover:text-gray-800 transition-all duration-300 hover:scale-105 shadow-lg shadow-gray-300 rounded-lg flex flex-row w-60 h-10 mx-auto text-center"
        >
          <Image
            alt="Google logo"
            src={googleLogo}
            width={32}
            className="mx-2 h-9"
          />
          <h3 className="w-52 h-full pt-2 rounded-e-lg text-white bg-blue-400 hover:bg-blue-500 text-center font-semibold">
            Sigin in with Google
          </h3>
        </button>
      </div>
    </section>
  );
}
