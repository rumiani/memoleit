import LogoutButton from "@/src/components/auth/signOut/signOut";
import { useSession } from "next-auth/react";
import React from "react";

export default function UserOptions() {
  const { data: session } = useSession();
  return (
    <div className="flex flex-col mt-4">
      <strong>User</strong>
      <div className="flex flex-row justify-between pl-2">
        <p>{session?.user?.name}</p>
        <LogoutButton />
      </div>
    </div>
  );
}
