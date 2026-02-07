import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.tsx';
import { useUsers } from '../hooks/useUsers.ts';
import Loading from '../components/common/Loading.tsx';
import Modal from '../components/common/Modal.tsx';
import Input from '../components/common/Input.tsx';

const EMOJI_OPTIONS = ['👩', '👧', '👨', '👦', '👵', '👴', '🧑', '👶'];

export default function HomePage() {
  const { setCurrentUser } = useAuth();
  const { users, loading, addUser } = useUsers();
  const navigate = useNavigate();
  const [showAdd, setShowAdd] = useState(false);
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('🧑');

  const handleSelect = (user: typeof users[0]) => {
    setCurrentUser(user);
    navigate('/recipe-manager/recipes');
  };

  const handleAdd = async () => {
    if (!name.trim()) return;
    await addUser(name.trim(), icon);
    setName('');
    setIcon('🧑');
    setShowAdd(false);
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-b from-accent-cream to-white">
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold text-primary-500 mb-2 text-center flex items-center justify-center gap-2">
          <span>🍳</span>
          <span>レシピノート</span>
        </h1>
        <p className="text-sm text-neutral-500 mb-8 text-center">使う人を選んでください</p>
      </div>
      <div className="flex flex-wrap justify-center gap-4 animate-slide-up">
        {users.map(user => (
          <button
            key={user.id}
            onClick={() => handleSelect(user)}
            className="flex flex-col items-center gap-2 bg-gradient-to-br from-white to-accent-cream/50 rounded-xl shadow-sm hover:shadow-md p-6 w-32 transition-all duration-200 active:scale-95 border-none cursor-pointer"
          >
            <span className="text-5xl">{user.icon}</span>
            <span className="font-medium text-neutral-700">{user.name}</span>
          </button>
        ))}
        <button
          onClick={() => { setShowAdd(true); setName(''); setIcon('🧑'); }}
          className="flex flex-col items-center justify-center gap-2 bg-white rounded-xl shadow-sm hover:shadow-md p-6 w-32 transition-all duration-200 active:scale-95 border-2 border-dashed border-neutral-300 cursor-pointer"
        >
          <span className="text-5xl text-neutral-400">＋</span>
          <span className="font-medium text-neutral-400">追加</span>
        </button>
      </div>

      <Modal open={showAdd} onClose={() => setShowAdd(false)} title="アカウント追加" onConfirm={handleAdd} confirmLabel="追加">
        <div className="space-y-3">
          <Input label="名前" value={name} onChange={e => setName(e.target.value)} placeholder="名前を入力" />
          <div>
            <label className="text-sm font-medium text-neutral-600 block mb-1">アイコン</label>
            <div className="flex gap-2 flex-wrap">
              {EMOJI_OPTIONS.map(e => (
                <button key={e} type="button" onClick={() => setIcon(e)}
                  className={`text-2xl p-1 rounded cursor-pointer border-2 bg-transparent ${icon === e ? 'border-primary-500' : 'border-transparent'}`}>
                  {e}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
