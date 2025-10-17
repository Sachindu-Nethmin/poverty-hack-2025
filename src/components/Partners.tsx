// src/components/Partners.tsx
import unicefLogo from '../assets/unicef.png';
import drdoneLogo from '../assets/drdone.png';
import careplusLogo from '../assets/careplus.png';
import medrelayLogo from '../assets/medrelay.png';
import aidnetworkLogo from '../assets/aidnetwork.png';
import sricareLogo from '../assets/sricare.png';

interface Partner {
  name: string;
  logo: string;
}

export default function Partners() {
  const partners: Partner[] = [
    { name: "UNICEF", logo: unicefLogo },
    { name: "DrDone", logo: drdoneLogo },
    { name: "CarePlus", logo: careplusLogo },
    { name: "MedRelay", logo: medrelayLogo },
    { name: "AidNetwork", logo: aidnetworkLogo },
    { name: "SriCare", logo: sricareLogo },
  ];

  // Duplicate the partners array for seamless infinite scroll
  const duplicatedPartners = [...partners, ...partners];

  return (
    <section className="py-16 border-y bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-center text-3xl font-bold text-gray-800 mb-12 tracking-tight">
          Trusted By Leading Organizations
        </h3>
        
        <div className="relative">
          {/* Scrolling container */}
          <div className="flex animate-scroll">
            {duplicatedPartners.map((partner, index) => (
              <div
                key={`${partner.name}-${index}`}
                className="flex-shrink-0 mx-8 px-12 py-8 bg-white rounded-2xl border-2 border-gray-200 shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center justify-center min-w-[280px] group"
              >
                <div className="h-32 w-48 flex items-center justify-center mb-5">
                  <img
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-10"
                  />
                </div>
                <p className="text-xl font-bold text-gray-800 text-center">
                  {partner.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
