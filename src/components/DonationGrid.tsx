// src/components/DonationGrid.tsx
import { useNavigate } from 'react-router-dom';
import { equipmentData, formatCurrency, calculateProgress } from '../data/equipmentData';

export default function DonationGrid() {
  const navigate = useNavigate();

  const handleDonateClick = (equipmentId: string) => {
    navigate(`/payment/${equipmentId}`);
  };

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-10 tracking-tight">Support Critical Hospital Equipment</h2>
        <p className="text-lg text-gray-700 mb-12 max-w-3xl leading-relaxed">
          Every donation brings us closer to providing essential medical equipment that saves lives across Sri Lankan hospitals.
        </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {equipmentData.map((equipment) => {
            const progress = calculateProgress(equipment.raised, equipment.goal);
            
            return (
              <article key={equipment.id} className="flex flex-col rounded-2xl border-2 bg-white shadow-md overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 duration-300 h-full">
                <div className="h-56 w-full overflow-hidden bg-gray-100 flex-shrink-0">
                  <img 
                    className="w-full h-full object-cover" 
                    src={equipment.img} 
                    alt={equipment.title}
                    loading="lazy"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm text-emerald-600 font-bold">{formatCurrency(equipment.raised)} raised</p>
                    <p className="text-xs text-gray-500 font-semibold">Goal: {formatCurrency(equipment.goal)}</p>
                  </div>
                  <h4 className="font-bold text-xl mt-2 text-gray-900 leading-tight">{equipment.title}</h4>
                  <p className="text-sm text-emerald-700 font-semibold mt-2 flex items-center gap-1">
                    <span className="inline-block w-2 h-2 bg-emerald-600 rounded-full"></span>
                    {equipment.hospital}
                  </p>
                  <p className="text-base text-gray-600 mt-3 leading-relaxed flex-grow">{equipment.desc}</p>
                  
                  {/* Progress bar */}
                  <div className="mt-4 w-full bg-gray-200 rounded-full h-2.5 flex-shrink-0">
                    <div 
                      className="bg-emerald-600 h-2.5 rounded-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  
                  <button 
                    onClick={() => handleDonateClick(equipment.id)}
                    className="mt-5 w-full rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-3.5 text-base font-bold hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98] flex-shrink-0"
                  >
                    Donate Now
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
