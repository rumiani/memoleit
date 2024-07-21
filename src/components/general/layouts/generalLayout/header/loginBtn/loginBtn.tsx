import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const LoginBtn = () => {
  const { data: session } = useSession();

  return (
    <div className="text-white flex">
      {session ? (
        <p>Hi, {session.user?.name?.split(" ")[0]}</p>
      ) : (
        <Link href="/login" className="text-gray-100">
          Log in
        </Link>
      )}
    </div>
  );
};

export default LoginBtn;
