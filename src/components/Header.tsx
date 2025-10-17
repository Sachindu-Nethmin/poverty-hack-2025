// src/components/Header.tsx
export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white font-bold">
            H
          </span>
          <span className="font-semibold">Hope4Ever</span>
        </a>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a className="hover:text-emerald-700" href="#">Home</a>
          <a className="hover:text-emerald-700" href="#">All Needs</a>
          <a className="hover:text-emerald-700" href="#">Projects</a>
          <a className="hover:text-emerald-700" href="#">About</a>
        </nav>

        <div className="flex items-center gap-3">
          <button className="hidden sm:inline-flex px-4 py-2 rounded-md border hover:bg-gray-50 text-sm">
            Sign in
          </button>
          <button className="inline-flex px-4 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 text-sm">
            Donate
          </button>
        </div>
      </div>
    </header>
  );
}
