
import React from 'react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenAssistant: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartCount, onOpenCart, onOpenAssistant }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-rose-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-rose-500 rounded-full flex items-center justify-center shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-800">mylova<span className="text-rose-500">.shop</span></span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-500">
          <a href="#" className="hover:text-rose-600 transition-colors">Personalized Art</a>
          <a href="#" className="hover:text-rose-600 transition-colors">Jewelry</a>
          <a href="#" className="hover:text-rose-600 transition-colors">Occasions</a>
          <a href="#" className="hover:text-rose-600 transition-colors">Our Story</a>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <button 
            onClick={onOpenAssistant}
            className="hidden sm:flex items-center space-x-2 text-sm font-medium text-rose-600 bg-rose-50 px-3 py-1.5 rounded-full hover:bg-rose-100 transition-colors"
          >
            <span>Ask LovaBot</span>
          </button>
          
          <button 
            onClick={onOpenCart}
            className="relative p-2 text-gray-600 hover:text-rose-600 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 h-4 w-4 bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
