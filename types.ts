export enum DietaryType {
  VEGAN = 'Vegan',
  VEGETARIAN = 'Vegetarian',
  GLUTEN_FREE = 'Gluten-Free',
  SPICY = 'Spicy',
  CONTAINS_NUTS = 'Contains Nuts'
}

export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  image: string;
  dietaryTags: DietaryType[];
  calories?: number;
  pairing?: string; // Wine pairing suggestion
}

export interface Category {
  id: string;
  name: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}