// src/components/FeaturedCampaign.tsx
import { useNavigate } from 'react-router-dom';
import hospitalDonationImage from '../assets/hospital_donation.png';

export default function FeaturedCampaign() {
  const navigate = useNavigate();

  return (
    <section className="py-16" id="donations">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border-2 bg-white shadow-lg overflow-hidden grid lg:grid-cols-2">
          <div className="p-10 lg:p-14 flex flex-col justify-center">
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

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <button 
                onClick={() => navigate('/payment/ct-scanner')}
                className="px-8 py-4 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 text-base font-semibold transition-colors shadow-md"
              >
                Donate Now
              </button>
              <button className="px-8 py-4 rounded-md border-2 text-base font-semibold hover:bg-gray-50 transition-colors">
                Learn More
              </button>
            </div>
          </div>
          <div className="relative min-h-[300px] lg:min-h-[400px]">
            <img
              className="absolute inset-0 h-full w-full object-cover"
              src={hospitalDonationImage}
              alt="Hospital Donation - Mannar District General Hospital"
              loading="lazy"
            />
            <div className="absolute bottom-4 right-4 bg-emerald-600 text-white text-sm px-4 py-2 rounded-full shadow-lg font-semibold">
              Featured
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
