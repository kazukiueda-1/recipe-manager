import { useState, useRef } from 'react';
import Button from '../common/Button.tsx';
import { parseRecipeImage } from '../../lib/api.ts';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

interface Props {
  onParsed: (data: Record<string, unknown>) => void;
}

export default function ImageImport({ onParsed }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileRef = useRef<{ base64: string; mediaType: string } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError('対応形式: JPEG, PNG, GIF, WebP');
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError('ファイルサイズは5MB以下にしてください');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setPreview(dataUrl);
      const base64 = dataUrl.split(',')[1];
      fileRef.current = { base64, mediaType: file.type };
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (!fileRef.current) return;
    setLoading(true);
    setError(null);
    try {
      const data = await parseRecipeImage(fileRef.current.base64, fileRef.current.mediaType);
      onParsed({ ...data, sourceType: 'image' });
    } catch {
      setError('画像の解析に失敗しました。別の画像を試してください。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div
        onClick={() => inputRef.current?.click()}
        className="border-2 border-dashed border-neutral-300 rounded-lg p-8 text-center cursor-pointer hover:border-primary-400 transition-colors"
      >
        {preview ? (
          <img src={preview} alt="プレビュー" className="max-h-64 mx-auto rounded-lg" />
        ) : (
          <div className="text-neutral-400">
            <p className="text-3xl mb-2">📷</p>
            <p className="text-sm">タップして画像を選択</p>
            <p className="text-xs mt-1">JPEG, PNG, GIF, WebP（5MB以下）</p>
          </div>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/gif,image/webp"
        onChange={handleFileChange}
        className="hidden"
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
      <Button onClick={handleSubmit} disabled={loading || !fileRef.current}>
        {loading ? '解析中...' : 'レシピを解析'}
      </Button>
    </div>
  );
}
