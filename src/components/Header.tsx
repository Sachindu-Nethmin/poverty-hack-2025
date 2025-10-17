// src/components/Header.tsx
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/logo .png';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

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

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img 
            src={logo} 
            alt="Hope4Ever Logo" 
            className="h-10 w-10 object-contain"
          />
          <span className="font-bold text-xl">Hope4Ever</span>
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
        </nav>

        <div className="flex items-center gap-3">
          <button className="hidden sm:inline-flex px-5 py-2.5 rounded-md border-2 hover:bg-gray-50 text-base font-medium transition-colors">
            Sign in
          </button>
          <button 
            onClick={() => navigate('/submit-need')}
            className="inline-flex px-5 py-2.5 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 text-base font-semibold transition-colors cursor-pointer"
          >
            Donate
          </button>
        </div>
      </div>
    </header>
  );
}
