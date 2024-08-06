"use client";
import { useEffect } from "react";
import Head from "next/head";
import { useSession } from "next-auth/react";
import Login from "@/src/components/auth/logIn/login";
import { redirect } from "next/navigation";

export default function Page() {
  const { data: session } = useSession();
  useEffect(() => {
    console.log(session);
    if (session) redirect("/user/dashboard/review");
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
      <section className="h-screen">
        <Login />
      </section>
    </>
  );
}
