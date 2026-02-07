import type { Step } from '../../types/index.ts';

interface Props {
  steps: Step[];
  onChange: (steps: Step[]) => void;
}

export default function StepInput({ steps, onChange }: Props) {
  const update = (index: number, instruction: string) => {
    const next = [...steps];
    next[index] = { ...next[index], instruction };
    onChange(next);
  };

  const add = () => onChange([...steps, { order: steps.length + 1, instruction: '' }]);
  const remove = (index: number) => {
    const next = steps.filter((_, i) => i !== index).map((s, i) => ({ ...s, order: i + 1 }));
    onChange(next);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium text-neutral-600">手順</label>
        <button type="button" onClick={add} className="text-xs text-primary-500 hover:text-primary-600 bg-transparent border-none cursor-pointer">
          + 追加
        </button>
      </div>
      <div className="space-y-2">
        {steps.map((step, i) => (
          <div key={i} className="flex gap-2 items-start">
            <span className="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xs font-bold mt-1.5">
              {step.order}
            </span>
            <textarea
              value={step.instruction}
              onChange={e => update(i, e.target.value)}
              placeholder={`手順${step.order}`}
              rows={2}
              className="flex-1 rounded-lg border border-neutral-300 px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 resize-none"
            />
            <button type="button" onClick={() => remove(i)} className="text-neutral-400 hover:text-red-500 bg-transparent border-none cursor-pointer text-lg mt-1">
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
