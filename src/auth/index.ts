import NextAuth from "next-auth";
import Discord from "next-auth/providers/discord";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Discord({
      authorization:
        "https://discord.com/api/oauth2/authorize?scope=identify+email+guilds+guilds.members.read",
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        console.log("this is a token", token);
        console.log("this is a account", account);
        token.accessToken = account.access_token; // Save the access token
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string; // Add access token to session
      return session;
    },
  },
});
