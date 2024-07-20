import React from "react";
import { CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { IoClose } from "react-icons/io5";
import useCloseModal from "@/customHooks/useCloseModal";

type ResetPasswordProps = {};

const ResetPassword: React.FC<ResetPasswordProps> = () => {
  const closeModal = useCloseModal();
  return (
    <>
      <CardHeader className="flex-row justify-between items-center">
        <CardTitle className="">Reset Password</CardTitle>
        <div
          className="text-white text-3xl cursor-pointer"
          onClick={closeModal}
        >
          <IoClose />
        </div>
      </CardHeader>
      <CardContent>
        <div>
          Forgotten your password? Enter your e-mail address below, and we'll
          send you an e-mail allowing you to reset it.
        </div>
        <form>
          <div className="grid w-full items-center gap-6 mt-[32px]">
            <div className="flex flex-col space-y-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email id"
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col">
        <Button
          className="mt-[16px]"
          style={{ width: "-webkit-fill-available" }}
        >
          Reset Password
        </Button>
      </CardFooter>
    </>
  );
};

export default ResetPassword;
