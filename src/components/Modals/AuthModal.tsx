import * as React from "react";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import Login from "./Login";
import Register from "./Register";
import ResetPassword from "./ResetPassword";
import { useRecoilValue } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";

type AuthModalProps = {};

const AuthModal: React.FC<AuthModalProps> = () => {
  const authModal = useRecoilValue(authModalState);
  return (
    <Card className="w-[400px] h-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      {authModal.type == "login" ? (
        <Login />
      ) : authModal.type == "register" ? (
        <Register />
      ) : (
        <ResetPassword />
      )}
    </Card>
  );
};

export default AuthModal;
