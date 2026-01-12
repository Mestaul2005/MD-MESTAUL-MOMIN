
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Shield, Heart } from 'lucide-react';
import { User as UserType } from '../types';

interface Props {
  cartCount: number;
  wishlistCount: number;
  user: UserType | null;
  onLogout: () => void;
}

const Navbar: React.FC<Props> = ({ cartCount, wishlistCount, user, onLogout }) => {
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 py-3 px-4 shadow-sm">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-pink-600 tracking-tight">
          Meneric
        </Link>

        <div className="hidden md:flex flex-1 mx-8">
          <div className="relative w-full max-w-xl">
            <input 
              type="text" 
              placeholder="Search by Product, Category or ID"
              className="w-full pl-10 pr-4 py-2 bg-gray-100 border-none rounded-md focus:ring-2 focus:ring-pink-400 text-sm"
            />
            <div className="absolute left-3 top-2.5 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <Link to="/vendor/register" className="hidden lg:block text-sm font-medium hover:text-pink-600">
            Become a Supplier
          </Link>

          <Link to="/wishlist" className="relative text-gray-600 hover:text-pink-600">
            <Heart size={24} />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {wishlistCount}
              </span>
            )}
            <p className="text-[10px] hidden md:block text-center">Wishlist</p>
          </Link>
          
          <Link to="/cart" className="relative text-gray-600 hover:text-pink-600">
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
            <p className="text-[10px] hidden md:block text-center">Cart</p>
          </Link>

          {user ? (
            <div className="flex items-center space-x-4">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-gray-700">{user.name}</p>
                <p className="text-[10px] text-gray-500 uppercase">{user.role}</p>
              </div>
              <button onClick={() => {
                if(user.role === 'ADMIN') navigate('/admin');
                else if(user.role === 'VENDOR') navigate('/vendor/dashboard');
                else navigate('/account');
              }} className="text-gray-600 hover:text-pink-600">
                 {user.role === 'ADMIN' ? <Shield size={24} /> : <User size={24} />}
              </button>
              <button onClick={onLogout} className="text-gray-400 hover:text-red-500">
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <Link to="/auth" className="flex flex-col items-center text-gray-600 hover:text-pink-600">
              <User size={24} />
              <p className="text-[10px] hidden md:block">Login</p>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
