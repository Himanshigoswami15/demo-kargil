import React from 'react';
import { Dish } from '../types';
import { X, Wine } from 'lucide-react';

interface DishDetailModalProps {
  dish: Dish | null;
  onClose: () => void;
  onAskChef: (dishName: string) => void;
}

const DishDetailModal: React.FC<DishDetailModalProps> = ({ dish, onClose, onAskChef }) => {
  if (!dish) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative bg-secondary w-full max-w-2xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black/50 p-2 rounded-full hover:bg-black/80 text-white transition-colors"
        >
          <X size={20} />
        </button>

        <div className="h-64 sm:h-80 w-full relative shrink-0">
          <img src={dish.image} alt={dish.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-transparent" />
          <div className="absolute bottom-4 left-6">
            <h2 className="text-3xl font-serif font-bold text-white mb-1">{dish.name}</h2>
            <div className="flex gap-3 text-sm text-gray-300">
              {dish.dietaryTags.map(tag => (
                <span key={tag} className="bg-white/10 px-2 py-0.5 rounded border border-white/5">{tag}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
             <span className="text-2xl font-serif text-gold-400 font-bold">${dish.price}</span>
             {dish.calories && <span className="text-gray-500 text-sm">{dish.calories} kcal</span>}
          </div>

          <p className="text-gray-300 leading-relaxed mb-8 text-lg">
            {dish.description}
          </p>

          {dish.pairing && (
            <div className="bg-white/5 p-4 rounded-xl border border-white/5 mb-6">
              <div className="flex items-center gap-2 mb-2 text-gold-400">
                <Wine size={18} />
                <span className="font-serif font-bold">Sommelier Pairing</span>
              </div>
              <p className="text-gray-300 text-sm">{dish.pairing}</p>
            </div>
          )}

          <div className="mt-4 pt-4 border-t border-white/10 flex justify-end">
            <button 
              onClick={() => {
                onClose();
                onAskChef(dish.name);
              }}
              className="px-6 py-3 bg-gold-600 hover:bg-gold-500 text-black font-bold rounded-lg transition-colors flex items-center gap-2"
            >
              Ask Chef about this
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DishDetailModal;