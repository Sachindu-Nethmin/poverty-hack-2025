// src/components/FeaturedCampaign.tsx
export default function FeaturedCampaign() {
  return (
    <section className="py-16" id="donations">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border-2 bg-white shadow-lg overflow-hidden grid lg:grid-cols-2">
          <div className="p-10 lg:p-14">
            <div className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700">
              <span className="px-3 py-1.5 rounded-full bg-emerald-50 border-2 border-emerald-100">
                LKR 6,500 / day
              </span>
              <span className="text-gray-400">Ongoing</span>
            </div>
            <h2 className="mt-5 text-3xl sm:text-4xl font-bold leading-tight tracking-tight">
              Providing a Sustainable Hot Water Solution for Mannar District
              General Hospital
            </h2>
            <p className="mt-5 text-gray-700 text-lg leading-relaxed">
              Help us install a solar-assisted system to supply hot water for
              wards and theatres, reducing costs and ensuring safe patient care.
            </p>

            <div className="mt-7 flex items-center gap-4">
              <button className="px-8 py-4 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 text-base font-semibold transition-colors">
                Donate Now
              </button>
              <button className="px-8 py-4 rounded-md border-2 text-base font-semibold hover:bg-gray-50 transition-colors">
                Learn More
              </button>
            </div>
          </div>
          <div className="relative">
            <img
              className="h-full w-full object-cover"
              src="https://images.unsplash.com/photo-1584433144859-1fc3ab64a957?q=80&w=1600&auto=format&fit=crop"
              alt="Hospital"
            />
            <div className="absolute bottom-4 right-4 bg-emerald-600 text-white text-xs px-3 py-1 rounded-full shadow">
              Featured
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
