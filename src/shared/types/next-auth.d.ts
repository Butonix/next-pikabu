import NextAuth, { DefaultSession } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";
import { User } from ".";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id?: string;
    } & DefaultSession["user"] &
      User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
  }
}
