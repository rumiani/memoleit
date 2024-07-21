"use client";
import React, { useEffect } from "react";
import Head from "next/head";
import { useSession } from "next-auth/react";
import LoginBtn from "@/src/components/general/layouts/generalLayout/header/loginBtn/loginBtn";
import Login from "@/src/components/auth/logIn/login";
export default function Page() {
  const { data: session } = useSession();
  useEffect(() => {
    console.log(session);
  }, [session]);
  // if (session) redirect("/dashboard/review");
  return (
    <>
      <Head>
        <link rel="icon" href="/assets/favicon.ico" />
        <title>MemoLeit</title>
        <meta name="author" content="Maziar Rumiani" />
        <meta
          name="keywords"
          content="MemoLeit, memory, learn, learn english"
        />
        <meta
          name="description"
          content="Memorise everything in an efficent way ..."
        />
      </Head>
      <section className="h-screen">
        <div>
          {!session ? (
            <Login />
          ) : (
            <div>
              <p>
                Welcome, {session.user?.name}, this is your email:{" "}
                {session.user?.email}
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
