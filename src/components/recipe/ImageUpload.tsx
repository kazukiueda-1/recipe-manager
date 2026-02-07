import { useRef } from 'react';
import { useImageUpload } from '../../hooks/useImageUpload.ts';

interface Props {
  currentUrl: string | null;
  onUpload: (url: string) => void;
}

export default function ImageUpload({ currentUrl, onUpload }: Props) {
  const { upload, uploading } = useImageUpload();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await upload(file);
    onUpload(url);
  };

  return (
    <div>
      <label className="text-sm font-medium text-neutral-600 block mb-2">サムネイル画像</label>
      <div
        onClick={() => inputRef.current?.click()}
        className="aspect-video rounded-lg border-2 border-dashed border-neutral-300 hover:border-primary-400 cursor-pointer flex items-center justify-center overflow-hidden transition-colors"
      >
        {uploading ? (
          <div className="text-sm text-neutral-500">アップロード中...</div>
        ) : currentUrl ? (
          <img src={currentUrl} alt="サムネイル" className="w-full h-full object-cover" />
        ) : (
          <div className="text-center text-neutral-400">
            <p className="text-2xl mb-1">📷</p>
            <p className="text-xs">クリックして画像を選択</p>
          </div>
        )}
      </div>
      <input ref={inputRef} type="file" accept="image/*" onChange={handleChange} className="hidden" />
    </div>
  );
}
