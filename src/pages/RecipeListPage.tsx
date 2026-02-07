import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useRecipes } from '../hooks/useRecipes.ts';
import { useSettings } from '../contexts/SettingsContext.tsx';
import RecipeList from '../components/recipe/RecipeList.tsx';
import Loading from '../components/common/Loading.tsx';
import type { Recipe } from '../types/index.ts';

export default function RecipeListPage() {
  const { recipes, loading } = useRecipes();
  const { categories } = useSettings();
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterTag, setFilterTag] = useState('');

  const filtered = useMemo(() => {
    let result: Recipe[] = recipes;
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(r =>
        r.title.toLowerCase().includes(q) ||
        r.ingredients.some(i => i.name.toLowerCase().includes(q)) ||
        r.steps.some(s => s.instruction.toLowerCase().includes(q))
      );
    }
    if (filterCategory) {
      result = result.filter(r => r.category === filterCategory);
    }
    if (filterTag) {
      result = result.filter(r => r.tags.includes(filterTag));
    }
    return result;
  }, [recipes, search, filterCategory, filterTag]);

  if (loading) return <Loading />;

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div className="mb-6">
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="レシピを検索..."
          className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 bg-white"
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setFilterCategory('')}
          className={`px-3 py-1 rounded-full text-xs border cursor-pointer transition-colors ${
            !filterCategory ? 'bg-primary-500 text-white border-primary-500' : 'bg-white text-neutral-600 border-neutral-300'
          }`}
        >
          すべて
        </button>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilterCategory(filterCategory === cat ? '' : cat)}
            className={`px-3 py-1 rounded-full text-xs border cursor-pointer transition-colors ${
              filterCategory === cat ? 'bg-primary-500 text-white border-primary-500' : 'bg-white text-neutral-600 border-neutral-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <RecipeList recipes={filtered} />

      <div className="fixed bottom-6 right-6 flex flex-col gap-2">
        <Link
          to="/recipe-manager/recipes/new"
          className="w-12 h-12 rounded-full bg-primary-500 text-white flex items-center justify-center shadow-lg hover:bg-primary-600 transition-colors text-xl no-underline"
          title="手動で追加"
        >
          +
        </Link>
        <Link
          to="/recipe-manager/recipes/new/url"
          className="w-12 h-12 rounded-full bg-secondary-500 text-white flex items-center justify-center shadow-lg hover:bg-secondary-400 transition-colors text-lg no-underline"
          title="URLから追加"
        >
          🔗
        </Link>
        <Link
          to="/recipe-manager/recipes/new/voice"
          className="w-12 h-12 rounded-full bg-accent-peach text-neutral-700 flex items-center justify-center shadow-lg hover:opacity-90 transition-colors text-lg no-underline"
          title="音声で追加"
        >
          🎤
        </Link>
      </div>
    </div>
  );
}
