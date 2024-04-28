import NextAuth from "next-auth/next";

import GoogleProvider from "next-auth/providers/google";
import { connectToDatabase } from "@utils/database";

import User from "@models/user";


function removeAccents(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

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

                let uniqueUsername = profile.name.replaceAll(" ", ".").toLowerCase();

                uniqueUsername = removeAccents(uniqueUsername);

                while(await User.findOne({username: uniqueUsername})){
                    uniqueUsername += Math.floor(Math.random() * 10);
                }

                //make sure username is at least 8 characters long
                while(uniqueUsername.length < 8){
                    uniqueUsername += Math.floor(Math.random() * 10);
                }

                // //make sure username is at most 30 characters long
                uniqueUsername = uniqueUsername.slice(0, 30);
                //if the user does not exist, make one
                if(!userExistsAlready){
                    await User.create({
                        email: profile.email,
                        username: uniqueUsername, 
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