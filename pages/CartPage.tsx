
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartItem, User } from '../types';
import { Trash2, Plus, Minus, ShoppingBag, ShieldCheck } from 'lucide-react';

interface Props {
  cart: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQty: (id: string, delta: number) => void;
  onPlaceOrder: () => void;
  currentUser: User | null;
}

const CartPage: React.FC<Props> = ({ cart, onRemove, onUpdateQty, onPlaceOrder, currentUser }) => {
  const navigate = useNavigate();
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const deliveryFee = subtotal > 500 ? 0 : 49;
  const total = subtotal + deliveryFee;

  const handleCheckout = () => {
    if (!currentUser) {
      alert("Please login to proceed with your order.");
      navigate('/auth');
      return;
    }
    onPlaceOrder();
    alert("Order placed successfully!");
    navigate('/orders');
  };

  if (cart.length === 0) {
    return (
      <div className="text-center py-20 space-y-4">
        <div className="inline-block p-6 bg-pink-50 rounded-full text-pink-600">
          <ShoppingBag size={48} />
        </div>
        <h2 className="text-2xl font-bold">Your cart is empty</h2>
        <p className="text-gray-500">Go ahead and explore top categories!</p>
        <Link to="/" className="inline-block bg-pink-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-pink-700">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8 animate-in fade-in duration-500">
      <div className="lg:col-span-2 space-y-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
           Cart Items <span className="text-gray-400 font-normal">({cart.length})</span>
        </h2>
        {cart.map(item => (
          <div key={item.id} className="bg-white p-4 rounded-xl border border-gray-200 flex gap-4 shadow-sm">
            <img src={item.image} alt={item.name} className="w-24 h-32 object-cover rounded-lg" />
            <div className="flex-grow space-y-1">
              <h3 className="font-medium text-gray-800 line-clamp-1">{item.name}</h3>
              <p className="text-xs text-gray-400">Vendor: {item.vendorName}</p>
              <div className="flex items-center gap-2 pt-2">
                <span className="text-lg font-bold">₹{item.price}</span>
                <span className="text-xs text-gray-400 line-through">₹{Math.floor(item.price * 1.5)}</span>
              </div>
              <div className="flex items-center justify-between pt-3">
                <div className="flex items-center border rounded-lg overflow-hidden">
                  <button 
                    onClick={() => onUpdateQty(item.id, -1)}
                    className="px-3 py-1 bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="px-4 text-sm font-bold">{item.quantity}</span>
                  <button 
                    onClick={() => onUpdateQty(item.id, 1)}
                    className="px-3 py-1 bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <button 
                  onClick={() => onRemove(item.id)}
                  className="text-gray-400 hover:text-red-500 p-2"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
          <h3 className="font-bold text-lg">Price Details</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Cart Total</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Delivery Fee</span>
              <span className={deliveryFee === 0 ? 'text-green-600 font-bold' : ''}>
                {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
              </span>
            </div>
            <div className="border-t pt-3 flex justify-between font-extrabold text-lg">
              <span>Order Total</span>
              <span>₹{total}</span>
            </div>
          </div>
          <button 
            onClick={handleCheckout}
            className="w-full bg-pink-600 text-white py-4 rounded-xl font-bold hover:bg-pink-700 transition-all shadow-lg shadow-pink-100 active:scale-95"
          >
            Proceed to Payment
          </button>
        </div>

        <div className="bg-green-50 p-4 rounded-xl border border-green-100 flex gap-3 text-green-700">
          <div className="bg-white p-2 rounded-full h-fit">
            <ShieldCheck size={20} className="text-green-600" />
          </div>
          <div>
            <p className="text-sm font-bold">Safe & Secure Payments</p>
            <p className="text-xs">Your data is encrypted and secure.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
