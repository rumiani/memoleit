"use client";
import React, { useEffect } from "react";
import Head from "next/head";
import Login from "../../components/auth/logIn/login";
import { useSession } from "next-auth/react";
import LogoutButton from "@/src/components/auth/signOut/signOut";
export default function Page() {
  const { data: session } = useSession();
  useEffect(() => {
    console.log(session);
  }, [session]);
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
      <section>
        {/* <div className="g-6 flex flex-row h-full items-center justify-center lg:justify-between">
          <Login />
        </div> */}
        <div>
          {!session ? (
            <Login />
          ) : (
            <div>
              <p>
                Welcome, {session.user?.name}, this is your email:{" "}
                {session.user?.email}
              </p>
              <LogoutButton />
            </div>
          )}
        </div>
      </section>
    </>
  );
}
