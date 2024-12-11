import { auth, signIn, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { LogOut, Settings, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default async function NavigationAccount() {
  const session = await auth();

  if (!session) {
    return (
      <form
        className="ml-auto"
        action={async () => {
          "use server";
          await signIn();
        }}
      >
        <Button variant="outline">Log In</Button>
      </form>
    );
  }
  if (session) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Image
            src={session.user?.image || ""}
            width={50}
            height={50}
            alt={session.user?.name || ""}
            className="ml-auto rounded-full hover:cursor-pointer"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="hover:cursor-pointer">
            <User />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:cursor-pointer">
            <Settings />
            <span>Account Settings</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <button className="flex items-center gap-2 hover:cursor-pointer">
                <LogOut />
                Logout
              </button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
}
