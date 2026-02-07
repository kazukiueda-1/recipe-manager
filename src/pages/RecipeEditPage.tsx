import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useRecipe } from '../hooks/useRecipe.ts';
import RecipeForm from '../components/recipe/RecipeForm.tsx';
import type { RecipeFormValues } from '../components/recipe/RecipeForm.tsx';
import Loading from '../components/common/Loading.tsx';

export default function RecipeEditPage() {
  const { id } = useParams<{ id: string }>();
  const { recipe, loading, saveRecipe } = useRecipe(id);
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);

  if (loading) return <Loading />;
  if (!recipe) return <div className="text-center py-16 text-neutral-500">レシピが見つかりません</div>;

  const handleSubmit = async (data: RecipeFormValues) => {
    setSaving(true);
    try {
      await saveRecipe(data, recipe.id);
      navigate(`/recipe-manager/recipes/${recipe.id}`);
    } catch (e) {
      console.error('Save error:', e);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-xl font-bold text-neutral-800 mb-6">レシピを編集</h1>
      <RecipeForm initial={recipe} onSubmit={handleSubmit} loading={saving} />
    </div>
  );
}
