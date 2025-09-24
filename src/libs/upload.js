import toast from "react-hot-toast";
import { compressImage, validateImageFile } from "./imageOptimization";

export async function upload(ev, callbackFn, oldFileUrl = null, options = {}) {
  const file = ev.target.files?.[0];

  if (!file) {
    toast.error('No file selected');
    return;
  }

  // Validate file before upload
  const validation = validateImageFile(file);
  if (!validation.isValid) {
    validation.errors.forEach(error => toast.error(error));
    return;
  }

  // Compress image for better performance (optional)
  let fileToUpload = file;
  if (options.compress !== false && file.type.startsWith('image/')) {
    try {
      const compressedFile = await compressImage(
        file, 
        options.maxWidth || 1200, 
        options.maxHeight || 800, 
        options.quality || 0.85
      );
      
      // Only use compressed version if it's smaller
      if (compressedFile.size < file.size) {
        fileToUpload = new File([compressedFile], file.name, {
          type: 'image/jpeg',
          lastModified: Date.now(),
        });
        console.log(`📦 Compressed ${file.name} from ${(file.size / 1024).toFixed(1)}KB to ${(fileToUpload.size / 1024).toFixed(1)}KB`);
      }
    } catch (error) {
      console.warn('Compression failed, using original file:', error);
    }
  }

  const uploadPromise = new Promise(async (resolve, reject) => {
    try {
      const data = new FormData();
      data.set('file', fileToUpload);
      
      // Include old file URL if provided for automatic deletion
      if (oldFileUrl && oldFileUrl.trim() !== '') {
        data.set('oldFileUrl', oldFileUrl);
        console.log('🔄 Uploading new file and deleting old:', oldFileUrl);
      }
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: data,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Upload failed');
      }

      const result = await response.json();
      
      // Handle both old format (direct URL) and new format (object with url)
      const link = typeof result === 'string' ? result : result.url;
      
      callbackFn(link);
      resolve(link);
      
    } catch (error) {
      console.error('Upload error:', error);
      reject(error);
    }
  });

  await toast.promise(uploadPromise, {
    loading: oldFileUrl ? 'Replacing file...' : 'Uploading...',
    success: oldFileUrl ? 'File replaced successfully!' : 'Uploaded successfully!',
    error: (err) => `Upload failed: ${err.message}`,
  });
}