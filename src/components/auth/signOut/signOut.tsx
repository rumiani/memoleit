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
      className="w-full text-red-500 flex flex-row gap-2 items-center"
    >
      <MdOutlineLogout className="text-3xl " />
      <strong className="w-full text-center">Log out</strong>
    </button>
  );
};

export default LogoutButton;
