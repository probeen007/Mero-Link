'use server';
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import { Page } from "@/models/Page";
import { User } from "@/models/User";
import dbConnect from "@/libs/mongoClient";
import {getServerSession} from "next-auth";

const ALLOWED_BUTTON_KEYS = new Set([
  'email', 'mobile', 'instagram', 'facebook', 'discord', 'tiktok', 'youtube',
  'whatsapp', 'github', 'telegram', 'twitter', 'linkedin', 'snapchat',
  'pinterest', 'reddit', 'twitch', 'spotify', 'soundcloud', 'medium', 'tumblr'
]);

const ALLOWED_BG_TYPES = new Set(['color', 'image']);

function toSafeString(value, maxLength = 500) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

export async function savePageSettings(formData) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  if (session) {
    const dataKeys = [
      'displayName','location',
      'bio', 'bgType', 'bgColor', 'bgImage', 'adaptBackground',
    ];

    const dataToUpdate = {};
    for (const key of dataKeys) {
      if (formData.has(key)) {
        // Handle boolean conversion for adaptBackground
        if (key === 'adaptBackground') {
          dataToUpdate[key] = formData.get(key) === 'true';
        } else if (key === 'bgType') {
          const bgType = toSafeString(formData.get(key), 20);
          if (ALLOWED_BG_TYPES.has(bgType)) {
            dataToUpdate[key] = bgType;
          }
        } else if (key === 'bgColor') {
          const bgColor = toSafeString(formData.get(key), 20);
          if (/^#[0-9A-Fa-f]{6}$/.test(bgColor)) {
            dataToUpdate[key] = bgColor;
          }
        } else {
          dataToUpdate[key] = toSafeString(formData.get(key));
        }
      }
    }

    await Page.updateOne(
      {owner:session?.user?.email},
      dataToUpdate,
    );

    if (formData.has('avatar')) {
      const avatarLink = toSafeString(formData.get('avatar'));
      await User.updateOne(
        {email: session.user?.email},
        {image: avatarLink},
      );
    }

    return true;
  }

  return false;
}

export async function savePageButtons(formData) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  if (session) {
    const buttonsValues = {};
    formData.forEach((value, key) => {
      if (ALLOWED_BUTTON_KEYS.has(key)) {
        const safeValue = toSafeString(value);
        if (safeValue.length > 0) {
          buttonsValues[key] = safeValue;
        }
      }
    });
    const dataToUpdate = {buttons:buttonsValues};
    await Page.updateOne(
      {owner:session?.user?.email},
      dataToUpdate,
    );
    return true;
  }
  return false;
}

export async function savePageLinks(links) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  if (session) {
    await Page.updateOne(
      {owner:session?.user?.email},
      {links},
    );
  } else {
    return false;
  }
}
