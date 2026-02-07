import type { Timestamp } from 'firebase/firestore';

export interface User {
  id: string;
  name: string;
  icon: string;
  createdAt: Timestamp;
}

export interface Ingredient {
  name: string;
  amount: string;
  unit: string;
}

export interface Step {
  order: number;
  instruction: string;
}

export interface Recipe {
  id: string;
  userId: string;
  title: string;
  description: string;
  ingredients: Ingredient[];
  steps: Step[];
  servings: string;
  cookingTime: number;
  category: string;
  tags: string[];
  sourceType: 'url' | 'voice' | 'manual';
  sourceUrl: string | null;
  sourceName: string | null;
  thumbnailUrl: string | null;
  memo: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface AppSettings {
  id: 'global';
  categories: string[];
  tags: string[];
}

export type RecipeFormData = Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'>;
