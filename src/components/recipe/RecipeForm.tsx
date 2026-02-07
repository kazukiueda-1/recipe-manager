import { useState } from 'react';
import type { Recipe, Ingredient, Step } from '../../types/index.ts';
import { useAuth } from '../../contexts/AuthContext.tsx';
import { useSettings } from '../../contexts/SettingsContext.tsx';
import Button from '../common/Button.tsx';
import Input from '../common/Input.tsx';
import IngredientInput from './IngredientInput.tsx';
import StepInput from './StepInput.tsx';
import ImageUpload from './ImageUpload.tsx';

interface Props {
  initial?: Partial<Recipe>;
  onSubmit: (data: RecipeFormValues) => void;
  loading?: boolean;
}

export interface RecipeFormValues {
  title: string;
  description: string;
  ingredients: Ingredient[];
  steps: Step[];
  servings: string;
  cookingTime: number;
  category: string;
  tags: string[];
  sourceType: 'url' | 'voice' | 'manual' | 'image';
  sourceUrl: string | null;
  sourceName: string | null;
  thumbnailUrl: string | null;
  memo: string;
  userId: string;
}

export default function RecipeForm({ initial, onSubmit, loading }: Props) {
  const { currentUser } = useAuth();
  const { categories, tags: allTags } = useSettings();

  const [title, setTitle] = useState(initial?.title || '');
  const [description, setDescription] = useState(initial?.description || '');
  const [ingredients, setIngredients] = useState<Ingredient[]>(
    initial?.ingredients || [{ name: '', amount: '', unit: '' }]
  );
  const [steps, setSteps] = useState<Step[]>(
    initial?.steps || [{ order: 1, instruction: '' }]
  );
  const [servings, setServings] = useState(initial?.servings || '');
  const [cookingTime, setCookingTime] = useState(initial?.cookingTime || 0);
  const [category, setCategory] = useState(initial?.category || '');
  const [selectedTags, setSelectedTags] = useState<string[]>(initial?.tags || []);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(initial?.thumbnailUrl || null);
  const [memo, setMemo] = useState(initial?.memo || '');

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit({
      title: title.trim(),
      description,
      ingredients: ingredients.filter(i => i.name.trim()),
      steps: steps.filter(s => s.instruction.trim()).map((s, i) => ({ ...s, order: i + 1 })),
      servings,
      cookingTime,
      category,
      tags: selectedTags,
      sourceType: initial?.sourceType || 'manual',
      sourceUrl: initial?.sourceUrl || null,
      sourceName: initial?.sourceName || null,
      thumbnailUrl,
      memo,
      userId: currentUser?.id || '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-5">
      <ImageUpload currentUrl={thumbnailUrl} onUpload={setThumbnailUrl} />

      <Input label="タイトル" value={title} onChange={e => setTitle(e.target.value)} required placeholder="レシピ名を入力" />

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-neutral-600">説明</label>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="簡単な説明"
          rows={2}
          className="rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 resize-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input label="分量" value={servings} onChange={e => setServings(e.target.value)} placeholder="例: 2人分" />
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-neutral-600">調理時間（分）</label>
          <input
            type="number"
            min={0}
            value={cookingTime || ''}
            onChange={e => setCookingTime(Number(e.target.value))}
            placeholder="30"
            className="rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-neutral-600">カテゴリ</label>
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(category === cat ? '' : cat)}
              className={`px-3 py-1 rounded-full text-xs border cursor-pointer transition-colors ${
                category === cat
                  ? 'bg-primary-500 text-white border-primary-500'
                  : 'bg-white text-neutral-600 border-neutral-300 hover:border-primary-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-neutral-600">タグ</label>
        <div className="flex flex-wrap gap-2">
          {allTags.map(tag => (
            <button
              key={tag}
              type="button"
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1 rounded-full text-xs border cursor-pointer transition-colors ${
                selectedTags.includes(tag)
                  ? 'bg-secondary-500 text-white border-secondary-500'
                  : 'bg-white text-neutral-600 border-neutral-300 hover:border-secondary-300'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <IngredientInput ingredients={ingredients} onChange={setIngredients} />
      <StepInput steps={steps} onChange={setSteps} />

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-neutral-600">メモ</label>
        <textarea
          value={memo}
          onChange={e => setMemo(e.target.value)}
          placeholder="コツやポイントなど"
          rows={3}
          className="rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 resize-none"
        />
      </div>

      <div className="flex justify-end pt-4">
        <Button type="submit" disabled={loading || !title.trim()}>
          {loading ? '保存中...' : '保存する'}
        </Button>
      </div>
    </form>
  );
}
