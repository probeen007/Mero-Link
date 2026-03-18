import { deleteFromS3ByUrl } from "@/libs/s3Delete";
import dbConnect from "@/libs/mongoClient";
import { Page } from "@/models/Page";
import { User } from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { badRequest, forbidden, serverError, unauthorized, ok, isLikelyUrl } from '@/libs/apiResponse';

async function userOwnsFileUrl(email, fileUrl) {
  const [page, user] = await Promise.all([
    Page.findOne({ owner: email }).lean(),
    User.findOne({ email }).lean(),
  ]);

  const linkIcons = Array.isArray(page?.links)
    ? page.links.map((link) => link?.icon).filter(Boolean)
    : [];

  const candidates = [
    page?.bgImage,
    user?.image,
    ...linkIcons,
  ].filter(Boolean);

  return candidates.includes(fileUrl);
}

export async function DELETE(request) {
  try {
    await dbConnect();
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return unauthorized();
    }

    const { searchParams } = new URL(request.url);
    const fileUrl = searchParams.get('url');
    
    if (!fileUrl) {
      return badRequest('File URL parameter required');
    }
    
    if (!isLikelyUrl(fileUrl)) {
      return badRequest('Invalid file URL format');
    }

    const ownsFile = await userOwnsFileUrl(session.user.email, fileUrl);
    if (!ownsFile) {
      return forbidden('You do not own this file');
    }
    
    const success = await deleteFromS3ByUrl(fileUrl);

    return ok({ success: true, message: 'File deleted successfully' });
  } catch (err) {
    console.error('❌ Delete file error:', err);
    return serverError('Delete failed');
  }
}
