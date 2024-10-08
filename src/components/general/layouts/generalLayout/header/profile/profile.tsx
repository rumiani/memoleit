import { useSession } from "next-auth/react";
import Link from "next/link";
import UserOptions from "./userOpetions/userOptions";

const LoginBtn = () => {
  const { data: session } = useSession();

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
