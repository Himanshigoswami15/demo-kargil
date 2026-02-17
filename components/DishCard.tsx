import React from 'react';
import { Dish } from '../types';
import { Info, Leaf, Flame, WheatOff } from 'lucide-react';

interface DishCardProps {
  dish: Dish;
  onClick: (dish: Dish) => void;
}

const DishCard: React.FC<DishCardProps> = ({ dish, onClick }) => {
  return (
    <div 
      className="group relative bg-secondary rounded-xl overflow-hidden shadow-lg border border-white/5 hover:border-gold-500/50 transition-all duration-300 cursor-pointer flex flex-col h-full"
      onClick={() => onClick(dish)}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={dish.image} 
          alt={dish.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60" />
        <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur px-3 py-1 rounded-full border border-white/10">
          <span className="text-gold-400 font-serif font-bold text-lg">${dish.price}</span>
        </div>
      </div>
      
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-serif font-semibold text-white group-hover:text-gold-400 transition-colors">
            {dish.name}
          </h3>
        </div>
        
        <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-1">
          {dish.description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex gap-2">
            {dish.dietaryTags.map((tag) => {
              if (tag === 'Vegetarian' || tag === 'Vegan') {
                return (
                  <div key={tag} title={tag} className="flex items-center">
                    <Leaf size={16} className="text-green-400" />
                  </div>
                );
              }
              if (tag === 'Spicy') {
                return (
                  <div key={tag} title={tag} className="flex items-center">
                    <Flame size={16} className="text-red-400" />
                  </div>
                );
              }
              if (tag === 'Gluten-Free') {
                return (
                  <div key={tag} title={tag} className="flex items-center">
                    <WheatOff size={16} className="text-amber-200" />
                  </div>
                );
              }
              return null;
            })}
          </div>
          <button className="text-xs font-medium text-gold-500 flex items-center gap-1 hover:underline">
            Details <Info size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DishCard;