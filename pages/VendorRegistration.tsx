
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../types';
import { Store, UserCircle, Phone, Lock } from 'lucide-react';

interface Props {
  onRegister: (v: User) => void;
}

const VendorRegistration: React.FC<Props> = ({ onRegister }) => {
  const [formData, setFormData] = useState({
    name: '',
    storeName: '',
    phone: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newVendor: User = {
      id: `v${Date.now()}`,
      name: formData.name,
      storeName: formData.storeName,
      phone: formData.phone,
      email: formData.email,
      role: 'VENDOR',
      isApproved: false // Requires admin approval
    };
    onRegister(newVendor);
    alert("Registration Successful! Your store is pending admin approval.");
    navigate('/auth');
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col md:flex-row bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
      <div className="md:w-1/2 bg-pink-600 p-12 text-white flex flex-col justify-center space-y-6">
        <h1 className="text-4xl font-extrabold">Sell on Meneric</h1>
        <p className="text-pink-100 text-lg">Join 10 Lakh+ suppliers selling to 14 Crore+ customers at 0% Commission.</p>
        <ul className="space-y-4 pt-8">
           <li className="flex items-center gap-3">
              <span className="bg-white/20 p-2 rounded-lg">✓</span>
              <span>0% Commission Fee</span>
           </li>
           <li className="flex items-center gap-3">
              <span className="bg-white/20 p-2 rounded-lg">✓</span>
              <span>700+ Categories</span>
           </li>
           <li className="flex items-center gap-3">
              <span className="bg-white/20 p-2 rounded-lg">✓</span>
              <span>Weekly Payments</span>
           </li>
        </ul>
      </div>

      <div className="md:w-1/2 p-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Create Supplier Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase">Full Name</label>
            <div className="relative">
              <UserCircle className="absolute left-3 top-3 text-gray-300" size={20} />
              <input 
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-pink-400"
                placeholder="John Doe"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase">Store Name</label>
            <div className="relative">
              <Store className="absolute left-3 top-3 text-gray-300" size={20} />
              <input 
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-pink-400"
                placeholder="My Awesome Shop"
                value={formData.storeName}
                onChange={e => setFormData({...formData, storeName: e.target.value})}
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 text-gray-300" size={20} />
              <input 
                required
                type="tel"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-pink-400"
                placeholder="9876543210"
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-300" size={20} />
              <input 
                required
                type="password"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-pink-400"
                placeholder="••••••••"
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
              />
            </div>
          </div>
          
          <button type="submit" className="w-full bg-pink-600 text-white py-4 rounded-xl font-bold mt-4 hover:bg-pink-700 transition-all shadow-lg shadow-pink-100">
            Register as Supplier
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-500">
          Already a supplier? <button onClick={() => navigate('/auth')} className="text-pink-600 font-bold">Login</button>
        </p>
      </div>
    </div>
  );
};

export default VendorRegistration;
