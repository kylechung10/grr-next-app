import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string; // Add custom accessToken property
  }

  interface JWT {
    accessToken?: string; // Add custom accessToken property
  }
}
