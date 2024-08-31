import { Session } from "next-auth";
import Image from "next/image";

export default function ProfileImage({ session }: { session: Session }) {
  return (
    <div className="w-10 h-10 flex items-center justify-center  hover:bg-white hover:bg-opacity-25  rounded-full">
      <Image
        width={32}
        height={32}
        className="rounded-full"
        src={session.user?.image || "/assets/images/avatar.png"}
        alt={session.user?.name!}
        title={session.user?.name!}
      />
    </div>
  );
}
