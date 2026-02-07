import { useState } from 'react';
import { useSettings } from '../../contexts/SettingsContext.tsx';
import Button from '../common/Button.tsx';
import Input from '../common/Input.tsx';

export default function CategoryManager() {
  const { categories, tags, setCategories, setTags } = useSettings();
  const [newCategory, setNewCategory] = useState('');
  const [newTag, setNewTag] = useState('');

  const addCategory = () => {
    const v = newCategory.trim();
    if (!v || categories.includes(v)) return;
    setCategories([...categories, v]);
    setNewCategory('');
  };

  const removeCategory = (cat: string) => {
    setCategories(categories.filter(c => c !== cat));
  };

  const addTag = () => {
    const v = newTag.trim();
    if (!v || tags.includes(v)) return;
    setTags([...tags, v]);
    setNewTag('');
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-base font-bold text-neutral-800 mb-3">カテゴリ管理</h2>
        <div className="flex gap-2 mb-3">
          <Input
            value={newCategory}
            onChange={e => setNewCategory(e.target.value)}
            placeholder="新しいカテゴリ"
            className="flex-1"
            onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addCategory())}
          />
          <Button onClick={addCategory}>追加</Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <span key={cat} className="inline-flex items-center gap-1 bg-primary-100 text-primary-600 px-3 py-1 rounded-full text-sm">
              {cat}
              <button onClick={() => removeCategory(cat)} className="text-primary-400 hover:text-primary-600 bg-transparent border-none cursor-pointer">×</button>
            </span>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-base font-bold text-neutral-800 mb-3">タグ管理</h2>
        <div className="flex gap-2 mb-3">
          <Input
            value={newTag}
            onChange={e => setNewTag(e.target.value)}
            placeholder="新しいタグ"
            className="flex-1"
            onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())}
          />
          <Button onClick={addTag}>追加</Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <span key={tag} className="inline-flex items-center gap-1 bg-secondary-100 text-secondary-500 px-3 py-1 rounded-full text-sm">
              {tag}
              <button onClick={() => removeTag(tag)} className="text-secondary-400 hover:text-secondary-500 bg-transparent border-none cursor-pointer">×</button>
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
