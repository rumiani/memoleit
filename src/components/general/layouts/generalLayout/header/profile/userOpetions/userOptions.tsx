import LogoutButton from "@/src/components/auth/signOut/signOut";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import ProfileImage from "./profileImage/profileImage";
import { IoMdSettings } from "react-icons/io";
import Link from "next/link";
import { MdHome } from "react-icons/md";

export default function UserOptions() {
  const { data: session } = useSession();
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const modelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (modelRef.current && !modelRef.current.contains(event.target as Node))
        setShowOptions(false);
    };
    if (showOptions) document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showOptions, setShowOptions]);

  if (!session) return <></>;
  return (
    <>
      {showOptions ? (
        <div
          ref={modelRef}
          className="fixed top-10 right-8 rounded-md bg-white shadow-md flex flex-col "
        >
          <div className="flex flex-row justify-center items-center gap-2 p-2">
            <ProfileImage session={session} />
            <p className="text-black ">{session?.user?.name}</p>
          </div>
          <div className="bg-gray-100 text-gray-800 flex flex-col gap-2 p-2">
            <Link
            href="/"
            className=" flex flex-row gap-2 items-center"
            >
              <MdHome className="text-3xl"/>
              <strong className="w-full text-center">Home</strong>
            </Link>
            <Link
              href="/user/settings"
              className=" flex flex-row gap-2 items-center"
            >
              <IoMdSettings className="text-3xl" />
              <strong className="w-full text-center">Settings</strong>
            </Link>
            <LogoutButton />
          </div>
        </div>
      ) : (
        <button onClick={() => setShowOptions(!showOptions)}>
          <ProfileImage session={session} />
        </button>
      )}
    </>
  );
}
