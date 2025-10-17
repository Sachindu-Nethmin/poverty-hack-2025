// src/components/Hero.tsx
import heroImage from '../assets/hero.png';

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-emerald-50 via-white to-amber-50" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 grid lg:grid-cols-12 gap-10">
        {/* Left copy */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          <p className="text-emerald-700 font-bold mb-3 text-lg tracking-wide">Give Help, Get Hope.</p>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight">
            Your Trusted Source for Sri Lanka's Public Health
          </h1>
          <p className="mt-6 text-gray-700 text-lg leading-relaxed max-w-prose">
            Join us to fund urgent medical needs across Sri Lankan hospitals.
            We publish verified requests like broken machines and critical
            supplies so your donation reaches the bedside quickly.
          </p>
          <div className="mt-8 flex items-center gap-4">
            <a
              href="#donations"
              className="px-8 py-4 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 text-base font-semibold transition-colors"
            >
              Donate Now
            </a>
            <a
              href="#how"
              className="px-8 py-4 rounded-md border-2 text-base font-semibold hover:bg-gray-50 transition-colors"
            >
              How it works
            </a>
          </div>
        </div>

        {/* Right cards */}
        <div className="lg:col-span-6 grid gap-4 sm:grid-cols-2">
          {/* Primary big card */}
          <article className="sm:col-span-2 rounded-2xl border shadow-sm overflow-hidden bg-white">
            <div className="h-64 w-full overflow-hidden">
              <img
                className="w-full h-full object-cover object-center"
                src={heroImage}
                alt="Care"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-emerald-600 font-bold">LKR 2,450,000 raised</p>
                <p className="text-xs text-gray-500 font-semibold">Goal: LKR 8,500,000</p>
              </div>
              <h3 className="font-bold text-xl mt-2">Emergency Medical Equipment for Rural Hospitals</h3>
              <p className="text-sm text-emerald-700 font-semibold mt-2 flex items-center gap-1">
                <span className="inline-block w-2 h-2 bg-emerald-600 rounded-full"></span>
                Multiple District Hospitals
              </p>
              <p className="text-base text-gray-600 mt-3 leading-relaxed">
                Help us provide life-saving medical equipment to hospitals across rural Sri Lanka, ensuring quality healthcare reaches every community.
              </p>
              
              {/* Progress bar */}
              <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
                <div className="bg-emerald-600 h-2 rounded-full w-[29%]"></div>
              </div>
              
              <button className="mt-5 w-full rounded-md bg-emerald-600 text-white py-3 text-base font-semibold hover:bg-emerald-700 transition-colors">
                Donate Now
              </button>
            </div>
          </article>

          {/* Small side card */}
          <article className="rounded-2xl border shadow-sm overflow-hidden bg-white">
            <div className="h-40 w-full overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200&auto=format&fit=crop"
                alt="Ward"
              />
            </div>
            <div className="p-5">
              <p className="text-xs text-gray-500 font-medium">$250 needed</p>
              <h3 className="font-semibold">Buy Consumables for NICU</h3>
              <button className="mt-4 w-full rounded-md bg-emerald-600 text-white py-2 text-sm hover:bg-emerald-700">
                Donate
              </button>
            </div>
          </article>

          <article className="rounded-2xl border shadow-sm overflow-hidden bg-white">
            <div className="h-40 w-full overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src="https://images.unsplash.com/photo-1580281657527-47d5aa4c1c4a?q=80&w=1200&auto=format&fit=crop"
                alt="Lab"
              />
            </div>
            <div className="p-5">
              <p className="text-xs text-gray-500 font-medium">$1,200 needed</p>
              <h3 className="font-semibold">Repair Centrifuge – Lab</h3>
              <button className="mt-4 w-full rounded-md bg-emerald-600 text-white py-2 text-sm hover:bg-emerald-700">
                Donate
              </button>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
