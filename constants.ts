import { Category, DietaryType, Dish } from './types';

export const RESTAURANT_NAME = "Kargil Kitchen";
export const RESTAURANT_TAGLINE = "Authentic Flavors & Fusion";

export const CATEGORIES: Category[] = [
  { id: 'starters', name: 'Starters' },
  { id: 'mains', name: 'Mains' },
  { id: 'steaks', name: 'Grills & Steaks' },
  { id: 'desserts', name: 'Desserts' },
  { id: 'cocktails', name: 'Beverages' },
];

export const MENU_ITEMS: Dish[] = [
  {
    id: '1',
    name: 'Spiced Lamb Arancini',
    description: 'Crispy rice balls infused with saffron and mild spices, served with garlic yogurt dip.',
    price: 14,
    categoryId: 'starters',
    image: 'https://picsum.photos/400/300?random=1',
    dietaryTags: [DietaryType.VEGETARIAN],
    calories: 420,
    pairing: 'Masala Chai'
  },
  {
    id: '2',
    name: 'Himalayan Beef Carpaccio',
    description: 'Thinly sliced cured beef with mountain herbs, capers, and a drizzle of mustard oil.',
    price: 22,
    categoryId: 'starters',
    image: 'https://picsum.photos/400/300?random=2',
    dietaryTags: [DietaryType.GLUTEN_FREE],
    calories: 310,
    pairing: 'Pinot Noir'
  },
  {
    id: '3',
    name: 'Glazed Black Cod',
    description: 'Sustainably sourced black cod marinated in local spices, served with steamed greens.',
    price: 38,
    categoryId: 'mains',
    image: 'https://picsum.photos/400/300?random=3',
    dietaryTags: [DietaryType.GLUTEN_FREE],
    calories: 540,
    pairing: 'Chablis'
  },
  {
    id: '4',
    name: 'Wild Mushroom Risotto',
    description: 'Arborio rice slow-cooked with foraged mushrooms, finished with yak butter and herbs.',
    price: 26,
    categoryId: 'mains',
    image: 'https://picsum.photos/400/300?random=4',
    dietaryTags: [DietaryType.VEGETARIAN, DietaryType.GLUTEN_FREE],
    calories: 680,
    pairing: 'Barolo'
  },
  {
    id: '5',
    name: 'Spicy Mutton Rogan',
    description: 'Slow-cooked mutton in a rich aromatic gravy with Kashmiri chilies and fresh coriander.',
    price: 29,
    categoryId: 'mains',
    image: 'https://picsum.photos/400/300?random=5',
    dietaryTags: [DietaryType.SPICY],
    calories: 750,
    pairing: 'Syrah'
  },
  {
    id: '6',
    name: 'Tomahawk Ribeye (32oz)',
    description: 'Dry-aged for 45 days, grilled to perfection over charcoal. Served with roasted garlic and herb butter.',
    price: 120,
    categoryId: 'steaks',
    image: 'https://picsum.photos/400/300?random=6',
    dietaryTags: [DietaryType.GLUTEN_FREE],
    calories: 1200,
    pairing: 'Cabernet Sauvignon'
  },
  {
    id: '7',
    name: 'Saffron Crème Brûlée',
    description: 'Rich custard base infused with premium saffron strands, topped with caramelized sugar.',
    price: 12,
    categoryId: 'desserts',
    image: 'https://picsum.photos/400/300?random=7',
    dietaryTags: [DietaryType.VEGETARIAN, DietaryType.GLUTEN_FREE],
    calories: 450,
    pairing: 'Sauternes'
  },
  {
    id: '8',
    name: 'Apricot & Walnut Cake',
    description: 'Dense cake made with dried apricots and walnuts, served with vanilla bean ice cream.',
    price: 14,
    categoryId: 'desserts',
    image: 'https://picsum.photos/400/300?random=8',
    dietaryTags: [DietaryType.VEGETARIAN],
    calories: 580,
    pairing: 'Port'
  },
  {
    id: '9',
    name: 'Smoked Old Fashioned',
    description: 'Bourbon, maple syrup, bitters, smoked with hickory wood chips.',
    price: 16,
    categoryId: 'cocktails',
    image: 'https://picsum.photos/400/300?random=9',
    dietaryTags: [DietaryType.VEGAN],
    calories: 180
  },
  {
    id: '10',
    name: 'Mountain Berry Fizz',
    description: 'Gin, fresh mountain berries, lemon, egg white, and soda water.',
    price: 15,
    categoryId: 'cocktails',
    image: 'https://picsum.photos/400/300?random=10',
    dietaryTags: [DietaryType.VEGETARIAN],
    calories: 210
  }
];