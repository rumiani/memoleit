'use client'
import React from "react";
import Head from "next/head";
import Login from "../../components/auth/logIn/login";

const Index = () => {
  return (
    <>
      <Head>
        <link rel="icon" href="/assets/favicon.ico" />
        <title>MemoLeit</title>
        <meta name="author" content="Maziar Rumiani" />
        <meta name="keywords" content="MemoLeit, memory, learn, learn english" />
        <meta
          name="description"
          content="Memorise everything in an efficent way ..."
        />
      </Head>
      <section>
        <div className="g-6 flex flex-row h-full items-center justify-center lg:justify-between">
          <Login />
        </div>
      </section>
    </>
  );
};

export default Index;

