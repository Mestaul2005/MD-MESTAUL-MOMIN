
import React from 'react';
import { ShoppingBag, User, Store, ShieldCheck, Home, Search, Heart, ShoppingCart } from 'lucide-react';
import { Product, User as UserType } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    vendorId: 'v1',
    vendorName: 'Fab Fashions',
    name: 'Floral Print Saree',
    description: 'Beautiful georgette saree with intricate floral patterns.',
    price: 499,
    category: 'Ethnic Wear',
    image: 'https://picsum.photos/seed/saree/400/500',
    stock: 50,
    reviews: [
      { id: 'r1', userName: 'Anjali P.', rating: 5, comment: 'Absolutely stunning saree! The fabric is so light and elegant.', date: '2024-03-10' },
      { id: 'r2', userName: 'Meera K.', rating: 4, comment: 'Very pretty, but the color is slightly darker than the photo.', date: '2024-03-05' }
    ]
  },
  {
    id: '2',
    vendorId: 'v1',
    vendorName: 'Fab Fashions',
    name: 'Cotton Kurti Set',
    description: 'Comfortable daily wear cotton kurti with leggings.',
    price: 350,
    category: 'Ethnic Wear',
    image: 'https://picsum.photos/seed/kurti/400/500',
    stock: 30,
    reviews: [
      { id: 'r3', userName: 'Sneha S.', rating: 5, comment: 'Perfect for office wear. Very comfortable cotton.', date: '2024-02-28' }
    ]
  },
  {
    id: '3',
    vendorId: 'v2',
    vendorName: 'TechHub',
    name: 'Wireless Earbuds',
    description: 'High quality bass wireless earbuds with 20h battery.',
    price: 899,
    category: 'Electronics',
    image: 'https://picsum.photos/seed/earbuds/400/500',
    stock: 100,
    reviews: [
      { id: 'r4', userName: 'Rohan M.', rating: 4, comment: 'Great sound quality for the price. Battery lasts long.', date: '2024-03-12' }
    ]
  },
  {
    id: '4',
    vendorId: 'v2',
    vendorName: 'TechHub',
    name: 'Smart Watch Pro',
    description: 'Track your fitness and receive notifications.',
    price: 1299,
    category: 'Electronics',
    image: 'https://picsum.photos/seed/watch/400/500',
    stock: 25,
    reviews: []
  },
  {
    id: '5',
    vendorId: 'v3',
    vendorName: 'HomeDecor Co',
    name: 'Scented Candle Set',
    description: 'Set of 4 relaxing lavender scented candles.',
    price: 250,
    category: 'Home & Kitchen',
    image: 'https://picsum.photos/seed/candle/400/500',
    stock: 40,
    reviews: [
      { id: 'r5', userName: 'Priya L.', rating: 5, comment: 'Smells heavenly! My living room feels like a spa.', date: '2024-03-15' }
    ]
  }
];

export const INITIAL_VENDORS: UserType[] = [
  { id: 'v1', name: 'John Doe', role: 'VENDOR', storeName: 'Fab Fashions', isApproved: true },
  { id: 'v2', name: 'Jane Smith', role: 'VENDOR', storeName: 'TechHub', isApproved: true },
  { id: 'v3', name: 'Mike Ross', role: 'VENDOR', storeName: 'HomeDecor Co', isApproved: false }
];

export const NAV_LINKS = [
  { label: 'Home', icon: <Home size={20} />, path: '/' },
  { label: 'Wishlist', icon: <Heart size={20} />, path: '/wishlist' },
  { label: 'Orders', icon: <ShoppingBag size={20} />, path: '/orders' },
  { label: 'Account', icon: <User size={20} />, path: '/account' }
];
