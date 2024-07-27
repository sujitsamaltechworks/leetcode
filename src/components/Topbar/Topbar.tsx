import { authModalState } from "@/atoms/authModalAtom";
import { auth } from "@/firebase/firebase";
import Link from "next/link";
import React from "react";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useRouter } from "next/router";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BsList, BsListUl } from "react-icons/bs";

type TopbarProps = {
  problemPage?: boolean;
};

const Topbar: React.FC<TopbarProps> = ({ problemPage }) => {
  const [user] = useAuthState(auth);
  const [signOut, loading, error] = useSignOut(auth);
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await signOut();
      router.push("/auth");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const navigatePrevProblem = () => {
    console.log(router.asPath);
  };

  const navigateNextProblem = () => {
    console.log(router.asPath);
  };
  return (
    <div className="flex items-center justify-between sm:px-12 p-2 md:px-24 bg-[#282828] border-2 border-transparent border-b-[#ffffff24] h-[50px]">
      <Link href="/" className="flex items-center h-20">
        <img
          src="https://leetcode.com/static/images/LeetCode_logo_rvs.png"
          className="h-8 w-8"
        />
      </Link>
      {problemPage && (
        <div className="flex items-center gap-4 flex-1 justify-center">
          <div className="flex items-center text-[#f5f5f5] justify-center rounded h-8 w-8 cursor-pointer hover:border-2 hover:border-gray-500">
            <FaChevronLeft onClick={navigatePrevProblem} />
          </div>
          <Link
            href={"/"}
            className="flex items-center gap-1 max-w-[170px] text-[#f5f5f5]"
          >
            <BsListUl />
            <div>Problems List</div>
          </Link>
          <div className="flex items-center justify-center text-[#f5f5f5] rounded h-8 w-8 cursor-pointer hover:border-2 hover:border-gray-500">
            <FaChevronRight onClick={navigateNextProblem} />
          </div>
        </div>
      )}
      <div>
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger className="text-white">
              {loading ? "Logging out" : user?.email}
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem onClick={handleLogout}>Logout</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Profile Settings</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
    </div>
  );
};

export default Topbar;
