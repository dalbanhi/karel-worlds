import NextAuth from "next-auth/next";

import GoogleProvider from "next-auth/providers/google";
import { connectToDatabase } from "@utils/database";

import User from "@models/User";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            // callbackUrl: process.env.GOOGLE_CALLBACK_URL,
        }),
    ],
    callbacks: {
        async session({session}){

            const sessionUser = await User.findOne({
                email: session.user.email,
            });
    
            session.user.id = sessionUser._id.toString();
            return session;
    
        },
        async signIn({profile}){
            try{
                await connectToDatabase();
                //checking if a user already exists
                const userExistsAlready = await User.findOne({
                    email: profile.email
                });
    
                //if the user does not exist, make one
                if(!userExistsAlready){
                    await User.create({
                        email: profile.email,
                        username: profile.name.replaceAll(" ", ".").toLowerCase(), //replace spaces with periods and make everything lowercase -- possibly add a random number to the end to avoid duplicates?
                        image: profile.picture,
    
                    });
                }
    
                return true;
            } catch(e){
                console.log('Error signing in!!! :-( ');
                console.log(e);
                return false;
            }
        }
    },
    
    

})

export {handler as GET, handler as POST}