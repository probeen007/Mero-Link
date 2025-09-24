import {PutObjectCommand, S3Client} from "@aws-sdk/client-s3";
import { deleteFromS3ByUrl } from "@/libs/s3Delete";
import { rateLimit } from "@/libs/rateLimit";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import uniqid from "uniqid";

// Rate limiting: 10 uploads per 15 minutes per user
const uploadRateLimit = rateLimit(10, 15 * 60 * 1000);

// File validation constants
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];

export async function POST(req) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check rate limit
    if (!uploadRateLimit(req)) {
      return Response.json({ 
        error: 'Too many uploads. Please try again later.' 
      }, { status: 429 });
    }

    const formData = await req.formData();

    if (!formData.has('file')) {
      return Response.json({ error: 'No file provided' }, { status: 400 });
    }

    const file = formData.get('file');
    const oldFileUrl = formData.get('oldFileUrl');
    
    // Validate file
    if (!file || file.size === 0) {
      return Response.json({ error: 'Invalid file' }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return Response.json({ 
        error: `File too large. Maximum size is ${MAX_FILE_SIZE / 1024 / 1024}MB` 
      }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return Response.json({ 
        error: 'Invalid file type. Only images are allowed.' 
      }, { status: 400 });
    }
    
    console.log('📁 New file:', file.name, `(${(file.size / 1024).toFixed(1)}KB)`);
    if (oldFileUrl) {
      console.log('🗑️ Old file to delete:', oldFileUrl);
    }
    
    // Initialize S3 client with proper error handling
    const s3Client = new S3Client({
      region: process.env.AWS_REGION || 'us-east-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });

    // Delete old file first (if provided)
    if (oldFileUrl && oldFileUrl.trim() !== '') {
      try {
        await deleteFromS3ByUrl(oldFileUrl);
        console.log('✅ Old file deleted successfully');
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
    const bucketName = process.env.S3_BUCKET_NAME;

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
      CacheControl: 'max-age=31536000', // 1 year cache
      ContentDisposition: 'inline',
      // Remove ACL for security - use bucket policy instead
      Metadata: {
        'uploaded-by': session.user.email,
        'upload-timestamp': new Date().toISOString(),
      }
    };

    await s3Client.send(new PutObjectCommand(uploadParams));

    const link = `https://${bucketName}.s3.${process.env.AWS_REGION || 'us-east-1'}.amazonaws.com/${newFilename}`;
    console.log('✅ New file uploaded:', link);

    return Response.json({ 
      url: link,
      filename: newFilename,
      size: file.size,
      contentType: file.type 
    });

  } catch (error) {
    console.error('❌ Upload error:', error);
    
    // Return appropriate error response
    if (error.name === 'CredentialsError') {
      return Response.json({ 
        error: 'Server configuration error' 
      }, { status: 500 });
    }
    
    return Response.json({ 
      error: 'Upload failed. Please try again.' 
    }, { status: 500 });
  }
}