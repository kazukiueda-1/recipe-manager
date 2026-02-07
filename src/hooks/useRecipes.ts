import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore';
import { db } from '../lib/firebase.ts';
import type { Recipe } from '../types/index.ts';

export function useRecipes(userId?: string) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const constraints = [];
      if (userId) {
        constraints.push(where('userId', '==', userId));
      }
      constraints.push(orderBy('createdAt', 'desc'));
      const q = query(collection(db, 'recipes'), ...constraints);
      const snap = await getDocs(q);
      setRecipes(snap.docs.map(d => ({ id: d.id, ...d.data() } as Recipe)));
    } catch (e) {
      console.error('Recipes load error:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [userId]);

  return { recipes, loading, reload: load };
}
