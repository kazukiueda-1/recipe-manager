import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase.ts';
import type { Recipe } from '../types/index.ts';

export function useRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const q = query(collection(db, 'recipes'), orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      setRecipes(snap.docs.map(d => ({ id: d.id, ...d.data() } as Recipe)));
    } catch (e) {
      console.error('Recipes load error:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  return { recipes, loading, reload: load };
}
