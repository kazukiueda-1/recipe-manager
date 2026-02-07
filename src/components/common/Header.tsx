import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.tsx';

export default function Header() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === '/recipe-manager/' || location.pathname === '/recipe-manager';

  return (
    <header className="bg-white border-b border-neutral-200 sticky top-0 z-40">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/recipe-manager/recipes" className="text-lg font-bold text-primary-500 no-underline">
          レシピノート
        </Link>
        {currentUser && !isHome && (
          <div className="flex items-center gap-3">
            <Link to="/recipe-manager/settings" className="text-neutral-500 hover:text-neutral-700 text-sm no-underline">
              設定
            </Link>
            <button
              onClick={() => { logout(); navigate('/recipe-manager/'); }}
              className="flex items-center gap-1 text-sm text-neutral-500 hover:text-neutral-700 bg-transparent border-none cursor-pointer"
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
