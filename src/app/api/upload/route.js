import {PutObjectCommand, S3Client} from "@aws-sdk/client-s3";
import { deleteFromS3ByUrl } from "@/libs/s3Delete";
import dbConnect from "@/libs/mongoClient";
import { Page } from "@/models/Page";
import { User } from "@/models/User";
import { rateLimit } from "@/libs/rateLimit";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { badRequest, ok, serverError, tooManyRequests, unauthorized, isLikelyUrl } from '@/libs/apiResponse';
import uniqid from "uniqid";

// Rate limiting: 10 uploads per 15 minutes per user
const uploadRateLimit = rateLimit(10, 15 * 60 * 1000);

// File validation constants
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];

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

export async function POST(req) {
  try {
    await dbConnect();
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return unauthorized();
    }

    // Check rate limit
    if (!uploadRateLimit(req)) {
      return tooManyRequests('Too many uploads. Please try again later.');
    }

    const formData = await req.formData();

    if (!formData.has('file')) {
      return badRequest('No file provided');
    }

    const file = formData.get('file');
    const oldFileUrl = formData.get('oldFileUrl');
    
    // Validate file
    if (!file || file.size === 0) {
      return badRequest('Invalid file');
    }

    if (file.size > MAX_FILE_SIZE) {
      return badRequest(`File too large. Maximum size is ${MAX_FILE_SIZE / 1024 / 1024}MB`);
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return badRequest('Invalid file type. Only images are allowed.');
    }
    
    // Initialize S3 client with proper error handling
    const s3Client = new S3Client({
      region: process.env.AWS_REGION || 'eu-north-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || process.env.S3_SECRET_ACCESS_KEY,
      },
    });

    // Delete old file first (if provided)
    if (oldFileUrl && oldFileUrl.trim() !== '') {
      if (!isLikelyUrl(oldFileUrl)) {
        return badRequest('Invalid oldFileUrl');
      }

      try {
        const ownsOldFile = await userOwnsFileUrl(session.user.email, oldFileUrl);
        if (ownsOldFile) {
          await deleteFromS3ByUrl(oldFileUrl);
        }
      } catch (error) {
        console.error('❌ Error deleting old file:', error.message);
        // Continue with upload even if delete fails
      }
    }

    // Generate secure filename
    const timestamp = Date.now();
    const randomId = uniqid();
    const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const newFilename = `${timestamp}-${randomId}.${ext}`;
    const bucketName = process.env.S3_BUCKET_NAME || process.env.BUCKET_NAME;

    if (!bucketName) {
      throw new Error('S3_BUCKET_NAME environment variable is not set');
    }

    // Convert file to buffer more efficiently
    const buffer = Buffer.from(await file.arrayBuffer());

    // Upload to S3 with optimized settings
    const uploadParams = {
      Bucket: bucketName,
      Key: newFilename,
      Body: buffer,
      ContentType: file.type,
      ACL: 'public-read', // Make uploaded files publicly accessible
      CacheControl: 'max-age=31536000', // 1 year cache
      ContentDisposition: 'inline',
      Metadata: {
        'uploaded-by': session.user.email,
        'upload-timestamp': new Date().toISOString(),
      }
    };

    await s3Client.send(new PutObjectCommand(uploadParams));

    const link = `https://${bucketName}.s3.${process.env.AWS_REGION || 'eu-north-1'}.amazonaws.com/${newFilename}`;

    return ok({ 
      url: link,
      filename: newFilename,
      size: file.size,
      contentType: file.type 
    });

  } catch (error) {
    console.error('❌ Upload error:', error);
    
    // Return appropriate error response
    if (error.name === 'CredentialsError') {
      return serverError('Server configuration error');
    }
    
    return serverError('Upload failed. Please try again.');
  }
}
