import React, { MouseEventHandler } from "react";
import Image from "next/image";
interface avatarProps {
  userMenuHandler: MouseEventHandler<HTMLDivElement>;
  url: string;
}
const UserAvatar = ({ userMenuHandler, url }: avatarProps) => {
  return (
    <div onClick={userMenuHandler} className="w-7 h-7 md:cursor-pointer">
      <Image
        width={42}
        height={42}
        src={url || "/assets/images/avatar.png"}
        alt="profile"
      />
    </div>
  );
};

export default UserAvatar;
