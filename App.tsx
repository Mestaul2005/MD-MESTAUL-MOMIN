
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppState, User, Product, CartItem, Order, Review } from './types';
import { INITIAL_PRODUCTS, INITIAL_VENDORS } from './constants';

// Pages
import HomePage from './pages/HomePage';
import ProductDetails from './pages/ProductDetails';
import CartPage from './pages/CartPage';
import AuthPage from './pages/AuthPage';
import AdminDashboard from './pages/AdminDashboard';
import VendorDashboard from './pages/VendorDashboard';
import VendorRegistration from './pages/VendorRegistration';
import OrderHistory from './pages/OrderHistory';
import AccountPage from './pages/AccountPage';
import WishlistPage from './pages/WishlistPage';

// Components
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem('meneric_db');
    if (saved) return JSON.parse(saved);
    return {
      currentUser: null,
      products: INITIAL_PRODUCTS.map(p => ({ ...p, views: Math.floor(Math.random() * 500), salesCount: Math.floor(Math.random() * 50) })),
      cart: [],
      vendors: INITIAL_VENDORS,
      admins: [
        { id: 'admin-master', name: 'Master Admin', email: 'admin@meneric.com', role: 'ADMIN', password: 'admin123' }
      ],
      wishlist: [],
      orders: [
        {
          id: 'ORD-82731',
          customerId: 'u1',
          items: [INITIAL_PRODUCTS[0] as any],
          date: new Date(Date.now() - 86400000 * 2).toISOString(),
          total: 499,
          status: 'Delivered'
        }
      ]
    };
  });

  useEffect(() => {
    localStorage.setItem('meneric_db', JSON.stringify(state));
  }, [state]);

  const login = (user: User) => setState(prev => ({ ...prev, currentUser: user }));
  const logout = () => setState(prev => ({ ...prev, currentUser: null }));
  
  const addToCart = (product: Product) => {
    setState(prev => {
      const existing = prev.cart.find(item => item.id === product.id);
      if (existing) {
        return {
          ...prev,
          cart: prev.cart.map(item => 
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          )
        };
      }
      return { ...prev, cart: [...prev.cart, { ...product, quantity: 1 }] };
    });
  };

  const removeFromCart = (id: string) => {
    setState(prev => ({
      ...prev,
      cart: prev.cart.filter(item => item.id !== id)
    }));
  };

  const updateCartQty = (id: string, delta: number) => {
    setState(prev => ({
      ...prev,
      cart: prev.cart.map(item => 
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    }));
  };

  const toggleWishlist = (productId: string) => {
    setState(prev => {
      const inWishlist = prev.wishlist.includes(productId);
      if (inWishlist) {
        return { ...prev, wishlist: prev.wishlist.filter(id => id !== productId) };
      }
      return { ...prev, wishlist: [...prev.wishlist, productId] };
    });
  };

  const addProduct = (p: Product) => {
    setState(prev => ({ ...prev, products: [{ ...p, views: 0, salesCount: 0, reviews: [] }, ...prev.products] }));
  };

  const updateProduct = (p: Product) => {
    setState(prev => ({
      ...prev,
      products: prev.products.map(prod => prod.id === p.id ? { ...prod, ...p } : prod)
    }));
  };

  const deleteProduct = (id: string) => {
    setState(prev => ({
      ...prev,
      products: prev.products.filter(p => p.id !== id)
    }));
  };

  const addReview = (productId: string, review: Review) => {
    setState(prev => ({
      ...prev,
      products: prev.products.map(p => 
        p.id === productId 
          ? { ...p, reviews: [review, ...(p.reviews || [])] } 
          : p
      )
    }));
  };

  const updateVendorStatus = (id: string, status: boolean) => {
    setState(prev => ({
      ...prev,
      vendors: prev.vendors.map(v => v.id === id ? { ...v, isApproved: status } : v)
    }));
  };

  const addAdmin = (admin: User) => {
    setState(prev => ({ ...prev, admins: [...prev.admins, admin] }));
  };

  const removeAdmin = (id: string) => {
    setState(prev => ({ ...prev, admins: prev.admins.filter(a => a.id !== id) }));
  };

  const placeOrder = () => {
    if (!state.currentUser) return;
    const subtotal = state.cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const deliveryFee = subtotal > 500 ? 0 : 49;
    const total = subtotal + deliveryFee;

    const newOrder: Order = {
      id: `ORD-${Math.floor(Math.random() * 90000) + 10000}`,
      customerId: state.currentUser.id,
      items: [...state.cart],
      date: new Date().toISOString(),
      total: total,
      status: 'Processing'
    };

    setState(prev => ({
      ...prev,
      orders: [newOrder, ...prev.orders],
      cart: []
    }));
  };

  const getLiveUser = () => {
    if (!state.currentUser) return null;
    return state.currentUser;
  };

  const liveUser = getLiveUser();

  return (
    <Router>
      <div className="min-h-screen flex flex-col pb-16 md:pb-0">
        <Navbar cartCount={state.cart.length} wishlistCount={state.wishlist.length} user={liveUser} onLogout={logout} />
        
        <main className="flex-grow container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<HomePage products={state.products} wishlist={state.wishlist} onToggleWishlist={toggleWishlist} onAddToCart={addToCart} />} />
            <Route path="/product/:id" element={<ProductDetails products={state.products} wishlist={state.wishlist} onToggleWishlist={toggleWishlist} onAddToCart={addToCart} onAddReview={addReview} currentUser={liveUser} />} />
            <Route path="/cart" element={<CartPage cart={state.cart} onRemove={removeFromCart} onUpdateQty={updateCartQty} onPlaceOrder={placeOrder} currentUser={liveUser} />} />
            <Route path="/auth" element={<AuthPage onLogin={login} vendors={state.vendors} admins={state.admins} />} />
            <Route path="/vendor/register" element={<VendorRegistration onRegister={(v) => setState(prev => ({ ...prev, vendors: [...prev.vendors, v] }))} />} />
            <Route path="/orders" element={<OrderHistory orders={state.orders} currentUser={liveUser} />} />
            <Route path="/account" element={<AccountPage user={liveUser} onLogout={logout} />} />
            <Route path="/wishlist" element={<WishlistPage products={state.products} wishlist={state.wishlist} onToggleWishlist={toggleWishlist} onAddToCart={addToCart} />} />
            
            {/* Protected Routes */}
            <Route 
              path="/admin" 
              element={
                liveUser?.role === 'ADMIN' ? 
                <AdminDashboard 
                  vendors={state.vendors} 
                  products={state.products} 
                  admins={state.admins}
                  onUpdateVendor={updateVendorStatus} 
                  onAddAdmin={addAdmin}
                  onRemoveAdmin={removeAdmin}
                /> : 
                <Navigate to="/auth" />
              } 
            />
            <Route 
              path="/vendor/dashboard" 
              element={
                liveUser?.role === 'VENDOR' ? 
                <VendorDashboard 
                  user={liveUser} 
                  products={state.products} 
                  onAddProduct={addProduct} 
                  onUpdateProduct={updateProduct}
                  onDeleteProduct={deleteProduct}
                /> : 
                <Navigate to="/auth" />
              } 
            />
          </Routes>
        </main>

        <BottomNav />
      </div>
    </Router>
  );
};

export default App;
