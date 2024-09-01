import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import User from '@models/User';
import { connectToDB } from '@utils/dbConnect';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
     async session({ session }) {
     
      const sessionUser = await User.findOne({ email: session.user.email });
      if (sessionUser) {
        session.user.id = sessionUser._id.toString();
      }

      return session;
    },
    async signIn({ profile }) {
      try {
        await connectToDB();
        const userExists = await User.findOne({ email: profile.email });
        if (!userExists) {
          await User.create({
            username: profile.name.replace(" ", "").toLowerCase(),
            email: profile.email,
            picture: profile.picture,
          });
        }
        return true;
      } catch (error) {
        console.log("Error checking if user exists: ", error);
        return false;
      }
    },
})
 
export { handler as GET, handler as POST };