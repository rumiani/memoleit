import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { IoIosLogOut } from "react-icons/io";

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
      <div className="flex flex-row gap-2 items-center">
        <IoIosLogOut className="text-3xl"/>
        <p>Log out</p>
      </div>
    </button>
  );
};

export default LogoutButton;
