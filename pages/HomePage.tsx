
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { Star, Truck, Heart } from 'lucide-react';

interface Props {
  products: Product[];
  wishlist: string[];
  onToggleWishlist: (id: string) => void;
  onAddToCart: (p: Product) => void;
}

const CATEGORIES = ['All', 'Ethnic Wear', 'Electronics', 'Home & Kitchen', 'Accessories', 'Beauty'];

const HomePage: React.FC<Props> = ({ products, wishlist, onToggleWishlist, onAddToCart }) => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-pink-50 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between border border-pink-100 overflow-hidden">
        <div className="space-y-2 text-center md:text-left">
          <h1 className="text-3xl font-extrabold text-gray-900 leading-tight">Lowest Prices <br/> Best Quality Shopping</h1>
          <p className="text-gray-600">Free Delivery | Cash on Delivery | 7 Day Returns</p>
          <div className="flex gap-4 pt-4 justify-center md:justify-start">
             <div className="bg-white p-3 rounded-lg shadow-sm flex items-center gap-2">
                <Truck className="text-pink-600" size={24} />
                <span className="text-xs font-semibold">Free Delivery</span>
             </div>
             <div className="bg-white p-3 rounded-lg shadow-sm flex items-center gap-2">
                <Star className="text-yellow-400" size={24} />
                <span className="text-xs font-semibold">Trust of Millions</span>
             </div>
          </div>
        </div>
        <img 
          src="https://picsum.photos/seed/shopping/400/200" 
          alt="Banner" 
          className="mt-6 md:mt-0 rounded-lg shadow-lg rotate-3"
        />
      </div>

      {/* Categories */}
      <div className="flex overflow-x-auto pb-2 space-x-3 no-scrollbar">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap border transition-all
              ${activeCategory === cat 
                ? 'bg-pink-600 border-pink-600 text-white' 
                : 'bg-white border-gray-300 text-gray-600 hover:border-pink-300'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filtered.map(product => {
          const isLiked = wishlist.includes(product.id);
          return (
            <div key={product.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group relative">
              {/* Wishlist Button */}
              <button 
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); onToggleWishlist(product.id); }}
                className={`absolute top-2 right-2 z-10 p-2 rounded-full backdrop-blur-md transition-all active:scale-90 ${isLiked ? 'bg-pink-50 text-pink-600 shadow-inner' : 'bg-white/70 text-gray-400 shadow-sm'}`}
              >
                <Heart size={16} fill={isLiked ? "currentColor" : "none"} strokeWidth={isLiked ? 0 : 2} />
              </button>

              <Link to={`/product/${product.id}`}>
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-medium text-gray-600 truncate">{product.name}</h3>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-lg font-bold">₹{product.price}</span>
                    <span className="text-xs text-gray-400 line-through">₹{Math.floor(product.price * 1.5)}</span>
                    <span className="text-[10px] font-bold text-green-600">30% off</span>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="bg-green-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                      4.2 <Star size={10} fill="currentColor" />
                    </span>
                    <span className="text-[10px] text-gray-400 font-medium">1024 Reviews</span>
                  </div>
                  <div className="mt-3 bg-gray-50 text-[10px] font-semibold text-gray-500 py-1 px-2 rounded-full inline-block">
                     Free Delivery
                  </div>
                </div>
              </Link>
              <div className="p-2 pt-0">
                 <button 
                  onClick={() => onAddToCart(product)}
                  className="w-full py-2 bg-pink-50 text-pink-600 text-sm font-bold rounded hover:bg-pink-100 transition-colors"
                 >
                   Add to Cart
                 </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;
