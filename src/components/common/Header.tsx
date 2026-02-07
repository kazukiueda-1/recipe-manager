import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.tsx';

export default function Header() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === '/recipe-manager/' || location.pathname === '/recipe-manager';

  return (
    <header className="bg-gradient-to-b from-white to-accent-cream/50 border-b border-neutral-100 sticky top-0 z-40 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/recipe-manager/recipes" className="flex items-center gap-1.5 text-lg font-bold text-primary-500 no-underline">
          <span>🍳</span>
          <span>レシピノート</span>
        </Link>
        {currentUser && !isHome && (
          <div className="flex items-center gap-3">
            <Link to="/recipe-manager/settings" className="text-neutral-500 hover:text-neutral-700 text-sm no-underline">
              設定
            </Link>
            <button
              onClick={() => { logout(); navigate('/recipe-manager/'); }}
              className="flex items-center gap-1.5 text-sm bg-primary-50 text-primary-600 rounded-full px-3 py-1 border-none cursor-pointer hover:bg-primary-100 transition-colors"
            >
              <span>{currentUser.icon}</span>
              <span>{currentUser.name}</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
