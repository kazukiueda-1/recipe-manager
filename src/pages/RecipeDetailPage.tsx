import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { useRecipe } from '../hooks/useRecipe.ts';
import RecipeDetail from '../components/recipe/RecipeDetail.tsx';
import Loading from '../components/common/Loading.tsx';
import Button from '../components/common/Button.tsx';
import Modal from '../components/common/Modal.tsx';

export default function RecipeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { recipe, loading, removeRecipe } = useRecipe(id);
  const navigate = useNavigate();
  const [showDelete, setShowDelete] = useState(false);

  if (loading) return <Loading />;
  if (!recipe) return <div className="text-center py-16 text-neutral-500">レシピが見つかりません</div>;

  const handleDelete = async () => {
    await removeRecipe(recipe.id);
    navigate('/recipe-manager/recipes');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-neutral-800">{recipe.title}</h1>
        <div className="hidden sm:flex gap-2">
          <Link to={`/recipe-manager/recipes/${recipe.id}/edit`}>
            <Button variant="secondary">編集</Button>
          </Link>
          <Button variant="danger" onClick={() => setShowDelete(true)}>削除</Button>
        </div>
      </div>

      <RecipeDetail recipe={recipe} />

      {/* Mobile bottom action bar */}
      <div className="fixed bottom-0 left-0 right-0 sm:hidden bg-white border-t border-neutral-200 px-4 py-3 flex gap-2 z-30 shadow-[0_-2px_8px_rgba(0,0,0,0.06)]">
        <Link to={`/recipe-manager/recipes/${recipe.id}/edit`} className="flex-1 no-underline">
          <Button variant="secondary" className="w-full">編集</Button>
        </Link>
        <Button variant="danger" onClick={() => setShowDelete(true)} className="flex-1">削除</Button>
      </div>

      <Modal open={showDelete} onClose={() => setShowDelete(false)} title="レシピを削除" onConfirm={handleDelete} confirmLabel="削除" confirmVariant="danger">
        <p className="text-sm text-neutral-600">「{recipe.title}」を削除しますか？この操作は取り消せません。</p>
      </Modal>
    </div>
  );
}
