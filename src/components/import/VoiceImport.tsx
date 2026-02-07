import { useState } from 'react';
import Button from '../common/Button.tsx';
import { useVoiceRecognition } from '../../hooks/useVoiceRecognition.ts';
import { parseVoiceText } from '../../lib/api.ts';

interface Props {
  onParsed: (data: Record<string, unknown>) => void;
}

export default function VoiceImport({ onParsed }: Props) {
  const { transcript, setTranscript, isListening, error: voiceError, start, stop, reset } = useVoiceRecognition();
  const [parsing, setParsing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleParse = async () => {
    if (!transcript.trim()) return;
    setParsing(true);
    setError(null);
    try {
      const data = await parseVoiceText(transcript.trim());
      onParsed({ ...data, sourceType: 'voice' });
    } catch {
      setError('テキストの解析に失敗しました');
    } finally {
      setParsing(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        {isListening ? (
          <button
            onClick={stop}
            className="w-20 h-20 rounded-full bg-red-500 text-white text-3xl border-none cursor-pointer animate-pulse"
          >
            🎤
          </button>
        ) : (
          <button
            onClick={start}
            className="w-20 h-20 rounded-full bg-primary-500 text-white text-3xl border-none cursor-pointer hover:bg-primary-600 transition-colors"
          >
            🎤
          </button>
        )}
        <p className="text-sm text-neutral-500 mt-2">
          {isListening ? '録音中...タップで停止' : 'タップして音声入力開始'}
        </p>
      </div>

      {(voiceError || error) && (
        <p className="text-sm text-red-500 text-center">{voiceError || error}</p>
      )}

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-neutral-600">認識されたテキスト</label>
        <textarea
          value={transcript}
          onChange={e => setTranscript(e.target.value)}
          rows={6}
          placeholder="音声で話した内容がここに表示されます。手動で編集もできます。"
          className="rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 resize-none"
        />
      </div>

      <div className="flex gap-2">
        <Button variant="secondary" type="button" onClick={reset}>クリア</Button>
        <Button type="button" onClick={handleParse} disabled={parsing || !transcript.trim()}>
          {parsing ? '解析中...' : 'レシピに変換'}
        </Button>
      </div>
    </div>
  );
}
