import NextAuth from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import VkProvider from "next-auth/providers/vk";
import GitHubProvider from "next-auth/providers/github";

import { verifyPassword } from "@utils/auth";
import { connect } from "@utils/dbConnect";
import { UserModel } from "@src/server/models/user.model";
import clientPromse from "@shared/utils/mongodb";
import { User } from "@shared/types";

connect();

export default NextAuth({
  adapter: MongoDBAdapter(clientPromse),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    VkProvider({
      clientId: process.env.VK_CLIENT_ID,
      clientSecret: process.env.VK_CLIENT_SECRET,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "email@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials, req) => {
        const user = await UserModel.findOne({
          email: credentials?.email,
        });

        if (!user) {
          throw new Error("No user found!");
          // return null;
        }

        const isValid = await verifyPassword(
          credentials?.password as string,
          user.password
        );

        if (!isValid) {
          throw new Error("Could not log you in!");
          // return null;
        }
        console.log("success", user);
        return {
          name: user.name,
          id: user._id,
          email: user.email,
          rating: user.rating,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        const response: unknown = await UserModel.findById(token.id).lean();
        const user: User = response as User;
        if (!user) return session;
        session.user = user;
      }
      return session;
    },
    // async signIn({ user, account, profile, email, credentials }) {
    //   const isAllowedToSignIn = true;
    //   if (isAllowedToSignIn) {
    //     return true;
    //   } else {
    //     // Return false to display a default error message
    //     return false;
    //     // Or you can return a URL to redirect to:
    //     // return '/unauthorized'
    //   }
    // },
  },

  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.SECRET,
  },
});
