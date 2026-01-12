
import React, { useState, useEffect } from 'react';
import { User, Product } from '../types';
import { PlusCircle, Package, DollarSign, Wand2, Loader2, Edit3, Trash2, Eye, ShoppingCart, BarChart2, Clock, ShieldCheck, AlertCircle, RefreshCw, MoreVertical, TrendingUp } from 'lucide-react';
import { generateProductDescription } from '../services/geminiService';

interface Props {
  user: User;
  products: Product[];
  onAddProduct: (p: Product) => void;
  onUpdateProduct: (p: Product) => void;
  onDeleteProduct: (id: string) => void;
}

const VendorDashboard: React.FC<Props> = ({ user, products, onAddProduct, onUpdateProduct, onDeleteProduct }) => {
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [loadingAI, setLoadingAI] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Ethnic Wear',
    image: 'https://picsum.photos/seed/product/400/500',
    stock: ''
  });

  const vendorProducts = products.filter(p => p.vendorId === user.id);
  const totalSales = vendorProducts.reduce((acc, p) => acc + (p.salesCount || 0) * p.price, 0);
  const totalViews = vendorProducts.reduce((acc, p) => acc + (p.views || 0), 0);

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name,
        description: editingProduct.description,
        price: editingProduct.price.toString(),
        category: editingProduct.category,
        image: editingProduct.image,
        stock: editingProduct.stock.toString()
      });
      setShowModal(true);
    } else {
      setFormData({
        name: '',
        description: '',
        price: '',
        category: 'Ethnic Wear',
        image: 'https://picsum.photos/seed/product/400/500',
        stock: ''
      });
    }
  }, [editingProduct]);

  if (!user.isApproved) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 animate-in fade-in duration-700">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-2xl overflow-hidden">
          <div className="bg-pink-600 p-8 text-center text-white">
            <div className="bg-white/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Clock size={40} />
            </div>
            <h1 className="text-3xl font-black mb-2 uppercase tracking-tight">Store Under Review</h1>
            <p className="text-pink-100 font-medium">We're verifying your business details</p>
          </div>
          
          <div className="p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="shrink-0 w-10 h-10 bg-green-50 text-green-600 rounded-lg flex items-center justify-center">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">Verification in Progress</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">Our admin team is currently reviewing your registration. This process typically takes 24-48 business hours.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="shrink-0 w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                    <AlertCircle size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">Dashboard Restricted</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">You cannot list products or accept orders until your account is approved to ensure platform safety.</p>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                   <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Next Steps</h4>
                   <ul className="text-sm space-y-2 text-gray-600 font-medium">
                      <li className="flex items-center gap-2">• Keep your phone reachable</li>
                      <li className="flex items-center gap-2">• Check your email for updates</li>
                      <li className="flex items-center gap-2">• Prepare your product catalog</li>
                   </ul>
                </div>
              </div>

              <div className="hidden md:block">
                <img 
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=400" 
                  alt="Review process" 
                  className="rounded-3xl shadow-xl grayscale opacity-70"
                />
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-100 flex justify-center">
               <button onClick={() => window.location.reload()} className="flex items-center gap-2 text-pink-600 font-bold hover:bg-pink-50 px-6 py-3 rounded-xl transition-colors">
                 <RefreshCw size={18} /> Refresh Status
               </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleAI = async () => {
    if (!formData.name) return alert("Enter product name first");
    setLoadingAI(true);
    const desc = await generateProductDescription(formData.name, formData.category);
    setFormData(prev => ({ ...prev, description: desc }));
    setLoadingAI(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const productData: Product = {
      id: editingProduct ? editingProduct.id : Math.random().toString(36).substr(2, 9),
      vendorId: user.id,
      vendorName: user.storeName || user.name,
      name: formData.name,
      description: formData.description,
      price: Number(formData.price),
      category: formData.category,
      image: formData.image,
      stock: Number(formData.stock),
      views: editingProduct ? editingProduct.views : 0,
      salesCount: editingProduct ? editingProduct.salesCount : 0,
      reviews: editingProduct ? editingProduct.reviews : []
    };

    if (editingProduct) {
      onUpdateProduct(productData);
    } else {
      onAddProduct(productData);
    }

    handleCloseModal();
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProduct(null);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this product? This action cannot be undone.")) {
      onDeleteProduct(id);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-800 flex items-center gap-3 tracking-tight">
            <div className="p-2 bg-pink-100 rounded-xl">
              <BarChart2 className="text-pink-600" size={28} />
            </div>
            {user.storeName}
          </h1>
          <p className="text-gray-500 font-medium mt-1">Grow your business with real-time insights</p>
        </div>
        <button 
          onClick={() => { setEditingProduct(null); setShowModal(true); }}
          className="bg-pink-600 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center gap-3 hover:bg-pink-700 transition-all shadow-xl shadow-pink-100 active:scale-95"
        >
          <PlusCircle size={20} /> Add New Product
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col gap-4 group hover:shadow-md transition-all">
           <div className="flex justify-between items-start">
             <div className="p-3 bg-pink-50 text-pink-600 rounded-2xl group-hover:bg-pink-600 group-hover:text-white transition-colors"><Package /></div>
             <TrendingUp size={16} className="text-green-500" />
           </div>
           <div><p className="text-xs font-black text-gray-400 uppercase tracking-widest">Inventory Size</p><p className="text-2xl font-black text-gray-800">{vendorProducts.length} Items</p></div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col gap-4 group hover:shadow-md transition-all">
           <div className="flex justify-between items-start">
             <div className="p-3 bg-green-50 text-green-600 rounded-2xl group-hover:bg-green-600 group-hover:text-white transition-colors"><DollarSign /></div>
             <TrendingUp size={16} className="text-green-500" />
           </div>
           <div><p className="text-xs font-black text-gray-400 uppercase tracking-widest">Total Revenue</p><p className="text-2xl font-black text-gray-800">₹{totalSales.toLocaleString()}</p></div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col gap-4 group hover:shadow-md transition-all">
           <div className="flex justify-between items-start">
             <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors"><Eye /></div>
             <TrendingUp size={16} className="text-green-500" />
           </div>
           <div><p className="text-xs font-black text-gray-400 uppercase tracking-widest">Product Reach</p><p className="text-2xl font-black text-gray-800">{totalViews.toLocaleString()}</p></div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col gap-4 group hover:shadow-md transition-all">
           <div className="flex justify-between items-start">
             <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl group-hover:bg-purple-600 group-hover:text-white transition-colors"><ShoppingCart size={20} /></div>
             <TrendingUp size={16} className="text-green-500" />
           </div>
           <div><p className="text-xs font-black text-gray-400 uppercase tracking-widest">Successful Orders</p><p className="text-2xl font-black text-gray-800">{vendorProducts.reduce((a, b) => a + (b.salesCount || 0), 0)}</p></div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4 backdrop-blur-md">
          <div className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
            <div className="p-8 border-b flex justify-between items-center bg-gray-50/50">
               <div>
                 <h2 className="text-2xl font-black text-gray-800 tracking-tight">{editingProduct ? 'Update Product' : 'List New Product'}</h2>
                 <p className="text-sm text-gray-500 font-medium">Fill in the details for your catalog</p>
               </div>
               <button onClick={handleCloseModal} className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-400 hover:text-gray-600 hover:bg-gray-200 transition-all">&times;</button>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[75vh] overflow-y-auto custom-scrollbar">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest px-1">Product Name</label>
                  <input required className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-pink-500 focus:bg-white rounded-2xl outline-none transition-all font-medium" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. Premium Silk Saree" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest px-1">Category</label>
                  <select className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-pink-500 focus:bg-white rounded-2xl outline-none transition-all appearance-none cursor-pointer font-medium" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                    <option>Ethnic Wear</option>
                    <option>Electronics</option>
                    <option>Home & Kitchen</option>
                    <option>Beauty</option>
                    <option>Accessories</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Product Description</label>
                  <button 
                    type="button" 
                    onClick={handleAI}
                    disabled={loadingAI}
                    className="text-[10px] font-black bg-purple-100 text-purple-600 px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-purple-200 disabled:opacity-50 transition-all active:scale-95 shadow-sm"
                  >
                    {loadingAI ? <Loader2 size={12} className="animate-spin" /> : <Wand2 size={12} />} GEMINI AI WRITE
                  </button>
                </div>
                <textarea required className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-pink-500 focus:bg-white rounded-2xl outline-none h-32 resize-none transition-all text-sm font-medium leading-relaxed" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="What makes your product special?"></textarea>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest px-1">Price (₹)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-gray-400">₹</span>
                    <input required type="number" className="w-full pl-8 pr-4 py-4 bg-gray-50 border-2 border-transparent focus:border-pink-500 focus:bg-white rounded-2xl outline-none transition-all font-black text-lg" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest px-1">Inventory Level</label>
                  <input required type="number" className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-pink-500 focus:bg-white rounded-2xl outline-none transition-all font-black text-lg text-center" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} />
                </div>
              </div>
              
              <button type="submit" className="w-full bg-pink-600 text-white py-5 rounded-3xl font-black text-sm uppercase tracking-[0.2em] mt-6 hover:bg-pink-700 transition-all shadow-2xl shadow-pink-100 active:scale-[0.98]">
                {editingProduct ? 'Save Product Changes' : 'Publish to Marketplace'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Inventory Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
           <h2 className="text-xl font-black text-gray-800 tracking-tight uppercase">Product Inventory</h2>
           <span className="text-xs font-bold text-gray-400 bg-gray-100 px-3 py-1 rounded-full">{vendorProducts.length} Items Listed</span>
        </div>

        {vendorProducts.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-[2rem] border-2 border-dashed border-gray-100 space-y-4">
            <div className="bg-gray-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto text-gray-300">
              <Package size={48} />
            </div>
            <div className="space-y-1">
              <p className="text-lg font-bold text-gray-800">Your store is empty</p>
              <p className="text-gray-400 max-w-xs mx-auto">Start listing your products to reach millions of shoppers on Meneric.</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {vendorProducts.map(p => (
              <div key={p.id} className="group bg-white rounded-[2rem] border border-gray-100 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={p.name} />
                  <div className="absolute top-4 left-4">
                    <span className="text-[10px] font-black bg-black/40 backdrop-blur-md text-white px-3 py-1.5 rounded-full uppercase tracking-widest">{p.category}</span>
                  </div>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="bg-white/90 backdrop-blur-md p-2 rounded-full shadow-lg text-gray-600 hover:text-pink-600 transition-colors">
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </div>
                
                <div className="p-6 flex-grow flex flex-col space-y-4">
                  <div>
                    <h3 className="text-sm font-bold text-gray-800 truncate mb-1">{p.name}</h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-black text-pink-600">₹{p.price}</span>
                      <span className="text-[10px] font-bold text-gray-400 uppercase">Per Unit</span>
                    </div>
                  </div>

                  {/* Stock Health */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-tighter">
                      <span className={p.stock < 10 ? 'text-red-500' : 'text-gray-500'}>Stock: {p.stock} Units</span>
                      <span className="text-gray-400">{Math.min(p.stock, 100)}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-50 rounded-full overflow-hidden shadow-inner">
                      <div className={`h-full transition-all duration-1000 ${p.stock < 10 ? 'bg-red-500' : 'bg-pink-500'}`} style={{ width: `${Math.min(p.stock, 100)}%` }}></div>
                    </div>
                  </div>

                  {/* Performance Indicators */}
                  <div className="flex gap-4 pt-2 border-t border-gray-50">
                    <div className="flex items-center gap-1.5 text-blue-500">
                      <Eye size={14} strokeWidth={3} />
                      <span className="text-[10px] font-black">{p.views || 0}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-green-500">
                      <ShoppingCart size={14} strokeWidth={3} />
                      <span className="text-[10px] font-black">{p.salesCount || 0}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <button 
                      onClick={() => setEditingProduct(p)}
                      className="flex items-center justify-center gap-2 py-3 bg-gray-50 text-gray-600 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-pink-50 hover:text-pink-600 transition-all border border-transparent hover:border-pink-100"
                    >
                      <Edit3 size={14} /> Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(p.id)}
                      className="flex items-center justify-center gap-2 py-3 bg-gray-50 text-gray-600 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-red-50 hover:text-red-600 transition-all border border-transparent hover:border-red-100"
                    >
                      <Trash2 size={14} /> Del
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorDashboard;
