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
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import { useRouter } from "next/router";
import { useToast } from "../ui/use-toast";

type RegisterProps = {};

const Register: React.FC<RegisterProps> = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const [inputs, setInputs] = useState({ name: "", email: "", password: "" });
  const router = useRouter();
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const closeModal = useCloseModal();
  const { toast } = useToast();

  const handleClick = (type: "login" | "register" | "forgotPassword") => {
    setAuthModalState((prev) => ({ ...prev, type: type }));
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const newUser = await createUserWithEmailAndPassword(
        inputs.email,
        inputs.password
      );
      if (!newUser) return;
      router.push("/");
      closeModal();
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.message,
      });
    }
  }, [error]);

  return (
    <>
      <CardHeader className="flex-row justify-between items-center">
        <CardTitle className="">
          <span>Create a new account</span>
        </CardTitle>
        <div
          className="text-white text-3xl cursor-pointer"
          onClick={closeModal}
        >
          <IoClose />
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleRegister}>
          <div className="grid w-full items-center gap-6">
            <div className="flex flex-col space-y-3">
              <Label htmlFor="name">Username</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your username"
                onChange={handleChangeInput}
                required
              />
            </div>
            <div className="flex flex-col space-y-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email id"
                onChange={handleChangeInput}
                required
              />
            </div>

            <div className="flex flex-col space-y-3">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                onChange={handleChangeInput}
                required
              />
            </div>
          </div>
          <Button
            className="mt-[16px]"
            type="submit"
            style={{ width: "-webkit-fill-available" }}
          >
            {loading ? "Registering" : "Register"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex-col">
        <div className="">
          <span>Already have an account ? </span>
          <Link
            href=""
            className="text-orange-500"
            onClick={() => handleClick("login")}
          >
            Login
          </Link>
        </div>
      </CardFooter>
    </>
  );
};

export default Register;
