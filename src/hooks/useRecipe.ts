import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, addDoc, deleteDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase.ts';
import type { Recipe, RecipeFormData } from '../types/index.ts';

export function useRecipe(id?: string) {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(!!id);

  useEffect(() => {
    if (!id) return;
    const load = async () => {
      try {
        const snap = await getDoc(doc(db, 'recipes', id));
        if (snap.exists()) {
          setRecipe({ id: snap.id, ...snap.data() } as Recipe);
        }
      } catch (e) {
        console.error('Recipe load error:', e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const saveRecipe = async (data: RecipeFormData, existingId?: string) => {
    if (existingId) {
      await setDoc(doc(db, 'recipes', existingId), {
        ...data,
        updatedAt: serverTimestamp(),
      }, { merge: true });
      return existingId;
    } else {
      const ref = await addDoc(collection(db, 'recipes'), {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      return ref.id;
    }
  };

  const removeRecipe = async (recipeId: string) => {
    await deleteDoc(doc(db, 'recipes', recipeId));
  };

  return { recipe, loading, saveRecipe, removeRecipe };
}
