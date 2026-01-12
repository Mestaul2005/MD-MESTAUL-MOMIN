
import React from 'react';
import { Link } from 'react-router-dom';
import { Order, User } from '../types';
import { Package, ChevronRight, Clock, CheckCircle2, Truck, XCircle, ShoppingBag } from 'lucide-react';

interface Props {
  orders: Order[];
  currentUser: User | null;
}

const OrderHistory: React.FC<Props> = ({ orders, currentUser }) => {
  if (!currentUser) {
    return (
      <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
        <h2 className="text-xl font-bold text-gray-800">Please login to view your orders</h2>
        <Link to="/auth" className="mt-4 inline-block bg-pink-600 text-white px-6 py-2 rounded-lg font-bold">
          Login Now
        </Link>
      </div>
    );
  }

  const userOrders = orders.filter(o => o.customerId === currentUser.id);

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'Processing': return <Clock size={16} className="text-blue-500" />;
      case 'Shipped': return <Truck size={16} className="text-purple-500" />;
      case 'Delivered': return <CheckCircle2 size={16} className="text-green-500" />;
      case 'Cancelled': return <XCircle size={16} className="text-red-500" />;
      default: return <Package size={16} className="text-gray-500" />;
    }
  };

  const getStatusStyles = (status: Order['status']) => {
    switch (status) {
      case 'Processing': return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'Shipped': return 'bg-purple-50 text-purple-700 border-purple-100';
      case 'Delivered': return 'bg-green-50 text-green-700 border-green-100';
      case 'Cancelled': return 'bg-red-50 text-red-700 border-red-100';
      default: return 'bg-gray-50 text-gray-700 border-gray-100';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black text-gray-800 tracking-tight">My Orders</h1>
        <div className="text-xs font-bold text-gray-400 uppercase tracking-widest bg-gray-100 px-3 py-1 rounded-full">
          {userOrders.length} Total
        </div>
      </div>

      {userOrders.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-gray-100 shadow-sm text-center space-y-4">
          <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto text-gray-300">
            <ShoppingBag size={40} />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-gray-800">No orders yet</h3>
            <p className="text-sm text-gray-500">Start shopping to fill this page with goodies!</p>
          </div>
          <Link to="/" className="inline-block bg-pink-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-pink-700 transition-all active:scale-95">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {userOrders.map(order => (
            <div key={order.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-4 md:p-6 flex flex-col md:flex-row gap-6">
                {/* Order Meta */}
                <div className="md:w-1/4 space-y-2">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Order ID</p>
                  <p className="text-sm font-bold text-gray-900">{order.id}</p>
                  <div className={`mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-wide ${getStatusStyles(order.status)}`}>
                    {getStatusIcon(order.status)}
                    {order.status}
                  </div>
                </div>

                {/* Items Summary */}
                <div className="flex-grow space-y-4">
                  <div className="flex -space-x-3 overflow-hidden">
                    {order.items.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="w-12 h-12 rounded-lg border-2 border-white shadow-sm overflow-hidden bg-gray-100">
                        <img src={item.image} alt="" className="w-full h-full object-cover" />
                      </div>
                    ))}
                    {order.items.length > 3 && (
                      <div className="w-12 h-12 rounded-lg border-2 border-white bg-gray-800 text-white flex items-center justify-center text-[10px] font-bold">
                        +{order.items.length - 3}
                      </div>
                    )}
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-700 line-clamp-1">
                      {order.items.map(i => i.name).join(', ')}
                    </p>
                    <p className="text-xs text-gray-400">
                      Ordered on {new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                </div>

                {/* Order Total & Action */}
                <div className="md:w-1/4 flex flex-row md:flex-col justify-between items-center md:items-end border-t md:border-t-0 md:border-l border-gray-50 pt-4 md:pt-0 md:pl-6">
                  <div className="text-right">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Order Total</p>
                    <p className="text-lg font-black text-pink-600">₹{order.total}</p>
                  </div>
                  <button className="flex items-center gap-1 text-xs font-bold text-gray-400 hover:text-pink-600 transition-colors">
                    Track Order <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
