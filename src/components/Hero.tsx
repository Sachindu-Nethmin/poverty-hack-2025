// src/components/Hero.tsx
import heroImage from '../assets/hero.png';
import nicu from '../assets/nicu.png';
import Centr from '../assets/Centrifuge.png';

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-emerald-50 via-white to-amber-50" />
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 grid lg:grid-cols-12 gap-10 items-start">
        {/* Left copy */}
  <div className="lg:col-span-6 flex flex-col justify-start">
          <p className="text-emerald-700 font-bold mb-3 text-lg tracking-wide">Give Health.Give Hope.</p>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight">
            Your Trusted Source for Sri Lanka's Public Health
          </h1>
          <p className="mt-6 text-gray-700 text-lg leading-relaxed max-w-prose">
            Unlock Healing for All. Donate to equip hospitals and centers 
            with the essential resources needed to serve every single patient who needs help.
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
            <div className="h-64 w-full overflow-hidden relative group">
              <img
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-in-out group-hover:scale-110"
                src={heroImage}
                alt="Care"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/3 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-in-out">
                <div className="absolute inset-0 backdrop-blur-[2px] [mask-image:linear-gradient(to_top,black_70%,transparent_100%)]"></div>
              </div>
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

          {/* Small side card
          <article className="rounded-2xl border shadow-sm overflow-hidden bg-white">
            <div className="h-40 w-full overflow-hidden relative group">
              <img
                className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                src={nicu}
                alt="Ward"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/3 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-in-out">
                <div className="absolute inset-0 backdrop-blur-[2px] [mask-image:linear-gradient(to_top,black_70%,transparent_100%)]"></div>
              </div>
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
            <div className="h-40 w-full overflow-hidden relative group">
              <img
                className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                src={Centr}
                alt="Lab"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/3 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-in-out">
                <div className="absolute inset-0 backdrop-blur-[2px] [mask-image:linear-gradient(to_top,black_70%,transparent_100%)]"></div>
              </div>
            </div>
            <div className="p-5">
              <p className="text-xs text-gray-500 font-medium">$1,200 needed</p>
              <h3 className="font-semibold">Repair Centrifuge – Lab</h3>
              <button className="mt-4 w-full rounded-md bg-emerald-600 text-white py-2 text-sm hover:bg-emerald-700">
                Donate
              </button>
            </div>
          </article> */}
        </div>
      </div>
    </section>
  );
}
