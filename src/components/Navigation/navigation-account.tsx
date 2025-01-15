"use client";
import { useEffect, useState } from "react";
import { getSession, signIn, signOut } from "next-auth/react";
import { Session } from "next-auth";
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

export default function NavigationAccount() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    async function fetchSession() {
      const sessionData = await getSession();
      setSession(sessionData);
    }
    fetchSession();
  }, []);

  if (!session) {
    return (
      <form
        className="ml-auto"
        onSubmit={async (event) => {
          event.preventDefault();
          await signIn("discord", { callbackUrl: "/redirect-login" });
        }}
      >
        <Button variant="outline">Log In</Button>
      </form>
    );
  }

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
            className="w-full"
            onSubmit={async (event) => {
              event.preventDefault();
              await signOut({ callbackUrl: "/" });
            }}
          >
            <button className="w-full flex items-center gap-2 hover:cursor-pointer">
              <LogOut />
              Logout
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
