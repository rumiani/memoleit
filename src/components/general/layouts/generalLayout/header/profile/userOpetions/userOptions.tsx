import LogoutButton from "@/src/components/auth/signOut/signOut";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import ProfileImage from "./profileImage/profileImage";
import { IoMdSettings } from "react-icons/io";
import Link from "next/link";
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
    <div className="flex flex-col mt-4">
      {showOptions ? (
        <div
          ref={modelRef}
          className="fixed top-16 right-8 rounded-md bg-white shadow-md p-2 flex flex-col gap-4"
        >
          <div className="flex flex-row justify-center items-end gap-2">
            <ProfileImage session={session} />
            <p className="text-black ">{session?.user?.name}</p>
          </div>
          <Link href="/user/settings" className="text-gray-800 flex flex-row gap-2 items-center">
            <IoMdSettings className="text-2xl" />
            <strong>Settings</strong>
          </Link>
          <LogoutButton />
        </div>
      ) : (
        <button onClick={() => setShowOptions(!showOptions)}>
          <ProfileImage session={session} />
        </button>
      )}
    </div>
  );
}
