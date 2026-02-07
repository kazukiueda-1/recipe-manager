import type { Recipe } from '../../types/index.ts';
import RecipeCard from './RecipeCard.tsx';

export default function RecipeList({ recipes }: { recipes: Recipe[] }) {
  if (recipes.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-4xl mb-3">📝</p>
        <p className="text-neutral-500">レシピがまだありません</p>
        <p className="text-sm text-neutral-400 mt-1">新しいレシピを追加してみましょう</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {recipes.map(recipe => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}
