/**
 * Script to fix S3 permissions for already uploaded files
 * Run with: node scripts/fix-s3-permissions.js
 */

const { S3Client, ListObjectsV2Command, PutObjectAclCommand } = require('@aws-sdk/client-s3');

const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || process.env.S3_SECRET_ACCESS_KEY,
  },
});

const bucketName = process.env.S3_BUCKET_NAME || process.env.BUCKET_NAME;

async function fixAllObjectPermissions() {
  if (!bucketName) {
    console.error('❌ S3_BUCKET_NAME not set in environment variables');
    process.exit(1);
  }

  console.log(`🔍 Scanning bucket: ${bucketName}`);
  
  try {
    let continuationToken = null;
    let totalFixed = 0;
    let totalErrors = 0;

    do {
      // List objects in bucket
      const listCommand = new ListObjectsV2Command({
        Bucket: bucketName,
        ContinuationToken: continuationToken,
      });

      const listResponse = await s3Client.send(listCommand);
      const objects = listResponse.Contents || [];

      console.log(`📦 Found ${objects.length} objects in this batch`);

      // Update ACL for each object
      for (const obj of objects) {
        try {
          console.log(`  🔧 Fixing: ${obj.Key}`);
          
          await s3Client.send(new PutObjectAclCommand({
            Bucket: bucketName,
            Key: obj.Key,
            ACL: 'public-read',
          }));

          totalFixed++;
          console.log(`  ✅ Fixed: ${obj.Key}`);
        } catch (error) {
          totalErrors++;
          console.error(`  ❌ Error fixing ${obj.Key}:`, error.message);
        }
      }

      continuationToken = listResponse.NextContinuationToken;
    } while (continuationToken);

    console.log('\n' + '='.repeat(60));
    console.log(`✅ Successfully fixed: ${totalFixed} files`);
    if (totalErrors > 0) {
      console.log(`❌ Errors: ${totalErrors} files`);
    }
    console.log('='.repeat(60));

  } catch (error) {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  }
}

// Run the script
console.log('🚀 Starting S3 permissions fix...\n');
fixAllObjectPermissions()
  .then(() => {
    console.log('\n✨ Done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Script failed:', error);
    process.exit(1);
  });
