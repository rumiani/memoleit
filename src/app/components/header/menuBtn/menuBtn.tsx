import React from "react";
import { FiMenu } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
interface menuProps {
  mobileMenu: boolean,
  setMobileMenu:Function
}
const MenuBtn = ({ mobileMenu, setMobileMenu }:menuProps) => {
  return (
    <div
      onClick={() => setMobileMenu(!mobileMenu)}
      className="mt-1 md:hidden cursor-pointer text-xl self-start text-white"
    >
      {mobileMenu ? <AiOutlineClose /> : <FiMenu />}
    </div>
  );
};

export default MenuBtn;
