
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { Heart, Star, ShoppingBag, ArrowLeft } from 'lucide-react';

interface Props {
  products: Product[];
  wishlist: string[];
  onToggleWishlist: (id: string) => void;
  onAddToCart: (p: Product) => void;
}

const WishlistPage: React.FC<Props> = ({ products, wishlist, onToggleWishlist, onAddToCart }) => {
  const savedProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto">
      <div className="flex items-center gap-4">
        <Link to="/" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft size={24} className="text-gray-600" />
        </Link>
        <div>
          <h1 className="text-3xl font-black text-gray-800 tracking-tight">My Wishlist</h1>
          <p className="text-gray-500 font-medium">{savedProducts.length} Items Saved</p>
        </div>
      </div>

      {savedProducts.length === 0 ? (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-20 text-center space-y-6">
          <div className="bg-pink-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto text-pink-600">
            <Heart size={48} fill="currentColor" className="opacity-20" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-800">Your wishlist is empty</h2>
            <p className="text-gray-500 max-w-sm mx-auto">Found something you like? Tap on the heart icon to save it here for later!</p>
          </div>
          <Link to="/" className="inline-block bg-pink-600 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-pink-700 transition-all shadow-xl shadow-pink-100">
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {savedProducts.map(product => (
            <div key={product.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all group relative">
              <button 
                onClick={() => onToggleWishlist(product.id)}
                className="absolute top-3 right-3 z-10 p-2 rounded-full bg-pink-50 text-pink-600 shadow-inner active:scale-90 transition-transform"
              >
                <Heart size={18} fill="currentColor" strokeWidth={0} />
              </button>

              <Link to={`/product/${product.id}`}>
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-4 space-y-3">
                  <h3 className="text-sm font-bold text-gray-800 truncate">{product.name}</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-black text-pink-600">₹{product.price}</span>
                    <span className="text-xs text-gray-400 line-through">₹{Math.floor(product.price * 1.5)}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="bg-green-600 text-white text-[10px] font-black px-2 py-0.5 rounded flex items-center gap-0.5">
                      4.2 <Star size={10} fill="currentColor" />
                    </span>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Verified Buyer Reviews</span>
                  </div>
                </div>
              </Link>
              <div className="p-4 pt-0">
                 <button 
                  onClick={() => onAddToCart(product)}
                  className="w-full py-3 bg-gray-900 text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-black transition-all flex items-center justify-center gap-2"
                 >
                   <ShoppingBag size={14} /> Add to Cart
                 </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
