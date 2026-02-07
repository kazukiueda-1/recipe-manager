import type { Recipe } from '../../types/index.ts';
import RecipeCard from './RecipeCard.tsx';

export default function RecipeList({ recipes }: { recipes: Recipe[] }) {
  if (recipes.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-5xl mb-4">📝</p>
        <p className="text-neutral-600 font-medium">レシピがまだありません</p>
        <p className="text-sm text-neutral-400 mt-2">右下のボタンから新しいレシピを追加してみましょう</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
      {recipes.map(recipe => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}
