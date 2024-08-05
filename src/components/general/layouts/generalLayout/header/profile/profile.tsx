import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import UserOptions from "./userOpetions/userOptions";

const LoginBtn = () => {
  const { data: session } = useSession();
console.log(session?.user?.image);

  return (
    <div className="text-white flex my-4 sm:ml-8 sm:my-0 sm:mx-4">
      {session ? (
        <UserOptions/>
      ) : (
        <Link href="/login" className="text-green-400">
          Login
        </Link>
      )}
    </div>
  );
};

export default LoginBtn;
