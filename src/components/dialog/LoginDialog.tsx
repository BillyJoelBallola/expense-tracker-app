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
import { sign } from "crypto";
import { signIn } from "@/actions/auth.action";
import { Loader } from "lucide-react";

function LoginDialog() {
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [signinData, setSigninData] = useState({
    username: "",
    password: "",
  });

  const setDefaultData = () => {
    setSigninData({
      username: "",
      password: "",
    });
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSigningIn(true);

    try {
      const response = await signIn(signinData);

      if (response.error) {
        return toast.error(response.error);
      }

      if (response.success) {
        setDefaultData();
      }
    } catch (error) {
      return toast.error("An error occurred while signing in.");
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-8 rounded-full w-fit px-8">Sign in</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sign In</DialogTitle>
          <DialogDescription>
            Sign in your account to start tracking your expenses.
          </DialogDescription>
        </DialogHeader>
        <form
          id="signInForm"
          onSubmit={handleSignIn}
          className="space-y-4 mb-8"
        >
          <InputWithLabel
            label="Username"
            type="text"
            placeholder="Enter your username"
            className="w-full"
            id="username"
            onChange={(value) =>
              setSigninData({
                ...signinData,
                username: value as string,
              })
            }
            value={signinData.username}
          />
          <InputWithLabel
            label="Password"
            type="password"
            placeholder="Enter your password"
            className="w-full"
            id="password"
            onChange={(value) =>
              setSigninData({
                ...signinData,
                password: value as string,
              })
            }
            value={signinData.password}
          />
        </form>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="outline"
              onClick={setDefaultData}
              disabled={isSigningIn}
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            form="signInForm"
            disabled={signinData.username === "" || signinData.password === ""}
          >
            {isSigningIn && <Loader className="size-4 animate-spin" />} Sign In
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default LoginDialog;
