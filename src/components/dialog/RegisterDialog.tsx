"use client";

import React, { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import InputWithLabel from "@/components/input/InputWithLabel";
import { signUp } from "@/actions/auth.action";
import { Loader } from "lucide-react";

function LoginDialog() {
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [signupData, setSignupData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });

  const isDisabled =
    signupData.username === "" ||
    signupData.firstName === "" ||
    signupData.lastName === "" ||
    signupData.password === "" ||
    signupData.confirmPassword === "";

  const setDefaultData = () => {
    setSignupData({
      username: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
    });
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSigningUp(true);

    try {
      const response = await signUp(signupData);

      if (response.error) {
        return toast.error(response.error);
      }

      if (response.success) {
        setDefaultData();
      }
    } catch (error) {
      return toast.error("An error occurred while signing up.");
    } finally {
      setIsSigningUp(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-8 rounded-full w-fit px-8 bg-transparent border border-neutral-50 text-neutral-50 hover:bg-neutral-100/10 duration-200">
          Sign up
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sign Up</DialogTitle>
          <DialogDescription>
            Fill up all the field to create your account and start tracking your
            expenses.
          </DialogDescription>
        </DialogHeader>
        <form
          id="signInForm"
          onSubmit={handleSignUp}
          className="space-y-4 mb-8"
        >
          <InputWithLabel
            label="Username"
            type="text"
            placeholder="Enter username"
            className="w-full"
            id="username"
            onChange={(value) =>
              setSignupData({
                ...signupData,
                username: value as string,
              })
            }
            value={signupData.username}
          />
          <InputWithLabel
            label="First Name"
            type="text"
            placeholder="Enter firstname"
            className="w-full"
            id="firstName"
            onChange={(value) =>
              setSignupData({
                ...signupData,
                firstName: value as string,
              })
            }
            value={signupData.firstName}
          />
          <InputWithLabel
            label="Last Name"
            type="text"
            placeholder="Enter lastname"
            className="w-full"
            id="lastName"
            onChange={(value) =>
              setSignupData({
                ...signupData,
                lastName: value as string,
              })
            }
            value={signupData.lastName}
          />
          <InputWithLabel
            label="Password"
            type="password"
            placeholder="Enter password"
            className="w-full"
            id="password"
            onChange={(value) =>
              setSignupData({
                ...signupData,
                password: value as string,
              })
            }
            value={signupData.password}
          />
          <InputWithLabel
            label="Confirm Password"
            type="password"
            placeholder="Confirm password"
            className="w-full"
            id="confirmPassword"
            onChange={(value) =>
              setSignupData({
                ...signupData,
                confirmPassword: value as string,
              })
            }
            value={signupData.confirmPassword}
          />
        </form>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="outline"
              onClick={setDefaultData}
              disabled={isSigningUp}
            >
              Cancel
            </Button>
          </DialogClose>
          <Button form="signInForm" disabled={isDisabled}>
            {isSigningUp && <Loader className="size-4 animate-spin" />} Sign Up
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default LoginDialog;
