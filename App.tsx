import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import CategoryNav from './components/CategoryNav';
import DishCard from './components/DishCard';
import DishDetailModal from './components/DishDetailModal';
import AIChefWidget from './components/AIChefWidget';
import { CATEGORIES, MENU_ITEMS } from './constants';
import { Dish } from './types';
import { Search } from 'lucide-react';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [chefQuery, setChefQuery] = useState<string>('');

  const filteredDishes = useMemo(() => {
    return MENU_ITEMS.filter((dish) => {
      const matchesCategory = activeCategory === 'all' || dish.categoryId === activeCategory;
      const matchesSearch = dish.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            dish.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleAskChef = (dishName: string) => {
    setChefQuery(dishName);
  };

  const clearChefQuery = () => {
    setChefQuery('');
  };

  return (
    <div className="min-h-screen pb-20 bg-primary bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]">
      <Header />
      
      <CategoryNav 
        categories={CATEGORIES} 
        activeCategory={activeCategory} 
        onSelectCategory={setActiveCategory} 
      />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="relative max-w-md mx-auto mb-10 group">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-500">
            <Search size={20} />
          </div>
          <input 
            type="text" 
            placeholder="Search menu..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-secondary/50 border border-white/10 text-white rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-gold-500/50 focus:ring-2 focus:ring-gold-500/20 transition-all"
          />
        </div>

        {/* Section Title */}
        <div className="mb-8">
          <h2 className="text-2xl font-serif text-white border-l-4 border-gold-500 pl-4">
            {activeCategory === 'all' ? 'Our Menu' : CATEGORIES.find(c => c.id === activeCategory)?.name}
          </h2>
        </div>

        {/* Grid */}
        {filteredDishes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredDishes.map((dish) => (
              <DishCard 
                key={dish.id} 
                dish={dish} 
                onClick={setSelectedDish} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No dishes found matching your criteria.</p>
            <button 
              onClick={() => {setActiveCategory('all'); setSearchQuery('');}}
              className="mt-4 text-gold-500 underline"
            >
              View Full Menu
            </button>
          </div>
        )}
      </main>

      <DishDetailModal 
        dish={selectedDish} 
        onClose={() => setSelectedDish(null)} 
        onAskChef={handleAskChef}
      />

      <AIChefWidget 
        initialQuery={chefQuery}
        onClearInitialQuery={clearChefQuery}
      />
    </div>
  );
};

export default App;