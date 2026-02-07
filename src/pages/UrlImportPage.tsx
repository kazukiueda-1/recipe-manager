import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import UrlImport from '../components/import/UrlImport.tsx';
import RecipeForm from '../components/recipe/RecipeForm.tsx';
import type { RecipeFormValues } from '../components/recipe/RecipeForm.tsx';
import { useRecipe } from '../hooks/useRecipe.ts';
import type { Recipe } from '../types/index.ts';

export default function UrlImportPage() {
  const [parsed, setParsed] = useState<Partial<Recipe> | null>(null);
  const { saveRecipe } = useRecipe();
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);

  const handleParsed = (data: Record<string, unknown>) => {
    setParsed(data as Partial<Recipe>);
  };

  const handleSubmit = async (data: RecipeFormValues) => {
    setSaving(true);
    try {
      const newId = await saveRecipe(data);
      navigate(`/recipe-manager/recipes/${newId}`);
    } catch (e) {
      console.error('Save error:', e);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 animate-fade-in">
      <h1 className="text-xl font-bold text-neutral-800 mb-6">🔗 URLからレシピを追加</h1>

      <div className="flex items-center gap-2 mb-6">
        <div className={`flex items-center gap-1.5 ${!parsed ? 'text-primary-500' : 'text-neutral-400'}`}>
          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${!parsed ? 'bg-primary-500 text-white' : 'bg-neutral-200 text-neutral-500'}`}>1</span>
          <span className="text-xs font-medium">URL入力</span>
        </div>
        <div className="flex-1 h-px bg-neutral-200" />
        <div className={`flex items-center gap-1.5 ${parsed ? 'text-primary-500' : 'text-neutral-400'}`}>
          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${parsed ? 'bg-primary-500 text-white' : 'bg-neutral-200 text-neutral-500'}`}>2</span>
          <span className="text-xs font-medium">確認・保存</span>
        </div>
      </div>

      {!parsed ? (
        <UrlImport onParsed={handleParsed} />
      ) : (
        <>
          <p className="text-sm text-secondary-500 mb-4">レシピを取得しました。内容を確認・修正してから保存してください。</p>
          <RecipeForm initial={parsed} onSubmit={handleSubmit} loading={saving} />
        </>
      )}
    </div>
  );
}
