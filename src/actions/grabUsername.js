'use server';
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Page } from "@/models/Page";
import dbConnect from "@/libs/mongoClient";
import { getServerSession } from "next-auth";

const RESERVED_USERNAMES = new Set([
  'api', 'account', 'analytics', 'login', 'register', 'pricing', 'about', 'contact',
  'custom-qr', 'docs', 'public', 'static', 'admin', 'dashboard', 'settings',
  'support', 'legal', 'privacy', 'terms', 'help', 'status', 'assets', 'images'
]);

const USERNAME_REGEX = /^[a-zA-Z0-9_-]{3,30}$/;

export default async function grabUsername(formData) {
  try {
    const username = formData.get('username').trim();
    if (!username) {
      throw new Error("Username is required.");
    }

    if (!USERNAME_REGEX.test(username)) {
      throw new Error("Username must be between 3 and 30 characters and contain only letters, numbers, underscores, or hyphens.");
    }

    if (RESERVED_USERNAMES.has(username.toLowerCase())) {
      throw new Error("This username is reserved and cannot be used.");
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
