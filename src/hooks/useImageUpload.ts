import { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../lib/firebase.ts';

export function useImageUpload() {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upload = async (file: File): Promise<string> => {
    setUploading(true);
    setError(null);
    try {
      const filename = `${Date.now()}_${file.name}`;
      const storageRef = ref(storage, `thumbnails/${filename}`);
      await uploadBytes(storageRef, file);
      return await getDownloadURL(storageRef);
    } catch (e) {
      const msg = '画像のアップロードに失敗しました';
      setError(msg);
      throw new Error(msg + ': ' + e);
    } finally {
      setUploading(false);
    }
  };

  return { upload, uploading, error };
}
