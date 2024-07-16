import NextAuth from "next-auth"
import {PrismaAdapter} from "@auth/prisma-adapter"
import authConfig from "./auth.config"
import {db} from "@/lib/db";
import {getUserById} from "@/data/user";

export const {auth, handlers, signIn, signOut} = NextAuth({
    pages: {
        signIn: "/auth/login",
        error: "/auth/error"
    },
    events: {
        async linkAccount({user}) {
            await db.user.update(<any>{
                where: {id: user.id},
                data: {emailVerified: new Date()},
            })
        }
    },
    callbacks: {
        // async signIn({user}) {
        //     const existingUser = await getUserById(<string>user.id)
        //     if (!existingUser || !existingUser.emailVerified) {
        //         return false
        //     }
        //     return true
        // },
        async session({token, session}) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }
            if (token.role && session.user) {
                session.user.role = token.role
            }
            return session
        },
        async jwt({token}) {
            if (!token.sub) return token
            const existingUser = await getUserById(token.sub);
            if (!existingUser) {
                return token
            }
            token.role = existingUser.role;
            return token
        }
    },
    adapter: PrismaAdapter(db),
    session: {strategy: "jwt"},
    ...authConfig,
})