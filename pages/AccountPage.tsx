
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User } from '../types';
import { 
  User as UserIcon, 
  ShoppingBag, 
  MapPin, 
  CreditCard, 
  Settings, 
  LogOut, 
  ChevronRight, 
  HelpCircle,
  Bell,
  ShieldCheck,
  Heart
} from 'lucide-react';

interface Props {
  user: User | null;
  onLogout: () => void;
}

const AccountPage: React.FC<Props> = ({ user, onLogout }) => {
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="max-w-md mx-auto my-20 text-center space-y-6 animate-in fade-in zoom-in duration-300">
        <div className="bg-pink-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto text-pink-600">
          <UserIcon size={48} />
        </div>
        <div>
          <h2 className="text-2xl font-black text-gray-800 tracking-tight">Login to your account</h2>
          <p className="text-gray-500 mt-2">Access your orders, profile and more</p>
        </div>
        <button 
          onClick={() => navigate('/auth')}
          className="w-full bg-pink-600 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-pink-100 hover:bg-pink-700 transition-all active:scale-95"
        >
          Login / Register
        </button>
      </div>
    );
  }

  const menuItems = [
    { label: 'My Orders', icon: <ShoppingBag />, path: '/orders', color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'My Wishlist', icon: <Heart />, path: '/wishlist', color: 'text-pink-500', bg: 'bg-pink-50' },
    { label: 'Saved Addresses', icon: <MapPin />, path: '#', color: 'text-green-500', bg: 'bg-green-50' },
    { label: 'Payment Methods', icon: <CreditCard />, path: '#', color: 'text-purple-500', bg: 'bg-purple-50' },
    { label: 'Notifications', icon: <Bell />, path: '#', color: 'text-yellow-500', bg: 'bg-yellow-50' },
    { label: 'Account Settings', icon: <Settings />, path: '#', color: 'text-gray-500', bg: 'bg-gray-50' },
    { label: 'Privacy & Policy', icon: <ShieldCheck />, path: '#', color: 'text-indigo-500', bg: 'bg-indigo-50' },
    { label: 'Help & Support', icon: <HelpCircle />, path: '#', color: 'text-red-500', bg: 'bg-red-50' },
  ];

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Profile Header */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 flex items-center gap-6">
        <div className="w-20 h-20 bg-pink-600 rounded-2xl flex items-center justify-center text-white font-black text-3xl shadow-xl shadow-pink-100">
          {user.name.charAt(0)}
        </div>
        <div className="flex-grow">
          <h1 className="text-2xl font-black text-gray-800 tracking-tight">{user.name}</h1>
          <p className="text-gray-500 font-medium">{user.phone || user.email}</p>
          <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-pink-50 text-pink-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-pink-100">
            {user.role} Account
          </div>
        </div>
        {user.role === 'VENDOR' && (
          <button 
            onClick={() => navigate('/vendor/dashboard')}
            className="hidden md:block bg-gray-900 text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-black transition-colors"
          >
            Dashboard
          </button>
        )}
      </div>

      {/* Menu Grid */}
      <div className="grid gap-3">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between hover:border-pink-200 hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl ${item.bg} ${item.color} group-hover:scale-110 transition-transform`}>
                {React.cloneElement(item.icon as React.ReactElement, { size: 20 })}
              </div>
              <span className="font-bold text-gray-700 tracking-tight">{item.label}</span>
            </div>
            <ChevronRight size={18} className="text-gray-300 group-hover:text-pink-600 group-hover:translate-x-1 transition-all" />
          </Link>
        ))}
      </div>

      {/* Logout Button */}
      <button 
        onClick={handleLogout}
        className="w-full bg-white text-red-500 border-2 border-red-50 py-5 rounded-3xl font-black text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-red-50 transition-all shadow-sm active:scale-[0.98]"
      >
        <LogOut size={20} /> Logout from Account
      </button>

      <p className="text-center text-[10px] font-black text-gray-300 uppercase tracking-widest pb-10">
        Meneric App Version 2.4.0
      </p>
    </div>
  );
};

export default AccountPage;
