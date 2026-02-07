import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useRecipe } from '../hooks/useRecipe.ts';
import RecipeForm from '../components/recipe/RecipeForm.tsx';
import type { RecipeFormValues } from '../components/recipe/RecipeForm.tsx';

export default function RecipeNewPage() {
  const { saveRecipe } = useRecipe();
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);

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
      <h1 className="text-xl font-bold text-neutral-800 mb-6">新しいレシピ</h1>
      <RecipeForm onSubmit={handleSubmit} loading={saving} />
    </div>
  );
}
