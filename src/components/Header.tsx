// src/components/Header.tsx
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import { User, LogOut, LayoutDashboard } from 'lucide-react';
import logo from '../assets/logo .png';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const handleNavClick = (sectionId: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    // If we're on the home page, just scroll to the section
    if (location.pathname === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If we're on another page, navigate to home first, then scroll
      navigate('/');
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <img 
            src={logo} 
            alt="Sri Lanka Health Logo" 
            className="h-12 w-12 object-contain transition-transform group-hover:scale-105"
          />
          <div className="flex flex-col">
            <span className="font-bold text-xl text-gray-900">Hope4ever</span>
            <span className="text-xs text-emerald-600 font-semibold">Give health,Get Hope</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-base">
          <a 
            className="hover:text-emerald-700 transition-colors cursor-pointer" 
            onClick={handleNavClick('home')}
          >
            Home
          </a>
          <a 
            className="hover:text-emerald-700 transition-colors cursor-pointer" 
            onClick={handleNavClick('donations')}
          >
            All Needs
          </a>
          <a 
            className="hover:text-emerald-700 transition-colors cursor-pointer" 
            onClick={handleNavClick('how')}
          >
            How It Works
          </a>
          <a 
            className="hover:text-emerald-700 transition-colors cursor-pointer" 
            onClick={handleNavClick('faq')}
          >
            FAQ
          </a>
          
          {/* Role-based navigation */}
          {isAuthenticated && user?.role === 'government_admin' && (
            <Link 
              to="/dashboard/ministry"
              className="flex items-center gap-1 text-blue-600 hover:text-blue-700 transition-colors font-semibold"
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </Link>
          )}
          
          {isAuthenticated && user?.role === 'hospital' && (
            <Link 
              to="/dashboard/hospital"
              className="flex items-center gap-1 text-emerald-600 hover:text-emerald-700 transition-colors font-semibold"
            >
              <LayoutDashboard className="w-4 h-4" />
              My Dashboard
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-3">
          {!isAuthenticated ? (
            <>
              <button 
                onClick={() => setShowLogin(true)}
                className="hidden sm:inline-flex px-5 py-2.5 rounded-md border-2 hover:bg-gray-50 text-base font-medium transition-colors"
              >
                Sign in
              </button>
              <button 
                onClick={() => setShowSignup(true)}
                className="inline-flex px-5 py-2.5 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 text-base font-semibold transition-colors cursor-pointer"
              >
                Sign up
              </button>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-emerald-50 rounded-lg border border-emerald-200">
                <User className="w-4 h-4 text-emerald-700" />
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-emerald-900">{user?.name}</span>
                  <span className="text-[10px] text-emerald-600 capitalize">
                    {user?.role.replace('_', ' ')}
                  </span>
                </div>
              </div>
              
              {/* Action button based on role */}
              {user?.role === 'government_admin' ? (
                <button 
                  onClick={() => navigate('/dashboard/ministry')}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-md bg-blue-600 text-white hover:bg-blue-700 text-base font-semibold transition-colors"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </button>
              ) : user?.role === 'hospital' ? (
                <button 
                  onClick={() => navigate('/dashboard/hospital')}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 text-base font-semibold transition-colors"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  My Dashboard
                </button>
              ) : (
                <button 
                  onClick={() => navigate('/payment/ct-scanner')}
                  className="inline-flex px-5 py-2.5 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 text-base font-semibold transition-colors"
                >
                  Donate
                </button>
              )}
              
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-md border-2 border-gray-300 hover:bg-gray-50 text-base font-medium transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Login Modal */}
      <LoginModal 
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onSwitchToSignup={() => {
          setShowLogin(false);
          setShowSignup(true);
        }}
      />

      {/* Signup Modal */}
      <SignupModal 
        isOpen={showSignup}
        onClose={() => setShowSignup(false)}
        onSwitchToLogin={() => {
          setShowSignup(false);
          setShowLogin(true);
        }}
      />
    </header>
  );
}
