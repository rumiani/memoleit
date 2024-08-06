import { Session } from "next-auth";
import Image from "next/image";

export default function ProfileImage({ session }: { session: Session }) {
  return (
    <div>
      <Image
        width={36}
        height={36}
        className="rounded-full"
        src={session.user?.image || "/assets/images/avatar.png"}
        alt={session.user?.name!}
        title={session.user?.name!}
      />
    </div>
  );
}
