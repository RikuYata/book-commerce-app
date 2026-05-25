import type { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../prisma";

export const nextAuthOptions: NextAuthOptions = {
    debug: false,
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        }),
    ],

    adapter: PrismaAdapter(prisma),
    callbacks: {
        session: async({session , user}) =>{
            return {
                ...session,
                user: {
                    ...session.user,
                    id: user.id,
                },
            };

        }
    }
}