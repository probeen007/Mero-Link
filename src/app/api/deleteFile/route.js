import { deleteFromS3ByUrl } from "@/libs/s3Delete";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function DELETE(request) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { 
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const { searchParams } = new URL(request.url);
    const fileUrl = searchParams.get('url');
    
    if (!fileUrl) {
      return new Response(JSON.stringify({ error: 'File URL parameter required' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    console.log('🗑️ Manual delete request for:', fileUrl);
    
    const success = await deleteFromS3ByUrl(fileUrl);
    
    if (success) {
      return new Response(JSON.stringify({ 
        success: true, 
        message: 'File deleted successfully',
        deletedUrl: fileUrl
      }), { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } else {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Failed to delete file' 
      }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  } catch (err) {
    console.error("❌ deleteFile error:", err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}