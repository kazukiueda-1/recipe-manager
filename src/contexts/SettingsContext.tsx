import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase.ts';
import type { AppSettings } from '../types/index.ts';

const DEFAULT_CATEGORIES = ['主菜', '副菜', '汁物', 'ご飯もの', '麺類', 'デザート'];
const DEFAULT_TAGS = ['和食', '洋食', '中華', '韓国', 'エスニック'];

interface SettingsContextType {
  categories: string[];
  tags: string[];
  setCategories: (categories: string[]) => void;
  setTags: (tags: string[]) => void;
  loading: boolean;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [categories, setCategoriesState] = useState<string[]>(DEFAULT_CATEGORIES);
  const [tags, setTagsState] = useState<string[]>(DEFAULT_TAGS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const snap = await getDoc(doc(db, 'settings', 'global'));
        if (snap.exists()) {
          const data = snap.data() as AppSettings;
          setCategoriesState(data.categories);
          setTagsState(data.tags);
        } else {
          await setDoc(doc(db, 'settings', 'global'), {
            id: 'global',
            categories: DEFAULT_CATEGORIES,
            tags: DEFAULT_TAGS,
          });
        }
      } catch (e) {
        console.error('Settings load error:', e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const setCategories = async (newCategories: string[]) => {
    setCategoriesState(newCategories);
    await setDoc(doc(db, 'settings', 'global'), { categories: newCategories }, { merge: true });
  };

  const setTags = async (newTags: string[]) => {
    setTagsState(newTags);
    await setDoc(doc(db, 'settings', 'global'), { tags: newTags }, { merge: true });
  };

  return (
    <SettingsContext.Provider value={{ categories, tags, setCategories, setTags, loading }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) throw new Error('useSettings must be used within SettingsProvider');
  return context;
}
