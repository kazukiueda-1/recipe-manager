import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ImageImport from '../components/import/ImageImport.tsx';
import RecipeForm from '../components/recipe/RecipeForm.tsx';
import type { RecipeFormValues } from '../components/recipe/RecipeForm.tsx';
import { useRecipe } from '../hooks/useRecipe.ts';
import type { Recipe } from '../types/index.ts';

export default function ImageImportPage() {
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
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-xl font-bold text-neutral-800 mb-6">画像からレシピを追加</h1>
      {!parsed ? (
        <ImageImport onParsed={handleParsed} />
      ) : (
        <>
          <p className="text-sm text-secondary-500 mb-4">レシピを解析しました。内容を確認・修正してから保存してください。</p>
          <RecipeForm initial={parsed} onSubmit={handleSubmit} loading={saving} />
        </>
      )}
    </div>
  );
}
