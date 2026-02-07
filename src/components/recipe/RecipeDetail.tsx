import type { Recipe } from '../../types/index.ts';
import { formatCookingTime } from '../../utils/format.ts';

export default function RecipeDetail({ recipe }: { recipe: Recipe }) {
  return (
    <div className="max-w-2xl mx-auto pb-20 sm:pb-0">
      {recipe.thumbnailUrl && (
        <div className="aspect-video rounded-2xl overflow-hidden mb-6">
          <img src={recipe.thumbnailUrl} alt={recipe.title} className="w-full h-full object-cover" />
        </div>
      )}

      <div className="flex items-center gap-2 mb-3 flex-wrap">
        {recipe.category && (
          <span className="text-xs bg-primary-100 text-primary-600 px-2.5 py-1 rounded-full font-medium">{recipe.category}</span>
        )}
        {recipe.tags.map(tag => (
          <span key={tag} className="text-xs bg-secondary-100 text-secondary-500 px-2.5 py-1 rounded-full">{tag}</span>
        ))}
      </div>

      {recipe.description && (
        <p className="text-neutral-600 text-sm mb-6">{recipe.description}</p>
      )}

      <div className="flex gap-3 mb-6 flex-wrap">
        {recipe.cookingTime > 0 && (
          <span className="text-sm text-neutral-600 bg-accent-cream rounded-lg px-3 py-1.5">🕐 {formatCookingTime(recipe.cookingTime)}</span>
        )}
        {recipe.servings && (
          <span className="text-sm text-neutral-600 bg-accent-mint rounded-lg px-3 py-1.5">🍽️ {recipe.servings}</span>
        )}
        {recipe.sourceName && (
          <span className="text-sm text-neutral-600 bg-accent-lavender rounded-lg px-3 py-1.5">📖 {recipe.sourceName}</span>
        )}
      </div>

      {recipe.ingredients.length > 0 && (
        <section className="bg-white rounded-xl p-4 shadow-sm mb-4">
          <h2 className="text-base font-bold text-neutral-800 mb-3">🥕 材料</h2>
          <ul className="space-y-0">
            {recipe.ingredients.map((ing, i) => (
              <li key={i} className={`flex justify-between text-sm py-2.5 px-2 rounded ${i % 2 === 0 ? 'bg-neutral-50' : ''}`}>
                <span className="text-neutral-700">{ing.name}</span>
                <span className="text-neutral-500">{ing.amount}{ing.unit}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {recipe.steps.length > 0 && (
        <section className="bg-white rounded-xl p-4 shadow-sm mb-4">
          <h2 className="text-base font-bold text-neutral-800 mb-3">👨‍🍳 手順</h2>
          <ol className="space-y-4">
            {recipe.steps.map((step) => (
              <li key={step.order} className="flex gap-3 text-sm">
                <span className="flex-shrink-0 w-7 h-7 bg-primary-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                  {step.order}
                </span>
                <span className="text-neutral-700 pt-1">{step.instruction}</span>
              </li>
            ))}
          </ol>
        </section>
      )}

      {recipe.memo && (
        <section className="bg-white rounded-xl p-4 shadow-sm mb-4">
          <h2 className="text-base font-bold text-neutral-800 mb-3">📝 メモ</h2>
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
