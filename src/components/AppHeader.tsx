import { currentUser } from "@/actions/user.action";
import ModeToggle from "@/components/ModeToggle";
import WebNavbar from "@/components/navbar/WebNavbar";

async function AppHeader() {
  const user = await currentUser();

  return (
    <div className="z-10 py-4 flex items-center justify-between sticky top-0 bg-white/50 dark:bg-neutral-950/50 backdrop-blur-lg">
      <div className="grid">
        <span className="text-xs text-muted-foreground">Welcome!</span>
        <span className="text-lg font-bold">{user?.username}</span>
      </div>
      <WebNavbar />
      <div className="block sm:hidden">
        <ModeToggle />
      </div>
    </div>
  );
}

export default AppHeader;
