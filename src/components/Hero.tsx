// src/components/Hero.tsx
export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-emerald-50 via-white to-amber-50" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 grid lg:grid-cols-12 gap-10">
        {/* Left copy */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          <p className="text-emerald-700 font-semibold mb-2">Give Help, Get Hope.</p>
          <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight">
            Your gift delivers life and hope.
          </h1>
          <p className="mt-4 text-gray-600 max-w-prose">
            Join us to fund urgent medical needs across Sri Lankan hospitals.
            We publish verified requests—like broken machines and critical
            supplies—so your donation reaches the bedside quickly.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <a
              href="#donations"
              className="px-6 py-3 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 text-sm font-medium"
            >
              Donate Now
            </a>
            <a
              href="#how"
              className="px-6 py-3 rounded-md border text-sm font-medium hover:bg-gray-50"
            >
              How it works
            </a>
          </div>
        </div>

        {/* Right cards */}
        <div className="lg:col-span-6 grid gap-4 sm:grid-cols-2">
          {/* Primary big card */}
          <article className="sm:col-span-2 rounded-2xl border shadow-sm overflow-hidden bg-white">
            <div className="h-44 w-full overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=1600&auto=format&fit=crop"
                alt="Care"
              />
            </div>
            <div className="p-5">
              <p className="text-xs text-gray-500 font-medium">$820 raised</p>
              <h3 className="font-semibold text-lg">Share Food With Others in Need</h3>
              <p className="text-sm text-gray-600 mt-1">
                Provide nutritious meals to families in rural areas while
                hospitals focus on life-saving care.
              </p>
              <button className="mt-4 w-full rounded-md bg-emerald-600 text-white py-2.5 text-sm font-medium hover:bg-emerald-700">
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
