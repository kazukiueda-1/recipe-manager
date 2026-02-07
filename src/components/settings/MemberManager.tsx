import { useState } from 'react';
import { useUsers } from '../../hooks/useUsers.ts';
import Button from '../common/Button.tsx';
import Input from '../common/Input.tsx';
import Modal from '../common/Modal.tsx';
import Loading from '../common/Loading.tsx';

const EMOJI_OPTIONS = ['👩', '👧', '👨', '👦', '👵', '👴', '🧑', '👶'];

export default function MemberManager() {
  const { users, loading, addUser, updateUser, deleteUser } = useUsers();
  const [showAdd, setShowAdd] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('🧑');

  if (loading) return <Loading />;

  const handleAdd = async () => {
    if (!name.trim()) return;
    await addUser(name.trim(), icon);
    setName('');
    setIcon('🧑');
    setShowAdd(false);
  };

  const handleEdit = async () => {
    if (!editId || !name.trim()) return;
    await updateUser(editId, name.trim(), icon);
    setEditId(null);
    setName('');
    setIcon('🧑');
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    await deleteUser(deleteId);
    setDeleteId(null);
  };

  const startEdit = (id: string) => {
    const user = users.find(u => u.id === id);
    if (!user) return;
    setEditId(id);
    setName(user.name);
    setIcon(user.icon);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold text-neutral-800">メンバー管理</h2>
        <Button onClick={() => { setShowAdd(true); setName(''); setIcon('🧑'); }}>追加</Button>
      </div>

      <div className="space-y-2">
        {users.map(user => (
          <div key={user.id} className="flex items-center justify-between bg-white rounded-lg p-3 border border-neutral-200">
            <div className="flex items-center gap-2">
              <span className="text-xl">{user.icon}</span>
              <span className="font-medium text-neutral-700">{user.name}</span>
            </div>
            <div className="flex gap-2">
              <button onClick={() => startEdit(user.id)} className="text-xs text-primary-500 hover:underline bg-transparent border-none cursor-pointer">編集</button>
              <button onClick={() => setDeleteId(user.id)} className="text-xs text-red-500 hover:underline bg-transparent border-none cursor-pointer">削除</button>
            </div>
          </div>
        ))}
      </div>

      <Modal open={showAdd} onClose={() => setShowAdd(false)} title="メンバー追加" onConfirm={handleAdd} confirmLabel="追加">
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

      <Modal open={!!editId} onClose={() => setEditId(null)} title="メンバー編集" onConfirm={handleEdit} confirmLabel="保存">
        <div className="space-y-3">
          <Input label="名前" value={name} onChange={e => setName(e.target.value)} />
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

      <Modal open={!!deleteId} onClose={() => setDeleteId(null)} title="メンバー削除" onConfirm={handleDelete} confirmLabel="削除" confirmVariant="danger">
        <p className="text-sm text-neutral-600">このメンバーを削除しますか？</p>
      </Modal>
    </div>
  );
}
