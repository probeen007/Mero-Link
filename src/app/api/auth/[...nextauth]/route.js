import clientPromise from "@/libs/mongoClientAuth";
import {MongoDBAdapter} from "@auth/mongodb-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  
  // Production optimizations
  session: {
    strategy: "database",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  
  // Callbacks for security and performance
  callbacks: {
    async session({ session, user }) {
      // Only include necessary data in session
      return {
        ...session,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
        }
      };
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
  
  // Security settings
  pages: {
    signIn: '/login',
    error: '/login',
  },
  
  // Only enable debug in development
  debug: process.env.NODE_ENV === 'development',
  
  // Events for logging (optional)
  events: {
    async signIn({ user, account, profile }) {
      console.log(`User ${user.email} signed in via ${account.provider}`);
    },
    async signOut({ session }) {
      console.log(`User signed out`);
    },
  },
};

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }