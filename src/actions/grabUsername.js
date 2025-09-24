'use server';
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Page } from "@/models/Page";
import dbConnect from "@/libs/mongoClient";
import { getServerSession } from "next-auth";

export default async function grabUsername(formData) {
  try {
    const username = formData.get('username').trim();
    if (!username) {
      throw new Error("Username is required.");
    }

    // Ensure MongoDB connection
    await dbConnect();

    // Check if the username already exists
    const existingPageDoc = await Page.findOne({ uri: username });
    if (existingPageDoc) {
      return { success: false, message: "Username is already taken." };
    }

    // Fetch the session to get the user information
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      throw new Error("You must be logged in to create a username.");
    }

    // Create a new Page document
    const newPage = await Page.create({
      uri: username,
      owner: session.user.email,
    });

    // Return a plain object with success status
    return { success: true, uri: newPage.uri };
  } catch (error) {
    console.error("Error in grabUsername:", error.message);
    return { success: false, message: error.message };
  }
}
