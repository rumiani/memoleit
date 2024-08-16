"use client";
import Image from "next/image";
import { useEffect } from "react";
import loginPic from "@/public/assets/images/login/login.svg";
import ImgHoverZoom from "@/src/components/general/imgHoverZoom/imgHoverZoom";
import googleLogo from "@/public/assets/images/login/googleLogo.png";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { AiFillGithub } from "react-icons/ai";
export default function Login() {
  // const { data: session, status } = useSession();

  // useEffect(() => {
  //   // console.log(status);

  //   if (session) {
  //     console.log("-------------signed In-----------");
  //     redirect("/user/dashboard/review");
  //   } else {
  //     console.log("signed Out");
  //   }
  // }, [session, status]);

  return (
    <section className="  my-12 flex flex-col-reverse sm:flex-row ">
      <div className="my-8 h-auto w-full lg:w-1/2">
        <ImgHoverZoom src={loginPic} alt="Phone image" className="h-full" />
      </div>
      <div className="mx-auto my-8 px-8">
        <h2 className="font-bold text-center">Login</h2>
        <button
          onClick={() => signIn("google")}
          title="Log in with Google"
          className="group my-8 cursor-pointer text-gray-600 hover:text-gray-800 transition-all duration-300 shadow-lg shadow-gray-300 rounded-lg flex flex-row justify-center items-center w-60 h-10 mx-auto text-center"
        >
          <Image
            alt="Google logo"
            src={googleLogo}
            width={32}
            height={32}
            className="mx-2 w-8 h-8"
          />
          <h3 className="w-52 h-full pt-2 rounded-e-lg text-white bg-blue-400 group-hover:bg-blue-500 text-center font-semibold">
            Sign in with Google
          </h3>
        </button>
        <button
          onClick={() => signIn("github")}
          title="Log in with Github"
          className="group my-8 cursor-pointer text-gray-600 hover:text-gray-800 transition-all duration-300 shadow-lg shadow-gray-300 rounded-lg flex flex-row justify-center items-center w-60 h-10 mx-auto text-center"
        >
          <AiFillGithub className="mx-2 w-8 h-8" />
          <h3 className="w-52 h-full pt-2 rounded-e-lg text-white bg-gray-700 group-hover:bg-gray-900 text-center font-semibold">
            Sign in with Github
          </h3>
        </button>
      </div>
    </section>
  );
}
