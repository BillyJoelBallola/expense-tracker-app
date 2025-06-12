"use client";

import { signOut } from "@/actions/auth.action";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import Profile from "./Profile";
import Account from "./Account";
import Category from "./Category";
import { Button } from "@/components/ui/button";

function ProfilePage() {
  const route = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      route.replace("/");
    } catch (error) {
      toast.error("Error occured while signing out");
    }
  };

  const tabs = [
    { label: "Profile", value: "profile" },
    { label: "Account", value: "account" },
    { label: "Category", value: "category" },
  ];

  return (
    <Tabs className="space-y-4" defaultValue="profile">
      <div className="flex items-center justify-between">
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <Button
          variant="outline"
          className="rounded-full"
          onClick={handleSignOut}
        >
          Sign Out
        </Button>
      </div>
      <TabsContent value="profile">
        <Profile />
      </TabsContent>
      <TabsContent value="account">
        <Account />
      </TabsContent>
      <TabsContent value="category">
        <Category />
      </TabsContent>
    </Tabs>
  );
}

export default ProfilePage;
