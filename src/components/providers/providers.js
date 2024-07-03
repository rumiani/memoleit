"use client"
import React from "react";
import { SessionProvider } from "next-auth/react";


const NextAuthProvider = (props) => {
  return <SessionProvider>{props.children}</SessionProvider>;
};
export default NextAuthProvider