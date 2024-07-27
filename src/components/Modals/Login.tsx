"use client";

import React, { useEffect, useState } from "react";
import { CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { IoClose } from "react-icons/io5";
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";
import useCloseModal from "@/customHooks/useCloseModal";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebase";
import { useRouter } from "next/router";
import { useToast } from "../ui/use-toast";

type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const router = useRouter();
  const closeModal = useCloseModal();
  const { toast } = useToast();

  const handleClick = (type: "login" | "register" | "forgotPassword") => {
    setAuthModalState((prev) => ({ ...prev, type: type }));
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const newUser = await signInWithEmailAndPassword(
        inputs.email,
        inputs.password
      );
      if (!newUser) return;
      router.push("/");
      closeModal();
    } catch (error: any) {
      console.log(error.message);
    }
    signInWithEmailAndPassword(inputs.email, inputs.password);
  };

  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.message,
        duration: 5000,
      });
    }
  }, [error]);

  return (
    <>
      <CardHeader className="flex-row justify-between items-center">
        <CardTitle className="">
          Sign In to <span className="text-orange-500">LeetCode</span>
        </CardTitle>
        <div
          className="text-white text-3xl cursor-pointer"
          onClick={closeModal}
        >
          <IoClose />
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin}>
          <div className="grid w-full items-center gap-6">
            <div className="flex flex-col space-y-3">
              <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                id="email"
                type="email"
                placeholder="Enter your email id"
                onChange={handleChangeInput}
                required
              />
            </div>
            <div className="flex flex-col space-y-3">
              <Label htmlFor="password">Password</Label>
              <Input
                name="password"
                id="password"
                type="password"
                placeholder="Enter your password"
                onChange={handleChangeInput}
                required
              />
            </div>
          </div>
          <Button
            className="mt-[16px]"
            style={{ width: "-webkit-fill-available" }}
            type="submit"
          >
            {loading ? "Logging" : "Login"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex-col">
        <Link
          href=""
          className="text-orange-500"
          onClick={() => handleClick("forgotPassword")}
        >
          Forgot Password?
        </Link>
        <div className="mt-[16px]">
          <span>Not Registered ? </span>
          <Link
            href=""
            className="text-orange-500"
            onClick={() => handleClick("register")}
          >
            Create new account
          </Link>
        </div>
      </CardFooter>
    </>
  );
};

export default Login;
