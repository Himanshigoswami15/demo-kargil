import React from 'react';
import { Category } from '../types';

interface CategoryNavProps {
  categories: Category[];
  activeCategory: string;
  onSelectCategory: (id: string) => void;
}

const CategoryNav: React.FC<CategoryNavProps> = ({ categories, activeCategory, onSelectCategory }) => {
  return (
    <nav className="sticky top-[85px] z-30 bg-secondary/95 backdrop-blur border-b border-white/5 py-3 shadow-md">
      <div className="max-w-7xl mx-auto px-4 overflow-x-auto hide-scrollbar">
        <div className="flex space-x-2 md:space-x-6 min-w-max px-2">
          <button
            onClick={() => onSelectCategory('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeCategory === 'all'
                ? 'bg-gold-500 text-black shadow-[0_0_10px_rgba(212,175,55,0.4)]'
                : 'bg-white/5 text-gray-300 hover:bg-white/10'
            }`}
          >
            All Dishes
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-gold-500 text-black shadow-[0_0_10px_rgba(212,175,55,0.4)]'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default CategoryNav;