import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.tsx';
import { useUsers } from '../hooks/useUsers.ts';
import Loading from '../components/common/Loading.tsx';

export default function HomePage() {
  const { setCurrentUser } = useAuth();
  const { users, loading } = useUsers();
  const navigate = useNavigate();

  const handleSelect = (user: typeof users[0]) => {
    setCurrentUser(user);
    navigate('/recipe-manager/recipes');
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-accent-cream">
      <h1 className="text-2xl font-bold text-primary-500 mb-2">レシピノート</h1>
      <p className="text-sm text-neutral-500 mb-8">使う人を選んでください</p>
      <div className="flex flex-wrap justify-center gap-4">
        {users.map(user => (
          <button
            key={user.id}
            onClick={() => handleSelect(user)}
            className="flex flex-col items-center gap-2 bg-white rounded-xl shadow-sm hover:shadow-md p-6 w-32 transition-all duration-200 hover:-translate-y-0.5 border-none cursor-pointer"
          >
            <span className="text-4xl">{user.icon}</span>
            <span className="font-medium text-neutral-700">{user.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
