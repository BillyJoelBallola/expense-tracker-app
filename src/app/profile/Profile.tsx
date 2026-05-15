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
  const [profileInfo, setProfileInfo] = useState({
    username: "Jonny",
    firstName: "John",
    lastName: "Doe",
  });
  const [profileForm, setProfileForm] = useState({
    username: "",
    firstName: "",
    lastName: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      const response = await currentUser();
      if (!response) return;

      const data = {
        username: response.username,
        firstName: response.firstName,
        lastName: response.lastName,
      };

      setProfileInfo(data);
      setProfileForm(data);
    };

    fetchUser();
  }, []);

  const handleForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSaving(true);

    try {
      const response = await updateProfile(profileForm);

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
        <div className="grid p-2 mb-4 bg-neutral-100 dark:bg-neutral-700 rounded-lg">
          <div className="grid gap-2 sm:grid-cols-3">
            <div>
              <h2 className="text-xs text-neutral-400">Username</h2>
              <p>{profileInfo.username}</p>
            </div>
            <div>
              <h2 className="text-xs text-neutral-400">Firstname</h2>
              <p>{profileInfo.firstName}</p>
            </div>
            <div>
              <h2 className="text-xs text-neutral-400">Lastname</h2>
              <p>{profileInfo.lastName}</p>
            </div>
          </div>
        </div>
        <form id="profileForm" onSubmit={handleForm} className="space-y-4">
          <InputWithLabel
            label={`Username`}
            placeholder="Username"
            id="username"
            value={profileForm.username}
            containerClassName="sm:w-sm"
            onChange={(value) => {
              setProfileForm((prev) => ({
                ...prev,
                username: value as string,
              }));
            }}
          />
          <InputWithLabel
            label="First Name"
            placeholder="First Name"
            id="firstName"
            value={profileForm.firstName}
            containerClassName="sm:w-sm"
            onChange={(value) => {
              setProfileForm((prev) => ({
                ...prev,
                firstName: value as string,
              }));
            }}
          />
          <InputWithLabel
            label="Last Name"
            placeholder="Last Name"
            id="lastName"
            value={profileForm.lastName}
            containerClassName="sm:w-sm"
            onChange={(value) => {
              setProfileForm((prev) => ({
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
            profileForm.username === "" ||
            profileForm.firstName === "" ||
            profileForm.lastName === ""
          }
        >
          {isSaving && <Loader className="size-4 animate-spin" />} Save Changes
        </Button>
      </CardFooter>
    </Card>
  );
}

export default Profile;
