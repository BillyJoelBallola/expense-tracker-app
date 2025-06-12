"use client";

import { currentUser, updateProfile } from "@/actions/user.action";
import InputWithLabel from "@/components/input/InputWithLabel";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";

function Profile() {
  const [isSaving, setIsSaving] = useState(false);
  const [profileData, setProfileData] = useState({
    username: "",
    firstName: "",
    lastName: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      const response = await currentUser();
      if (!response) return;
      setProfileData({
        username: response.username,
        firstName: response.firstName,
        lastName: response.lastName,
      });
    };

    fetchUser();
  }, [isSaving]);

  const handleForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSaving(true);

    try {
      const response = await updateProfile(profileData);

      if (response?.error) {
        return toast.error(response.error);
      }

      if (response?.success) {
        return toast.success("Profile successfully updated");
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
        <CardTitle>Profile</CardTitle>
        <CardDescription>Update you profile information here.</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="profileForm" onSubmit={handleForm} className="space-y-4">
          <InputWithLabel
            label="Username"
            placeholder="Username"
            id="username"
            value={profileData.username}
            className="sm:w-sm"
            onChange={(value) => {
              setProfileData((prev) => ({
                ...prev,
                username: value as string,
              }));
            }}
          />
          <InputWithLabel
            label="First Name"
            placeholder="First Name"
            id="firstName"
            value={profileData.firstName}
            className="sm:w-sm"
            onChange={(value) => {
              setProfileData((prev) => ({
                ...prev,
                firstName: value as string,
              }));
            }}
          />
          <InputWithLabel
            label="Last Name"
            placeholder="Last Name"
            id="lastName"
            value={profileData.lastName}
            className="sm:w-sm"
            onChange={(value) => {
              setProfileData((prev) => ({
                ...prev,
                lastName: value as string,
              }));
            }}
          />
        </form>
      </CardContent>
      <CardFooter>
        <Button
          form="profileForm"
          type="submit"
          disabled={
            isSaving ||
            profileData.username === "" ||
            profileData.firstName === "" ||
            profileData.lastName === ""
          }
        >
          {isSaving && <Loader className="size-4 animate-spin" />} Save Changes
        </Button>
      </CardFooter>
    </Card>
  );
}

export default Profile;
