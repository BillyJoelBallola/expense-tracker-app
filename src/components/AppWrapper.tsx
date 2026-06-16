import { currentUser } from "@/actions/user.action";

import MobileNavbar from "@/components/navbar/MobileNavbar";
import AppHeader from "@/components/AppHeader";
import Authentication from "@/components/Authentication";
import LandingPage from "./LandingPage";

export const dynamic = "force-dynamic";

async function AppWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await currentUser();

  if (!user) {
    return <LandingPage />;
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
