import type { Ingredient } from '../../types/index.ts';

interface Props {
  ingredients: Ingredient[];
  onChange: (ingredients: Ingredient[]) => void;
}

export default function IngredientInput({ ingredients, onChange }: Props) {
  const update = (index: number, field: keyof Ingredient, value: string) => {
    const next = [...ingredients];
    next[index] = { ...next[index], [field]: value };
    onChange(next);
  };

  const add = () => onChange([...ingredients, { name: '', amount: '', unit: '' }]);
  const remove = (index: number) => onChange(ingredients.filter((_, i) => i !== index));

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium text-neutral-600">材料</label>
        <button type="button" onClick={add} className="text-xs text-primary-500 hover:text-primary-600 bg-transparent border-none cursor-pointer">
          + 追加
        </button>
      </div>
      <div className="space-y-2">
        {ingredients.map((ing, i) => (
          <div key={i} className="flex gap-2 items-center">
            <input
              placeholder="材料名"
              value={ing.name}
              onChange={e => update(i, 'name', e.target.value)}
              className="flex-1 rounded-lg border border-neutral-300 px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400"
            />
            <input
              placeholder="量"
              value={ing.amount}
              onChange={e => update(i, 'amount', e.target.value)}
              className="w-16 rounded-lg border border-neutral-300 px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400"
            />
            <input
              placeholder="単位"
              value={ing.unit}
              onChange={e => update(i, 'unit', e.target.value)}
              className="w-14 rounded-lg border border-neutral-300 px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400"
            />
            <button type="button" onClick={() => remove(i)} className="text-neutral-400 hover:text-red-500 bg-transparent border-none cursor-pointer text-lg">
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
