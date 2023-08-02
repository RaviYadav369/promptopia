import NextAuth from "next-auth/next";

import GoogleProvider from 'next-auth/providers/google'
import { connectToDB } from "@utils/database";

import User from "@models/user";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId:'',
            clientSecret:'',
        })
    ],
    async session({session}){
        const sessionUser = await User.findOne({
            email:session.user.email
        })

        session.user.id = sessionUser._id.toString();
        return session;

    },
    async SignIn({profile}) {
        try {
            await connectToDB()
            const userExists = await User.findOne({
                email:profile.email
            })
            if(!userExists){
                await User.create({
                    email:profile.email,
                    userName:profile.name.repalce(" ","").toLowerCase(),
                    image:profile.picture,
                })
            }

            return true;

        } catch (error) {
            console.log(error);
            return false;
        }
    }
})

export {handler as GET, handler as POST}