import type { Recipe } from '../../types/index.ts';
import { formatCookingTime } from '../../utils/format.ts';

export default function RecipeDetail({ recipe }: { recipe: Recipe }) {
  return (
    <div className="max-w-2xl mx-auto">
      {recipe.thumbnailUrl && (
        <div className="aspect-video rounded-xl overflow-hidden mb-6">
          <img src={recipe.thumbnailUrl} alt={recipe.title} className="w-full h-full object-cover" />
        </div>
      )}

      <div className="flex items-center gap-3 mb-2 flex-wrap">
        {recipe.category && (
          <span className="text-xs bg-primary-100 text-primary-600 px-2 py-0.5 rounded-full">{recipe.category}</span>
        )}
        {recipe.tags.map(tag => (
          <span key={tag} className="text-xs bg-secondary-100 text-secondary-500 px-2 py-0.5 rounded-full">{tag}</span>
        ))}
      </div>

      {recipe.description && (
        <p className="text-neutral-600 text-sm mb-6">{recipe.description}</p>
      )}

      <div className="flex gap-4 text-sm text-neutral-500 mb-6">
        {recipe.cookingTime > 0 && <span>🕐 {formatCookingTime(recipe.cookingTime)}</span>}
        {recipe.servings && <span>🍽️ {recipe.servings}</span>}
        {recipe.sourceName && <span>📖 {recipe.sourceName}</span>}
      </div>

      {recipe.ingredients.length > 0 && (
        <section className="mb-6">
          <h2 className="text-base font-bold text-neutral-800 mb-3 border-b border-neutral-200 pb-2">材料</h2>
          <ul className="space-y-1">
            {recipe.ingredients.map((ing, i) => (
              <li key={i} className="flex justify-between text-sm py-1 border-b border-neutral-100">
                <span className="text-neutral-700">{ing.name}</span>
                <span className="text-neutral-500">{ing.amount}{ing.unit}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {recipe.steps.length > 0 && (
        <section className="mb-6">
          <h2 className="text-base font-bold text-neutral-800 mb-3 border-b border-neutral-200 pb-2">手順</h2>
          <ol className="space-y-3">
            {recipe.steps.map((step) => (
              <li key={step.order} className="flex gap-3 text-sm">
                <span className="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xs font-bold">
                  {step.order}
                </span>
                <span className="text-neutral-700 pt-0.5">{step.instruction}</span>
              </li>
            ))}
          </ol>
        </section>
      )}

      {recipe.memo && (
        <section className="mb-6">
          <h2 className="text-base font-bold text-neutral-800 mb-3 border-b border-neutral-200 pb-2">メモ</h2>
          <p className="text-sm text-neutral-600 whitespace-pre-wrap">{recipe.memo}</p>
        </section>
      )}

      {recipe.sourceUrl && (
        <section className="mb-6">
          <a href={recipe.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-primary-500 hover:underline">
            元のレシピを見る →
          </a>
        </section>
      )}
    </div>
  );
}
