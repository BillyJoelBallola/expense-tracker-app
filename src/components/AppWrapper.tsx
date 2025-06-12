import { currentUser } from "@/actions/user.action";

import MobileNavbar from "@/components/navbar/MobileNavbar";
import AppHeader from "@/components/AppHeader";
import Login from "@/components/Login";

async function AppWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await currentUser();

  if (!user) {
    return (
      <div className="w-screen h-screen grid gap-4 place-items-center text-center">
        <Login />
      </div>
    );
  }

  return (
    <div className="w-11/12 sm:w-11/12 md:w-10/12 lg:w-1/2 mx-auto min-h-dvh relative">
      <AppHeader />
      <MobileNavbar />
      <main className="pb-28">{children}</main>
    </div>
  );
}

export default AppWrapper;
