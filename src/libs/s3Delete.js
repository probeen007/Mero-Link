import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Extract filename from AWS S3 URL
export function extractFilenameFromUrl(url) {
  if (!url || typeof url !== 'string') return null;
  
  try {
    // Handle AWS S3 URLs like: https://bucket-name.s3.amazonaws.com/filename.ext
    // or https://bucket-name.s3.region.amazonaws.com/filename.ext
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    
    // Remove leading slash and get the filename
    const filename = pathname.substring(1);
    
    // Make sure it's actually an S3 URL from our bucket
    const bucketName = process.env.S3_BUCKET_NAME;
    if (urlObj.hostname === `${bucketName}.s3.amazonaws.com` || 
        urlObj.hostname.includes(`${bucketName}.s3.`)) {
      return filename;
    }
    
    return null;
  } catch (error) {
    console.error('Error extracting filename from URL:', error);
    return null;
  }
}

// Delete file from S3 bucket
export async function deleteFromS3(filename) {
  if (!filename) return false;
  
  try {
    const bucketName = process.env.S3_BUCKET_NAME;
    
    console.log(`🗑️ Deleting file from S3: ${filename}`);
    
    await s3Client.send(new DeleteObjectCommand({
      Bucket: bucketName,
      Key: filename,
    }));
    
    console.log(`✅ Successfully deleted: ${filename}`);
    return true;
  } catch (error) {
    console.error(`❌ Error deleting file ${filename}:`, error);
    return false;
  }
}

// Delete file from S3 using full URL
export async function deleteFromS3ByUrl(url) {
  const filename = extractFilenameFromUrl(url);
  if (!filename) {
    console.log('🔍 No valid S3 filename found in URL:', url);
    return false;
  }
  
  return await deleteFromS3(filename);
}