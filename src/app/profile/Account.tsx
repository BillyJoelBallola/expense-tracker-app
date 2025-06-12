"use client";

import { FormEvent, useState } from "react";
import InputWithLabel from "@/components/input/InputWithLabel";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { updateAccount } from "@/actions/user.action";
import { toast } from "sonner";
import { set } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function Account() {
  const [isSaving, setIsSaving] = useState(false);
  const [accountData, setAccountData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSaving(true);

    try {
      const response = await updateAccount(accountData);

      if (response?.error) {
        return toast.error(response.error);
      }

      if (response?.success) {
        setAccountData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        return toast.success("Account successfully updated");
      }
    } catch (error) {
      return toast.error("An error occured while saving changes");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card className="space-y-4">
      <CardHeader>
        <CardTitle>Account</CardTitle>
        <CardDescription>
          You can update your account security here.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="accountForm" onSubmit={handleForm} className="space-y-4">
          <InputWithLabel
            label="Current Password"
            placeholder="Current Password"
            id="currentPassword"
            type="password"
            value={accountData.currentPassword}
            className="sm:w-sm"
            onChange={(value) => {
              setAccountData((prev) => ({
                ...prev,
                currentPassword: value as string,
              }));
            }}
          />
          <InputWithLabel
            label="New Password"
            placeholder="New Password"
            id="newPassword"
            type="password"
            value={accountData.newPassword}
            className="sm:w-sm"
            onChange={(value) => {
              setAccountData((prev) => ({
                ...prev,
                newPassword: value as string,
              }));
            }}
          />
          <InputWithLabel
            label="Confirm Password"
            placeholder="Confirm Password"
            id="confirmPassword"
            type="password"
            value={accountData.confirmPassword}
            className="sm:w-sm"
            onChange={(value) => {
              setAccountData((prev) => ({
                ...prev,
                confirmPassword: value as string,
              }));
            }}
          />
        </form>
      </CardContent>
      <CardFooter>
        <Button
          form="accountForm"
          type="submit"
          disabled={
            isSaving ||
            accountData.currentPassword === "" ||
            accountData.newPassword === "" ||
            accountData.confirmPassword === ""
          }
        >
          {isSaving && <Loader className="size-4 animate-spin" />} Save Changes
        </Button>
      </CardFooter>
    </Card>
  );
}

export default Account;
