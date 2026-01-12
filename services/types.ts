
export type UserRole = 'CUSTOMER' | 'VENDOR' | 'ADMIN';

export interface User {
  id: string;
  phone?: string;
  email?: string;
  name: string;
  role: UserRole;
  storeName?: string;
  isApproved?: boolean;
  password?: string; // Added for simulated login of created admins
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  vendorId: string;
  vendorName: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stock: number;
  views?: number;
  salesCount?: number;
  reviews?: Review[];
}

export interface CartItem extends Product {
  quantity: number;
}

export type OrderStatus = 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface Order {
  id: string;
  customerId: string;
  items: CartItem[];
  date: string;
  total: number;
  status: OrderStatus;
}

export interface AppState {
  currentUser: User | null;
  products: Product[];
  cart: CartItem[];
  vendors: User[];
  admins: User[]; // Added tracking for multiple admin accounts
  orders: Order[];
  wishlist: string[];
}
