import React from 'react';
import { UtensilsCrossed } from 'lucide-react';
import { RESTAURANT_NAME, RESTAURANT_TAGLINE } from '../constants';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 w-full bg-primary/95 backdrop-blur-md border-b border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col items-center justify-center text-center">
        <div className="flex items-center gap-2 mb-1">
          <UtensilsCrossed className="w-6 h-6 text-gold-400" />
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-white tracking-wider">
            {RESTAURANT_NAME.toUpperCase()}
          </h1>
          <UtensilsCrossed className="w-6 h-6 text-gold-400 transform scale-x-[-1]" />
        </div>
        <p className="text-xs md:text-sm text-gray-400 font-sans tracking-[0.2em] uppercase">
          {RESTAURANT_TAGLINE}
        </p>
      </div>
    </header>
  );
};

export default Header;