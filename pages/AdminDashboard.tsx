
import React, { useState } from 'react';
import { User, Product } from '../types';
import { Users, Package, TrendingUp, CheckCircle, XCircle, ShieldAlert, UserPlus, Shield, Trash2, Key } from 'lucide-react';

interface Props {
  vendors: User[];
  products: Product[];
  admins: User[];
  onUpdateVendor: (id: string, status: boolean) => void;
  onAddAdmin: (admin: User) => void;
  onRemoveAdmin: (id: string) => void;
}

const AdminDashboard: React.FC<Props> = ({ vendors, products, admins, onUpdateVendor, onAddAdmin, onRemoveAdmin }) => {
  const [tab, setTab] = useState<'vendors' | 'inventory' | 'admins'>('vendors');
  const [showAddAdmin, setShowAddAdmin] = useState(false);
  const [newAdmin, setNewAdmin] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleCreateAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdmin.email || !newAdmin.password || !newAdmin.name) return;
    
    const adminData: User = {
      id: `admin-${Math.random().toString(36).substr(2, 9)}`,
      name: newAdmin.name,
      email: newAdmin.email,
      password: newAdmin.password,
      role: 'ADMIN'
    };
    
    onAddAdmin(adminData);
    setNewAdmin({ name: '', email: '', password: '' });
    setShowAddAdmin(false);
    alert(`Admin account created for ${newAdmin.name}! They can now log in using these credentials.`);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto">
      <div className="flex items-center justify-between bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-3xl font-black text-gray-800 tracking-tight">System Control Panel</h1>
          <p className="text-gray-500 font-medium">Global Marketplace Administration</p>
        </div>
        <div className="bg-pink-600 text-white p-4 rounded-2xl shadow-xl shadow-pink-100">
           <ShieldAlert size={28} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center gap-4">
             <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl"><Users size={24} /></div>
             <div>
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Vendors</p>
                <p className="text-2xl font-black text-gray-800">{vendors.length}</p>
             </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center gap-4">
             <div className="p-4 bg-green-50 text-green-600 rounded-2xl"><Package size={24} /></div>
             <div>
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Products</p>
                <p className="text-2xl font-black text-gray-800">{products.length}</p>
             </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center gap-4">
             <div className="p-4 bg-purple-50 text-purple-600 rounded-2xl"><TrendingUp size={24} /></div>
             <div>
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Growth</p>
                <p className="text-2xl font-black text-gray-800">+12%</p>
             </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center gap-4">
             <div className="p-4 bg-pink-50 text-pink-600 rounded-2xl"><Shield size={24} /></div>
             <div>
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Admins</p>
                <p className="text-2xl font-black text-gray-800">{admins.length}</p>
             </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden min-h-[500px]">
        <div className="flex bg-gray-50/50 p-2 border-b">
          <button 
            onClick={() => setTab('vendors')}
            className={`flex-1 py-4 text-xs font-black uppercase tracking-[0.2em] rounded-2xl transition-all ${tab === 'vendors' ? 'bg-white text-pink-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
          >
            Vendor Verification
          </button>
          <button 
            onClick={() => setTab('inventory')}
            className={`flex-1 py-4 text-xs font-black uppercase tracking-[0.2em] rounded-2xl transition-all ${tab === 'inventory' ? 'bg-white text-pink-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
          >
            Global Inventory
          </button>
          <button 
            onClick={() => setTab('admins')}
            className={`flex-1 py-4 text-xs font-black uppercase tracking-[0.2em] rounded-2xl transition-all ${tab === 'admins' ? 'bg-white text-pink-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
          >
            System Admins
          </button>
        </div>

        <div className="p-8">
          {tab === 'vendors' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">
                    <th className="pb-6 px-4">Vendor Details</th>
                    <th className="pb-6 px-4">Contact</th>
                    <th className="pb-6 px-4">Status</th>
                    <th className="pb-6 px-4 text-right">Verification</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {vendors.map(vendor => (
                    <tr key={vendor.id} className="group hover:bg-gray-50/50 transition-colors">
                      <td className="py-6 px-4">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center text-pink-600 font-black">
                            {vendor.storeName?.charAt(0) || vendor.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-gray-800">{vendor.storeName || 'Personal Store'}</p>
                            <p className="text-xs text-gray-400 font-medium">{vendor.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-6 px-4 text-sm font-medium text-gray-500">{vendor.email || vendor.phone || 'N/A'}</td>
                      <td className="py-6 px-4">
                        {vendor.isApproved ? (
                          <span className="bg-green-100 text-green-700 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-green-200">ACTIVE</span>
                        ) : (
                          <span className="bg-yellow-100 text-yellow-700 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-yellow-200">PENDING</span>
                        )}
                      </td>
                      <td className="py-6 px-4 text-right">
                        {vendor.isApproved ? (
                          <button onClick={() => onUpdateVendor(vendor.id, false)} className="bg-red-50 text-red-500 hover:bg-red-500 hover:text-white p-3 rounded-2xl transition-all active:scale-95 border border-red-100 shadow-sm">
                            <XCircle size={20} />
                          </button>
                        ) : (
                          <button onClick={() => onUpdateVendor(vendor.id, true)} className="bg-green-50 text-green-500 hover:bg-green-500 hover:text-white p-3 rounded-2xl transition-all active:scale-95 border border-green-100 shadow-sm">
                            <CheckCircle size={20} />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {tab === 'inventory' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
               {products.map(p => (
                 <div key={p.id} className="p-4 bg-gray-50/50 border border-gray-100 rounded-3xl flex items-center gap-4 hover:bg-white hover:shadow-xl transition-all duration-300">
                    <img src={p.image} className="w-16 h-16 rounded-2xl object-cover shadow-sm" alt={p.name} />
                    <div className="flex-grow min-w-0">
                      <p className="text-xs font-black text-gray-800 truncate uppercase tracking-tight">{p.name}</p>
                      <p className="text-[10px] text-gray-400 font-bold">BY: {p.vendorName}</p>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="text-sm font-black text-pink-600">₹{p.price}</span>
                        <span className="text-[10px] bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded font-black">STOCK: {p.stock}</span>
                      </div>
                    </div>
                 </div>
               ))}
            </div>
          )}

          {tab === 'admins' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-black text-gray-800 tracking-tight">Access Control</h3>
                  <p className="text-sm text-gray-500 font-medium">Manage user IDs and passwords for Admin access</p>
                </div>
                <button 
                  onClick={() => setShowAddAdmin(true)}
                  className="bg-gray-900 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-black transition-all shadow-xl active:scale-95"
                >
                  <UserPlus size={18} /> New Admin User
                </button>
              </div>

              {showAddAdmin && (
                <div className="bg-gray-50 border-2 border-dashed border-gray-200 p-8 rounded-[2rem] animate-in zoom-in duration-300">
                  <form onSubmit={handleCreateAdmin} className="grid md:grid-cols-3 gap-6 items-end">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Admin Name</label>
                      <input 
                        required 
                        className="w-full p-4 bg-white border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-pink-400 text-sm font-bold" 
                        placeholder="Full Name"
                        value={newAdmin.name}
                        onChange={e => setNewAdmin({...newAdmin, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Login Email/ID</label>
                      <input 
                        required 
                        type="email"
                        className="w-full p-4 bg-white border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-pink-400 text-sm font-bold" 
                        placeholder="admin@meneric.com"
                        value={newAdmin.email}
                        onChange={e => setNewAdmin({...newAdmin, email: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Access Password</label>
                      <div className="relative">
                        <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                        <input 
                          required 
                          type="password"
                          className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-pink-400 text-sm font-bold" 
                          placeholder="••••••••"
                          value={newAdmin.password}
                          onChange={e => setNewAdmin({...newAdmin, password: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="md:col-span-3 flex gap-4 pt-4">
                      <button type="submit" className="flex-1 bg-pink-600 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-pink-100 hover:bg-pink-700 transition-all">Create Admin Account</button>
                      <button type="button" onClick={() => setShowAddAdmin(false)} className="px-8 py-4 bg-white text-gray-400 font-black text-xs uppercase tracking-widest rounded-2xl border hover:bg-gray-100 transition-all">Cancel</button>
                    </div>
                  </form>
                </div>
              )}

              <div className="grid gap-4">
                {admins.map(admin => (
                  <div key={admin.id} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center justify-between group hover:border-pink-200 transition-all">
                    <div className="flex items-center gap-6">
                      <div className="w-14 h-14 bg-gray-900 text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-lg">
                        {admin.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-black text-gray-800 tracking-tight">{admin.name}</h4>
                        <p className="text-xs font-bold text-gray-400">{admin.email}</p>
                        <div className="mt-1 inline-flex items-center gap-1 text-[10px] font-black text-pink-600 uppercase tracking-widest">
                          <Shield size={10} /> {admin.id === 'admin-master' ? 'Master Authority' : 'Authorized Personnel'}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      {admin.id !== 'admin-master' && (
                        <button 
                          onClick={() => {
                            if(window.confirm(`Delete admin access for ${admin.name}?`)) {
                              onRemoveAdmin(admin.id);
                            }
                          }}
                          className="p-4 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                        >
                          <Trash2 size={20} />
                        </button>
                      )}
                      <div className="px-4 py-2 bg-gray-50 rounded-xl text-[10px] font-black text-gray-400 uppercase tracking-widest border">
                        ID: {admin.id.split('-')[0]}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
