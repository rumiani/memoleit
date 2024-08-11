import LogoutButton from "@/src/components/auth/signOut/signOut";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import ProfileImage from "./profileImage/profileImage";
import Superpages from "./superpages/superpages";
import { usePathname, useRouter } from "next/navigation";

export default function UserOptions() {
  const { data: session } = useSession();
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const modelRef = useRef<HTMLDivElement>(null);
  const path = usePathname();
console.log(session);

  useEffect(() => {
    setShowOptions(false);
    const handleOutsideClick = (event: MouseEvent) => {
      if (!modelRef.current?.contains(event.target as Node)) {
        setShowOptions(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [setShowOptions, path]);

  if (!session) return <></>;
  return (
    <>
      {showOptions ? (
        <div
          ref={modelRef}
          className="fixed top-10 right-8 rounded-md bg-white shadow-lg flex flex-col "
        >
          <div className="flex flex-row justify-center items-center gap-2 p-4">
            <ProfileImage session={session} />
            <p className="text-black ">{session?.user?.name}</p>
          </div>
          <div className=" text-gray-800 flex flex-col">
            <Superpages />
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
