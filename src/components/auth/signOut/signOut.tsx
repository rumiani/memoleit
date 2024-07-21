import { signOut } from "next-auth/react";

const LogoutButton = () => {

  return (
    <button onClick={() => signOut()} className="text-red-500">
      Log out
    </button>
  );
};

export default LogoutButton;
