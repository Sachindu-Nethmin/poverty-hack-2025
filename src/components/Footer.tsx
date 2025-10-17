// src/components/Footer.tsx
export default function Footer() {
  return (
    <footer className="border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white font-bold">
              H
            </span>
            <span className="font-semibold">Hope4Ever</span>
          </div>
          <nav className="text-sm text-gray-600 flex flex-wrap gap-4">
            <a className="hover:text-gray-900" href="#">Donations</a>
            <a className="hover:text-gray-900" href="#">Popular Causes</a>
            <a className="hover:text-gray-900" href="#">Volunteer</a>
            <a className="hover:text-gray-900" href="#">About</a>
            <a className="hover:text-gray-900" href="#">Contact</a>
          </nav>
          <p className="text-xs text-gray-500">© {new Date().getFullYear()} Hope4Ever. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
