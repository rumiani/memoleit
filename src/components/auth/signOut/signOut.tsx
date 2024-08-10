import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { MdOutlineLogout } from "react-icons/md";
const LogoutButton = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        signOut();
        router.push("/login");
      }}
      className=" text-red-500 flex flex-row p-2 hover:bg-gray-200"
    >
      <MdOutlineLogout className="text-2xl " />
      <strong className="pl-2">Log out</strong>
    </button>
  );
};

export default LogoutButton;
