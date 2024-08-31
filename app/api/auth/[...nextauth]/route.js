import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import { connectToDB } from "@utils/database";
import User from '@models/user'
  // Correct the typo here
//   console.log( process.env.GOOGLE_ID, // Use environment variables to store sensitive data
//     process.env.GOOGLE_CLIENT_SECRET)

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID, // Use environment variables to store sensitive data
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    secret: process.env.NextAuth_SECRET,
    callbacks: {
        async session({ session }) {
            // Customize the session object here
            const sessionUser = await User.findOne({
                email: session.user.email,})
            session.user.id = sessionUser._id.toString();
            return session;
        },
        async signIn({  profile }) {
            try {
                await connectToDB();
                // check if the user exists
                const userExists = await User.findOne({
                    email:profile.email
                })

                // if usewr does not exist
                if(!userExists){
                    await User.create({
                        email:profile.email,
                        username:profile.name.replace(" ","").toLowerCase(),
                        image:profile.picture
                    })
                }


                return true;
            } catch (error) {
                console.log(error)
                return false;
            }
            // Customize the sign-in process here
            // Return true to allow the sign-in, or false to deny it
            return true;
        }
    }
});

export { handler as GET, handler as POST };
