import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase.ts';
import type { User } from '../types/index.ts';

const INITIAL_USERS = [
  { name: 'まきこ', icon: '👩' },
  { name: 'あゆみ', icon: '👧' },
];

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const snap = await getDocs(collection(db, 'users'));
      if (snap.empty) {
        for (const u of INITIAL_USERS) {
          await addDoc(collection(db, 'users'), { ...u, createdAt: serverTimestamp() });
        }
        return load();
      }
      setUsers(snap.docs.map(d => ({ id: d.id, ...d.data() } as User)));
    } catch (e) {
      console.error('Users load error:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const addUser = async (name: string, icon: string) => {
    await addDoc(collection(db, 'users'), { name, icon, createdAt: serverTimestamp() });
    await load();
  };

  const updateUser = async (id: string, name: string, icon: string) => {
    await updateDoc(doc(db, 'users', id), { name, icon });
    await load();
  };

  const deleteUser = async (id: string) => {
    await deleteDoc(doc(db, 'users', id));
    await load();
  };

  return { users, loading, addUser, updateUser, deleteUser, reload: load };
}
