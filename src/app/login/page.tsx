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
      <section>
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
