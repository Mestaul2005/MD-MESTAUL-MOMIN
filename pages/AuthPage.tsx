
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../types';
import { Smartphone, ShieldCheck, Mail, Bell, RefreshCw, Store, Lock, ArrowLeft } from 'lucide-react';

interface Props {
  onLogin: (user: User) => void;
  vendors: User[];
  admins: User[];
}

const AuthPage: React.FC<Props> = ({ onLogin, vendors, admins }) => {
  const [step, setStep] = useState<'phone' | 'otp' | 'admin_login' | 'vendor_login' | 'vendor_reset'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [showSmsToast, setShowSmsToast] = useState(false);
  const [showEmailToast, setShowEmailToast] = useState(false);
  const [timer, setTimer] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let interval: any;
    if (timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const generateAndSendOtp = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);
    setShowSmsToast(true);
    setTimer(30);
    setTimeout(() => setShowSmsToast(false), 8000); // Hide toast after 8s
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length === 10) {
      generateAndSendOtp();
      setStep('otp');
    } else {
      alert("Please enter a valid 10-digit number");
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp === generatedOtp) {
      onLogin({ id: 'u1', name: 'Meneric Shopper', phone, role: 'CUSTOMER' });
      navigate('/');
    } else {
      alert("Invalid OTP. Please check the simulated SMS notification at the top of your screen.");
    }
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Check dynamic admins list
    const admin = admins.find(a => a.email === email && a.password === password);
    
    if (admin) {
       onLogin(admin);
       navigate('/admin');
    } else {
       alert("Invalid admin credentials. Contact the master admin to create an account for you.");
    }
  };

  const handleVendorLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const vendor = vendors.find(v => v.email === email || v.phone === email);
    if (vendor && password === 'admin123') { 
       onLogin(vendor);
       navigate('/vendor/dashboard');
    } else if (email === 'vendor@meneric.com' && password === 'admin123') {
       onLogin({ id: 'v1', name: 'Demo Vendor', role: 'VENDOR', storeName: 'Fab Fashions', isApproved: true });
       navigate('/vendor/dashboard');
    } else {
       alert("Invalid vendor credentials or account not found.");
    }
  };

  const handleResetRequest = (e: React.FormEvent) => {
    e.preventDefault();
    const vendorExists = vendors.some(v => v.email === resetEmail) || resetEmail === 'vendor@meneric.com';
    
    if (vendorExists) {
      setShowEmailToast(true);
      setTimeout(() => {
        setShowEmailToast(false);
        setStep('vendor_login');
      }, 5000);
    } else {
      alert("No vendor account found with this email address.");
    }
  };

  return (
    <div className="relative">
      {showSmsToast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-sm animate-in slide-in-from-top duration-500">
          <div className="bg-white/90 backdrop-blur-md border border-gray-200 shadow-2xl rounded-2xl p-4 flex gap-4 items-start">
            <div className="bg-pink-600 p-2 rounded-xl text-white shrink-0">
              <Bell size={20} />
            </div>
            <div className="flex-grow">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-bold text-gray-900">MENERIC SMS</span>
                <span className="text-[10px] text-gray-400">just now</span>
              </div>
              <p className="text-sm text-gray-600 leading-snug">
                Your Meneric verification code is <span className="font-bold text-gray-900 tracking-wider">{generatedOtp}</span>.
              </p>
            </div>
          </div>
        </div>
      )}

      {showEmailToast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-sm animate-in slide-in-from-top duration-500">
          <div className="bg-white/95 backdrop-blur-md border border-blue-200 shadow-2xl rounded-2xl p-4 flex gap-4 items-start border-l-4 border-l-blue-500">
            <div className="bg-blue-500 p-2 rounded-xl text-white shrink-0">
              <Mail size={20} />
            </div>
            <div className="flex-grow">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-bold text-gray-900">MENERIC EMAIL</span>
                <span className="text-[10px] text-gray-400">just now</span>
              </div>
              <p className="text-sm text-gray-600 leading-snug">
                Password reset link sent to <span className="font-bold text-blue-600">{resetEmail}</span>.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-md mx-auto my-12 p-8 bg-white rounded-2xl shadow-xl border border-gray-100 transition-all">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-pink-600 italic tracking-tighter">MENERIC</h1>
          <p className="text-gray-500 text-sm mt-1">Join the community of smart shoppers</p>
        </div>

        <div className="flex mb-8 bg-gray-50 p-1 rounded-xl">
           <button 
             className={`flex-1 py-2 text-[10px] font-bold rounded-lg transition-all ${step === 'phone' || step === 'otp' ? 'bg-white text-pink-600 shadow-sm' : 'text-gray-400'}`}
             onClick={() => setStep('phone')}
           >
             Customer
           </button>
           <button 
             className={`flex-1 py-2 text-[10px] font-bold rounded-lg transition-all ${step === 'vendor_login' || step === 'vendor_reset' ? 'bg-white text-pink-600 shadow-sm' : 'text-gray-400'}`}
             onClick={() => setStep('vendor_login')}
           >
             Vendor
           </button>
           <button 
             className={`flex-1 py-2 text-[10px] font-bold rounded-lg transition-all ${step === 'admin_login' ? 'bg-white text-pink-600 shadow-sm' : 'text-gray-400'}`}
             onClick={() => setStep('admin_login')}
           >
             Admin
           </button>
        </div>

        {step === 'phone' && (
          <form onSubmit={handleSendOtp} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Mobile Number</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 border-r pr-2 border-gray-200">
                  <span className="text-sm font-bold text-gray-500">+91</span>
                </div>
                <input 
                  type="tel" 
                  placeholder="Enter 10 digits"
                  maxLength={10}
                  className="w-full pl-16 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-xl focus:border-pink-500 focus:bg-white outline-none transition-all text-lg font-medium"
                  value={phone}
                  onChange={e => setPhone(e.target.value.replace(/\D/g, ''))}
                  required
                />
              </div>
            </div>
            <button className="w-full bg-pink-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-pink-700 transition-all shadow-lg shadow-pink-100 active:scale-95">
              Send OTP
            </button>
          </form>
        )}

        {step === 'otp' && (
          <form onSubmit={handleVerifyOtp} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Verification code sent to {phone}</p>
            </div>
            <input 
              type="text" 
              placeholder="000000"
              maxLength={6}
              className="w-full text-center tracking-[0.5rem] text-3xl font-black py-4 bg-gray-50 border-2 border-transparent rounded-xl focus:border-pink-500 outline-none"
              value={otp}
              onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
              required
            />
            <button className="w-full bg-pink-600 text-white py-4 rounded-xl font-bold text-lg">
              Verify & Login
            </button>
          </form>
        )}

        {step === 'vendor_login' && (
          <form onSubmit={handleVendorLogin} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="text" 
                  placeholder="Email or Phone"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-xl focus:border-pink-500 focus:bg-white outline-none"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="password" 
                  placeholder="Password"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-xl focus:border-pink-500 focus:bg-white outline-none"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button 
                type="button" 
                onClick={() => setStep('vendor_reset')}
                className="text-xs font-bold text-pink-600 hover:text-pink-700"
              >
                Forgot Password?
              </button>
            </div>
            <button className="w-full bg-pink-600 text-white py-4 rounded-xl font-bold text-lg">
              Vendor Login
            </button>
          </form>
        )}

        {step === 'vendor_reset' && (
          <form onSubmit={handleResetRequest} className="space-y-6 animate-in fade-in zoom-in duration-300">
            <div className="flex items-center gap-2 mb-2">
              <button 
                type="button" 
                onClick={() => setStep('vendor_login')}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeft size={18} className="text-gray-400" />
              </button>
              <h3 className="font-bold text-gray-800">Reset Vendor Password</h3>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed px-1">
              Enter your registered email address.
            </p>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="email" 
                placeholder="registered-email@example.com"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-xl focus:border-pink-500 focus:bg-white outline-none"
                value={resetEmail}
                onChange={e => setResetEmail(e.target.value)}
                required
              />
            </div>
            <button className="w-full bg-pink-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-pink-100">
              Send Reset Link
            </button>
          </form>
        )}

        {step === 'admin_login' && (
          <form onSubmit={handleAdminLogin} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="email" 
                  placeholder="Admin Email"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-xl focus:border-gray-900 focus:bg-white outline-none"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="password" 
                  placeholder="Password"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-xl focus:border-gray-900 focus:bg-white outline-none"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <button className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold text-lg">
              Admin Login
            </button>
          </form>
        )}

        <div className="mt-10 pt-6 border-t flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 text-green-600">
            <ShieldCheck size={20} />
            <span className="text-xs font-black uppercase tracking-widest">PCI-DSS COMPLIANT</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
