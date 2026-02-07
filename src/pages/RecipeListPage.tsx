import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useRecipes } from '../hooks/useRecipes.ts';
import { useAuth } from '../contexts/AuthContext.tsx';
import { useSettings } from '../contexts/SettingsContext.tsx';
import RecipeList from '../components/recipe/RecipeList.tsx';
import Loading from '../components/common/Loading.tsx';
import type { Recipe } from '../types/index.ts';

export default function RecipeListPage() {
  const { currentUser } = useAuth();
  const { recipes, loading } = useRecipes(currentUser?.id);
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
    <div className="max-w-5xl mx-auto px-4 py-6 animate-fade-in">
      <div className="mb-6 relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 text-sm pointer-events-none">🔍</span>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="レシピを検索..."
          className="w-full rounded-xl border border-neutral-200 pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 bg-white shadow-sm"
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setFilterCategory('')}
          className={`px-3.5 py-1.5 rounded-full text-xs border cursor-pointer transition-all shadow-sm ${
            !filterCategory ? 'bg-primary-500 text-white border-primary-500' : 'bg-white text-neutral-600 border-neutral-200'
          }`}
        >
          すべて
        </button>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilterCategory(filterCategory === cat ? '' : cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs border cursor-pointer transition-all shadow-sm ${
              filterCategory === cat ? 'bg-primary-500 text-white border-primary-500' : 'bg-white text-neutral-600 border-neutral-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <p className="text-xs text-neutral-400 mb-4">{filtered.length}品のレシピ</p>

      <RecipeList recipes={filtered} />

      <div className="fixed bottom-6 right-4 flex flex-col items-end gap-3">
        <Link
          to="/recipe-manager/recipes/new/image"
          className="flex items-center gap-2 no-underline group"
        >
          <span className="text-xs text-neutral-500 bg-white rounded-full px-2 py-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity">画像</span>
          <span className="w-11 h-11 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors text-lg">
            📷
          </span>
        </Link>
        <Link
          to="/recipe-manager/recipes/new/voice"
          className="flex items-center gap-2 no-underline group"
        >
          <span className="text-xs text-neutral-500 bg-white rounded-full px-2 py-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity">音声</span>
          <span className="w-11 h-11 rounded-full bg-accent-peach text-neutral-700 flex items-center justify-center shadow-lg hover:opacity-90 transition-colors text-lg">
            🎤
          </span>
        </Link>
        <Link
          to="/recipe-manager/recipes/new/url"
          className="flex items-center gap-2 no-underline group"
        >
          <span className="text-xs text-neutral-500 bg-white rounded-full px-2 py-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity">URL</span>
          <span className="w-11 h-11 rounded-full bg-secondary-500 text-white flex items-center justify-center shadow-lg hover:bg-secondary-400 transition-colors text-lg">
            🔗
          </span>
        </Link>
        <Link
          to="/recipe-manager/recipes/new"
          className="flex items-center gap-2 no-underline group"
        >
          <span className="text-xs text-neutral-500 bg-white rounded-full px-2 py-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity">手動</span>
          <span className="w-14 h-14 rounded-full bg-primary-500 text-white flex items-center justify-center shadow-xl hover:bg-primary-600 transition-colors text-2xl font-bold">
            +
          </span>
        </Link>
      </div>
    </div>
  );
}
