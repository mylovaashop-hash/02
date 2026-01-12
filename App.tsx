
import React, { useState, useMemo } from 'react';
import { INITIAL_PRODUCTS } from './constants';
import { Product, CartItem, Category } from './types';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import Assistant from './components/Assistant';

const App: React.FC = () => {
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'All') return products;
    return products.filter(p => p.category === activeCategory);
  }, [products, activeCategory]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeItem = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const categories: Category[] = ['All', 'Electronics', 'Apparel', 'Home', 'Accessories'];

  return (
    <div className="min-h-screen bg-[#fffcfb] selection:bg-rose-100 selection:text-rose-900">
      <Header 
        cartCount={cartCount} 
        onOpenCart={() => setIsCartOpen(true)} 
        onOpenAssistant={() => setIsAssistantOpen(true)}
      />

      <main>
        {/* Hero Section */}
        <section className="relative bg-rose-50 text-gray-900 py-24 md:py-32 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <img 
              src="https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=1600&q=80" 
              alt="Emotional background" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 text-center">
            <span className="inline-block px-3 py-1 mb-6 text-xs font-bold tracking-[0.2em] uppercase bg-rose-100 text-rose-600 rounded-full border border-rose-200">
              Personalized with Love
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-gray-900">
              Gifts that Speak <br />
              <span className="text-rose-500 font-light italic">Your Heart's Language</span>
            </h1>
            <p className="max-w-xl mx-auto text-lg text-gray-600 mb-10 font-medium">
              We create products emotionally connected with you. Unique keepsakes for the people who matter most.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button 
                onClick={() => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto px-8 py-4 bg-rose-500 text-white font-bold rounded-2xl hover:bg-rose-600 transition-all shadow-lg shadow-rose-200 active:scale-95"
              >
                Create Your Memory
              </button>
              <button 
                onClick={() => setIsAssistantOpen(true)}
                className="w-full sm:w-auto px-8 py-4 bg-white text-rose-600 font-bold rounded-2xl border border-rose-200 hover:bg-rose-50 transition-all active:scale-95"
              >
                Find the Perfect Gift
              </button>
            </div>
          </div>
        </section>

        {/* Category Filters */}
        <section id="shop" className="py-12 bg-white border-b border-rose-50">
          <div className="max-w-7xl mx-auto px-4 overflow-x-auto scrollbar-hide">
            <div className="flex items-center justify-center space-x-2 sm:space-x-4 min-w-max">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                    activeCategory === cat 
                      ? 'bg-rose-500 text-white shadow-lg shadow-rose-100' 
                      : 'bg-rose-50 text-rose-400 hover:bg-rose-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Product Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-rose-500 font-bold text-xs uppercase tracking-widest mb-2">Our Favourites</p>
                <h2 className="text-3xl font-bold text-gray-800">{activeCategory === 'All' ? 'Curated for You' : `${activeCategory} for Special Moments`}</h2>
              </div>
              <div className="text-sm font-medium text-gray-400">
                {filteredProducts.length} items found
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAddToCart={addToCart} 
                />
              ))}
            </div>
            
            {filteredProducts.length === 0 && (
              <div className="text-center py-20 bg-rose-50/30 rounded-3xl">
                <p className="text-gray-400 text-lg">We couldn't find items in this collection right now.</p>
                <button onClick={() => setActiveCategory('All')} className="mt-4 text-rose-500 font-bold hover:underline">See all memories</button>
              </div>
            )}
          </div>
        </section>

        {/* Emotional Connection Section */}
        <section className="py-24 bg-[#fffcfb]">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1516589174184-c68526674fd6?auto=format&fit=crop&w=800&q=80" 
                alt="Connecting hearts" 
                className="rounded-3xl shadow-2xl z-10 relative"
              />
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-rose-200 rounded-3xl -z-0"></div>
            </div>
            <div>
              <h2 className="text-4xl font-extrabold text-gray-900 mb-6 leading-tight">Every product has <br /><span className="text-rose-500 italic">a heartbeat.</span></h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                At mylova.shop, we don't just sell items; we help you capture emotions. From the exact star alignment of your first date to the hand-written notes engraved in gold, everything we do is about the connection between people.
              </p>
              <ul className="space-y-4 mb-10">
                <li className="flex items-center space-x-3 text-gray-700 font-medium">
                  <div className="w-6 h-6 bg-rose-100 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-rose-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>100% Custom & Handcrafted</span>
                </li>
                <li className="flex items-center space-x-3 text-gray-700 font-medium">
                  <div className="w-6 h-6 bg-rose-100 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-rose-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Emotional Connection Guaranteed</span>
                </li>
              </ul>
              <button 
                onClick={() => setIsAssistantOpen(true)}
                className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-gray-800 transition-colors shadow-xl active:scale-95"
              >
                Let LovaBot help you
              </button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-rose-50/50">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Need a little inspiration?</h2>
            <p className="text-gray-600 mb-8">Tell LovaBot about your special person, and we'll suggest the most meaningful gift.</p>
            <button 
              onClick={() => setIsAssistantOpen(true)}
              className="bg-rose-500 text-white px-10 py-4 rounded-2xl font-bold hover:scale-105 transition-transform shadow-lg shadow-rose-200"
            >
              Start Chatting with LovaBot
            </button>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-rose-50 py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-10">
          <div>
            <h4 className="font-bold text-sm mb-6 uppercase tracking-wider text-rose-500">The Shop</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><a href="#" className="hover:text-rose-500">Custom Art</a></li>
              <li><a href="#" className="hover:text-rose-500">Engraved Jewelry</a></li>
              <li><a href="#" className="hover:text-rose-500">Keepsake Kits</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-6 uppercase tracking-wider text-rose-500">Care</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><a href="#" className="hover:text-rose-500">Gift Wrapping</a></li>
              <li><a href="#" className="hover:text-rose-500">Shipping Info</a></li>
              <li><a href="#" className="hover:text-rose-500">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-6 uppercase tracking-wider text-rose-500">Legal</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><a href="#" className="hover:text-rose-500">Privacy Love</a></li>
              <li><a href="#" className="hover:text-rose-500">Terms of Connection</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-6 uppercase tracking-wider text-rose-500">Join our Heartbeat</h4>
            <p className="text-xs text-gray-400 mb-4 italic">Exclusive gifts and emotional stories.</p>
            <div className="flex">
              <input type="email" placeholder="Your email" className="flex-1 bg-rose-50 border border-rose-100 rounded-l-2xl px-4 text-sm focus:outline-none focus:ring-1 focus:ring-rose-200" />
              <button className="bg-rose-500 text-white px-4 py-2 rounded-r-2xl text-sm font-bold hover:bg-rose-600 transition-colors">Join</button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-rose-50 text-center">
          <p className="text-[10px] text-gray-300 uppercase tracking-[0.3em] font-bold">
            &copy; 2024 MYLOVA.SHOP. MADE FOR MOMENTS THAT MATTER.
          </p>
        </div>
      </footer>

      {/* Overlays */}
      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart} 
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
      />
      
      <Assistant 
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
        products={products}
      />
    </div>
  );
};

export default App;
