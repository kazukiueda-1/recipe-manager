import { Link } from 'react-router-dom';
import type { Recipe } from '../../types/index.ts';
import { formatCookingTime } from '../../utils/format.ts';

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Link
      to={`/recipe-manager/recipes/${recipe.id}`}
      className="block bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 active:scale-[0.97] overflow-hidden no-underline"
    >
      <div className="aspect-video bg-neutral-100 relative overflow-hidden">
        {recipe.thumbnailUrl ? (
          <>
            <img src={recipe.thumbnailUrl} alt={recipe.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl bg-gradient-to-br from-accent-cream to-accent-peach/50">
            🍽️
          </div>
        )}
        {recipe.category && (
          <span className="absolute top-2 left-2 text-[10px] bg-white/90 text-neutral-700 px-2 py-0.5 rounded-full font-medium shadow-sm">
            {recipe.category}
          </span>
        )}
      </div>
      <div className="p-3.5">
        <h3 className="font-bold text-neutral-800 text-sm line-clamp-1 mb-1.5">{recipe.title}</h3>
        <div className="flex items-center gap-2 text-xs text-neutral-400">
          {recipe.cookingTime > 0 && <span>🕐 {formatCookingTime(recipe.cookingTime)}</span>}
        </div>
      </div>
    </Link>
  );
}
