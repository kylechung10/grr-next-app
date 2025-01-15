import NextAuth from "next-auth";
import Discord from "next-auth/providers/discord";
import { db } from "@/db/index";
import { DrizzleAdapter } from "@auth/drizzle-adapter";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Discord({
      authorization:
        "https://discord.com/api/oauth2/authorize?scope=identify+email+guilds+guilds.members.read",
    }),
  ],
  adapter: DrizzleAdapter(db),
  callbacks: {
    async signIn({ account }) {
      const accessToken = account?.access_token;

      if (!accessToken) return false;

      const guildsResponse = await fetch(
        "https://discord.com/api/users/@me/guilds",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const guilds = await guildsResponse.json();
      const serverId = process.env.DISCORD_SERVER_ID as string;
      const isMember = guilds.some((guild: any) => guild.id === serverId);
      console.log("IS MEMBER?", isMember);

      // If not member of the GRR Discord, redirect
      if (!isMember) {
        return "/join-discord";
      }

      return true; // Allow login
    },
  },
});
