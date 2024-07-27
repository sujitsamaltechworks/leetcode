import { authModalState } from "@/atoms/authModalAtom";
import AuthModal from "@/components/Modals/AuthModal";
import Navbar from "@/components/Navbar/Navbar";
import { auth } from "@/firebase/firebase";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState, useRecoilValue } from "recoil";

type AuthPageProps = {};

const AuthPage: React.FC<AuthPageProps> = () => {
  const authModal = useRecoilValue(authModalState);
  const [user, loading, error] = useAuthState(auth);

  const [pageLoading, setPageLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    if (user) router.push("/");
    if (!loading && !user) setPageLoading(false);
  }, [user, router, loading]);

  if (pageLoading) return null;

  return (
    <div className="bg-gradient-to-b from-gray-700 to-black h-screen">
      <div className="max-w-8xl mx-auto">
        <Navbar />
        <div className="flex items-center justify-around px-48 pt-24 pointer-events-none select-none">
          <img
            src="https://group6inc.com/wp-content/uploads/2021/03/review-reputation-management.png"
            className="h-96 w-100 -rotate-12"
          />
          <div className="px-6 w-96 text-center">
            <div className="text-white text-4xl font-bold mb-4">
              A new way to Learn
            </div>
            <div className="text-gray-400">
              LeetCode is the best platform to help you enhance your skills,
              expand your knowledge and prepare for technical interviews.
            </div>
          </div>
        </div>
        {authModal.isOpen && <AuthModal />}
      </div>
    </div>
  );
};

export default AuthPage;
