// src/components/Header.tsx
import logo from '../assets/logo .png';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3">
          <img 
            src={logo} 
            alt="Hope4Ever Logo" 
            className="h-10 w-10 object-contain"
          />
          <span className="font-bold text-xl">Hope4Ever</span>
        </a>

        <nav className="hidden md:flex items-center gap-6 text-base">
          <a className="hover:text-emerald-700 transition-colors" href="#home">Home</a>
          <a className="hover:text-emerald-700 transition-colors" href="#donations">All Needs</a>
          <a className="hover:text-emerald-700 transition-colors" href="#how">How It Works</a>
          <a className="hover:text-emerald-700 transition-colors" href="#faq">FAQ</a>
        </nav>

        <div className="flex items-center gap-3">
          <button className="hidden sm:inline-flex px-5 py-2.5 rounded-md border-2 hover:bg-gray-50 text-base font-medium transition-colors">
            Sign in
          </button>
          <a 
            href="#donations" 
            className="inline-flex px-5 py-2.5 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 text-base font-semibold transition-colors"
          >
            Donate
          </a>
        </div>
      </div>
    </header>
  );
}
