"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Profile from "./Profile";
import Account from "./Account";
import Category from "./Category";
import SignoutDialog from "@/components/dialog/SignoutDialog";

function ProfilePage() {
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
        <SignoutDialog />
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
