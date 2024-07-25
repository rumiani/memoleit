import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        signOut();
        router.push("/login");
      }}
      className="text-red-500"
    >
      Log out
    </button>
  );
};

export default LogoutButton;
