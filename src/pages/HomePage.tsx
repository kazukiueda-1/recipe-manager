import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.tsx';
import { useUsers } from '../hooks/useUsers.ts';
import Loading from '../components/common/Loading.tsx';
import Modal from '../components/common/Modal.tsx';
import Input from '../components/common/Input.tsx';

const EMOJI_OPTIONS = ['👩', '👧', '👨', '👦', '👵', '👴', '🧑', '👶'];

const FLOATING_DECORATIONS = [
  { content: '🍰', top: '8%', left: '5%', size: 'text-3xl', duration: '6s', delay: '0s', opacity: 'opacity-30' },
  { content: '🧁', top: '15%', right: '8%', size: 'text-2xl', duration: '7s', delay: '1s', opacity: 'opacity-25' },
  { content: '🍩', top: '60%', left: '3%', size: 'text-2xl', duration: '8s', delay: '2s', opacity: 'opacity-20' },
  { content: '🍪', top: '75%', right: '6%', size: 'text-3xl', duration: '6.5s', delay: '0.5s', opacity: 'opacity-25' },
  { content: '🍓', top: '35%', left: '8%', size: 'text-xl', duration: '7.5s', delay: '3s', opacity: 'opacity-30' },
  { content: '🌸', top: '20%', left: '85%', size: 'text-2xl', duration: '9s', delay: '1.5s', opacity: 'opacity-20' },
  { content: '🌸', top: '50%', right: '12%', size: 'text-xl', duration: '7s', delay: '4s', opacity: 'opacity-15' },
  { content: '🍰', top: '85%', left: '15%', size: 'text-xl', duration: '8.5s', delay: '2.5s', opacity: 'opacity-20' },
  { content: '', top: '45%', left: '90%', size: 'w-4 h-4', duration: '6s', delay: '1s', opacity: 'opacity-20', isCircle: true, color: 'bg-pink-300' },
  { content: '', top: '70%', left: '10%', size: 'w-3 h-3', duration: '7s', delay: '3.5s', opacity: 'opacity-15', isCircle: true, color: 'bg-purple-300' },
];

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
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #fce4ec 0%, #e8eaf6 40%, #e0f2f1 100%)' }}>

      {/* Floating decorations */}
      {FLOATING_DECORATIONS.map((deco, i) => (
        <div
          key={i}
          className={`absolute pointer-events-none ${deco.opacity} ${deco.size} ${deco.isCircle ? `${deco.color} rounded-full` : ''}`}
          style={{
            top: deco.top,
            left: deco.left,
            right: deco.right,
            animation: `${i % 2 === 0 ? 'float' : 'floatDrift'} ${deco.duration} ease-in-out ${deco.delay} infinite`,
          }}
        >
          {deco.content}
        </div>
      ))}

      {/* Title */}
      <div className="animate-fade-in relative z-10">
        <h1 className="text-3xl font-bold mb-2 text-center flex items-center justify-center gap-2"
          style={{ color: '#d4637b', textShadow: '0 2px 8px rgba(212, 99, 123, 0.2)' }}>
          <span>🍳</span>
          <span>レシピノート</span>
        </h1>
        <p className="text-sm text-neutral-500 mb-8 text-center">使う人を選んでください</p>
      </div>

      {/* User cards */}
      <div className="flex flex-wrap justify-center gap-4 animate-slide-up relative z-10">
        {users.map(user => (
          <button
            key={user.id}
            onClick={() => handleSelect(user)}
            className="flex flex-col items-center gap-2 rounded-2xl p-6 w-32 cursor-pointer border-2 border-pink-200 transition-all duration-200 active:scale-95"
            style={{
              background: 'rgba(255, 255, 255, 0.85)',
              boxShadow: '0 4px 16px rgba(236, 166, 186, 0.25)',
            }}
            onMouseEnter={e => { e.currentTarget.style.animation = 'softBounce 0.4s ease'; }}
            onMouseLeave={e => { e.currentTarget.style.animation = ''; }}
          >
            <span className="text-5xl">{user.icon}</span>
            <span className="font-medium text-neutral-700">{user.name}</span>
          </button>
        ))}
        <button
          onClick={() => { setShowAdd(true); setName(''); setIcon('🧑'); }}
          className="flex flex-col items-center justify-center gap-2 rounded-2xl p-6 w-32 cursor-pointer transition-all duration-200 active:scale-95 border-2 border-dashed border-pink-300"
          style={{
            background: 'rgba(255, 255, 255, 0.7)',
            boxShadow: '0 4px 16px rgba(236, 166, 186, 0.15)',
          }}
        >
          <span className="text-5xl" style={{ color: '#e8a0b4' }}>＋</span>
          <span className="font-medium" style={{ color: '#e8a0b4' }}>追加</span>
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
