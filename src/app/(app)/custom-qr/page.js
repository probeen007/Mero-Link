import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import CustomQRClient from "./CustomQRClient";
import { Page } from "@/models/Page";
import { User } from "@/models/User";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function CustomQRPage() {
  // Get session
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect('/');
  }

  // Connect to MongoDB
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  // Find page and user by email
  const page = await Page.findOne({ owner: session.user.email });
  const user = await User.findOne({ email: session.user.email });
  
  if (!page) {
    return <div className="p-6 text-center">
      <h2 className="text-xl font-bold text-gray-800 mb-4">No Page Found</h2>
      <p className="text-gray-600">You need to create your page first in the Dashboard.</p>
    </div>;
  }

  // Convert ObjectId to string for client component
  const pageData = {
    ...page.toObject(),
    _id: page._id.toString(),
    isVerified: user?.isVerified || false  // Add verification status from User model
  };

  return (
    <CustomQRClient 
      page={pageData} 
      user={session.user} 
    />
  );
}