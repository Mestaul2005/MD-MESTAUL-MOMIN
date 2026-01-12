
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Product, User, Review } from '../types';
import { ShoppingCart, Star, Heart, Share2, ShieldCheck, ChevronRight, MessageSquare, Send } from 'lucide-react';

interface Props {
  products: Product[];
  wishlist: string[];
  onToggleWishlist: (id: string) => void;
  onAddToCart: (p: Product) => void;
  onAddReview: (productId: string, review: Review) => void;
  currentUser: User | null;
}

const ProductDetails: React.FC<Props> = ({ products, wishlist, onToggleWishlist, onAddToCart, onAddReview, currentUser }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === id);

  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!product) return <div className="p-10 text-center">Product not found.</div>;

  const isLiked = wishlist.includes(product.id);
  const reviews = product.reviews || [];
  const averageRating = reviews.length > 0 
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : '0.0';

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      alert("Please login to leave a review.");
      navigate('/auth');
      return;
    }
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    const review: Review = {
      id: Math.random().toString(36).substr(2, 9),
      userName: currentUser.name,
      rating: newRating,
      comment: newComment,
      date: new Date().toISOString().split('T')[0]
    };

    // Simulate small delay
    setTimeout(() => {
      onAddReview(product.id, review);
      setNewComment('');
      setNewRating(5);
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-[4/5] rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            <button 
              onClick={() => onToggleWishlist(product.id)}
              className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md transition-all active:scale-90 shadow-xl ${isLiked ? 'bg-pink-600 text-white' : 'bg-white/80 text-gray-400'}`}
            >
              <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
            </button>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => onAddToCart(product)}
              className="flex-1 bg-white border border-pink-600 text-pink-600 py-4 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-pink-50 transition-colors active:scale-95"
            >
              <ShoppingCart size={20} /> Add to Cart
            </button>
            <button 
              onClick={() => { onAddToCart(product); navigate('/cart'); }}
              className="flex-1 bg-pink-600 text-white py-4 rounded-lg font-bold hover:bg-pink-700 transition-colors shadow-lg shadow-pink-200 active:scale-95"
            >
              Buy Now
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800 tracking-tight">{product.name}</h1>
            <div className="mt-3 flex items-baseline gap-3">
              <span className="text-3xl font-black text-pink-600">₹{product.price}</span>
              <span className="text-lg text-gray-400 line-through">₹{Math.floor(product.price * 1.5)}</span>
              <span className="text-sm font-black text-green-600">30% off</span>
            </div>
            <div className="mt-4 flex items-center gap-4">
              <div className="flex items-center gap-1.5 bg-green-600 text-white text-xs font-black px-2.5 py-1 rounded-md">
                {averageRating} <Star size={12} fill="currentColor" />
              </div>
              <span className="text-sm text-gray-400 font-medium">{reviews.length} Ratings, {reviews.length} Reviews</span>
            </div>
            <div className="mt-4 inline-block bg-gray-100 text-gray-600 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full">
              Free Delivery
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-black text-gray-800 uppercase tracking-widest text-xs">Product Details</h3>
            <p className="text-gray-600 leading-relaxed text-sm">{product.description}</p>
            <div className="grid grid-cols-2 gap-y-3 text-xs pt-4 border-t border-gray-50">
              <span className="text-gray-400 font-bold uppercase tracking-tighter">Category</span>
              <span className="font-bold text-gray-700">{product.category}</span>
              <span className="text-gray-400 font-bold uppercase tracking-tighter">Vendor</span>
              <span className="font-bold text-pink-600">{product.vendorName}</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between group cursor-pointer hover:border-pink-200 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-pink-100 rounded-2xl flex items-center justify-center text-pink-600 font-black text-xl shadow-inner">
                {product.vendorName.charAt(0)}
              </div>
              <div>
                <h4 className="font-bold text-gray-800">{product.vendorName}</h4>
                <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Trusted Supplier</p>
              </div>
            </div>
            <button className="text-pink-600 text-xs font-black flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              SHOP STORE <ChevronRight size={16} />
            </button>
          </div>

          <div className="flex items-center gap-3 text-[10px] text-gray-400 font-black uppercase tracking-widest">
            <ShieldCheck size={16} className="text-green-500" />
            <span>Secure Payments & Easy Returns</span>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
          <div className="flex items-center gap-3">
            <MessageSquare className="text-pink-600" size={24} />
            <h2 className="text-xl font-black text-gray-800 tracking-tight">Product Reviews</h2>
          </div>
        </div>

        <div className="p-8 grid md:grid-cols-12 gap-12">
          {/* Rating Summary */}
          <div className="md:col-span-4 space-y-8">
            <div className="bg-pink-50 p-8 rounded-3xl text-center space-y-2 border border-pink-100 shadow-inner">
              <div className="text-5xl font-black text-pink-600">{averageRating}</div>
              <div className="flex justify-center gap-1 text-yellow-400">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star key={star} size={20} fill={star <= Math.round(Number(averageRating)) ? "currentColor" : "none"} />
                ))}
              </div>
              <p className="text-xs text-pink-400 font-bold uppercase tracking-widest pt-2">Based on {reviews.length} Reviews</p>
            </div>

            {/* Leave a Review Form */}
            <form onSubmit={handleReviewSubmit} className="space-y-6">
              <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest px-1">Write a Review</h4>
              <div className="space-y-4">
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button 
                      key={star}
                      type="button"
                      onClick={() => setNewRating(star)}
                      className={`p-1 transition-transform hover:scale-125 ${newRating >= star ? 'text-yellow-400' : 'text-gray-200'}`}
                    >
                      <Star size={24} fill={newRating >= star ? "currentColor" : "none"} />
                    </button>
                  ))}
                </div>
                <textarea
                  required
                  placeholder="Share your experience with this product..."
                  className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-pink-500 focus:bg-white rounded-2xl outline-none text-sm h-32 resize-none transition-all shadow-inner"
                  value={newComment}
                  onChange={e => setNewComment(e.target.value)}
                ></textarea>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gray-900 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-black transition-all active:scale-95 shadow-lg disabled:opacity-50"
                >
                  {isSubmitting ? "Posting..." : <>Post Review <Send size={14} /></>}
                </button>
              </div>
            </form>
          </div>

          {/* Reviews List */}
          <div className="md:col-span-8 space-y-6">
            {reviews.length === 0 ? (
              <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200 space-y-4">
                <p className="text-gray-400 font-bold uppercase tracking-tighter">No reviews yet. Be the first to rate this!</p>
              </div>
            ) : (
              <div className="space-y-6 max-h-[600px] overflow-y-auto pr-4 custom-scrollbar">
                {reviews.map(review => (
                  <div key={review.id} className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 font-bold shadow-inner">
                          {review.userName.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-800">{review.userName}</p>
                          <p className="text-[10px] text-gray-400 font-medium">{new Date(review.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 bg-green-50 text-green-600 px-2 py-1 rounded-md text-[10px] font-black border border-green-100">
                        {review.rating} <Star size={10} fill="currentColor" />
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{review.comment}</p>
                    <div className="mt-4 flex items-center gap-4 pt-4 border-t border-gray-50">
                       <button className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-pink-600 transition-colors">Helpful (0)</button>
                       <button className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-pink-600 transition-colors">Report</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
