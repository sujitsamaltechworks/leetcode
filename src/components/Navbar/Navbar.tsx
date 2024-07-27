import { authModalState } from "@/atoms/authModalAtom";
import Link from "next/link";
import React from "react";
import { useSetRecoilState } from "recoil";

type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = () => {
  const setModalState = useSetRecoilState(authModalState);
  const handleClick = () => {
    setModalState((prev) => ({ ...prev, isOpen: true }));
  };
  return (
    <div className="flex items-center justify-between sm:px-12 p-2 md:px-24">
      <Link href="/" className="flex items-center h-20">
        <img
          src="https://leetcode.com/static/images/LeetCode_logo_rvs.png"
          className="h-16 w-16"
        />
      </Link>
      <div className="flex items-center">
        <button
          className="text-white hover:bg-white hover:text-black rounded-full py-2 px-4 transition ease-in-out delay-100 duration-200"
          onClick={handleClick}
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Navbar;
