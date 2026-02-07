import { useState } from 'react';
import Button from '../common/Button.tsx';
import Input from '../common/Input.tsx';
import { scrapeAndParseRecipe } from '../../lib/api.ts';

interface Props {
  onParsed: (data: Record<string, unknown>) => void;
}

export default function UrlImport({ onParsed }: Props) {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const data = await scrapeAndParseRecipe(url.trim());
      onParsed({ ...data, sourceType: 'url', sourceUrl: url.trim() });
    } catch {
      setError('レシピの取得に失敗しました。URLを確認してください。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="レシピURL"
        value={url}
        onChange={e => setUrl(e.target.value)}
        placeholder="https://cookpad.com/recipe/..."
        type="url"
        required
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
      <Button type="submit" disabled={loading || !url.trim()}>
        {loading ? '解析中...' : 'レシピを取得'}
      </Button>
    </form>
  );
}
