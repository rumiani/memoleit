import { Session } from "next-auth";
import Image from "next/image";

export default function ProfileImage({ session }: { session: Session }) {
  return (
    <div>
      <Image
        width={28}
        height={28}
        className="rounded-full"
        src={session.user?.image || "/assets/images/avatar.png"}
        alt={session.user?.name!}
        title={session.user?.name!}
      />
    </div>
  );
}
