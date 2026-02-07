import { Link } from 'react-router-dom';
import MemberManager from '../components/settings/MemberManager.tsx';
import CategoryManager from '../components/settings/CategoryManager.tsx';

export default function SettingsPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-neutral-800">設定</h1>
        <Link to="/recipe-manager/recipes" className="text-sm text-primary-500 hover:underline no-underline">← レシピ一覧に戻る</Link>
      </div>

      <div className="space-y-8">
        <section className="bg-white rounded-xl p-5 border border-neutral-200">
          <MemberManager />
        </section>
        <section className="bg-white rounded-xl p-5 border border-neutral-200">
          <CategoryManager />
        </section>
      </div>
    </div>
  );
}
