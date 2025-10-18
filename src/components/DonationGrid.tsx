// src/components/DonationGrid.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { equipmentData, formatCurrency, calculateProgress } from '../data/equipmentData';
import type { HospitalNeedRequest } from '../types/request';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

// Import all equipment images
import mriScannerImage from '../assets/MRI Scanner.png';
import ventilatorsImage from '../assets/Ventilators.png';
import dialysisImage from '../assets/Dialysis Machines.png';
import xrayImage from '../assets/X-ray.jpg';
import patientMonitorsImage from '../assets/Patient Monitors.png';
import surgicalLightsImage from '../assets/Surgical Lights.png';
import ultrasound1Image from '../assets/Ultrasound Scanner1.jpg';
import defibrillatorsImage from '../assets/Defibrillators.png';
import oxygenImage from '../assets/Oxygen.png';
import ecgImage from '../assets/ECG .png';
import operatingTablesImage from '../assets/Operating Tables.png';
import ct1Image from '../assets/CT1.jpg';
import ct2Image from '../assets/CT2.jpg';

// Map equipment names to images
const equipmentImageMap: { [key: string]: string } = {
  'MRI Scanner': mriScannerImage,
  'Ventilators': ventilatorsImage,
  'Dialysis Machines': dialysisImage,
  'X-Ray Machine': xrayImage,
  'Patient Monitors': patientMonitorsImage,
  'Surgical Lights': surgicalLightsImage,
  'Ultrasound Machine': ultrasound1Image,
  'Defibrillators': defibrillatorsImage,
  'Laboratory Analyzer': ct1Image,
  'Infusion Pumps': patientMonitorsImage,
  'ECG Machine': ecgImage,
  'Oxygen Concentrators': oxygenImage,
  'Sterilization Equipment': ct2Image,
  'Operating Tables': operatingTablesImage,
  'Neonatal Incubators': patientMonitorsImage,
};

interface EquipmentItem {
  id: string;
  title: string;
  hospital: string;
  desc: string;
  img: string;
  goal: number;
  raised: number;
  isApprovedRequest?: boolean;
  urgency?: string;
  beneficiaries?: number;
}

export default function DonationGrid() {
  const navigate = useNavigate();
  const [allEquipment, setAllEquipment] = useState<EquipmentItem[]>([]);

  useEffect(() => {
    loadApprovedRequests();
  }, []);

  const loadApprovedRequests = () => {
    // Get approved hospital requests from localStorage
    const storedRequests = localStorage.getItem('hospitalRequests');
    if (storedRequests) {
      const requests: HospitalNeedRequest[] = JSON.parse(storedRequests);
      const approvedRequests = requests.filter(req => req.status === 'approved');
      
      // Map approved requests to equipment format
      const mappedRequests: EquipmentItem[] = approvedRequests.map(req => {
        // Get the correct image from the map based on equipment name
        const equipmentImage = equipmentImageMap[req.equipmentName] || ct1Image;
        
        return {
          id: req.id,
          title: req.equipmentName,
          hospital: req.hospitalName,
          desc: req.reason,
          img: equipmentImage, // Use the mapped image
          goal: req.estimatedCost,
          raised: req.approvalDetails?.currentRaised || 0, // Use current raised amount or 0
          isApprovedRequest: true,
          urgency: req.urgency,
          beneficiaries: req.expectedBeneficiaries,
        };
      });
      
      // Merge with static equipment data
      setAllEquipment([...mappedRequests, ...equipmentData]);
    } else {
      // If no approved requests, just use static data
      setAllEquipment(equipmentData);
    }
  };

  const handleDonateClick = (equipmentId: string) => {
    navigate(`/payment/${equipmentId}`);
  };

  const getUrgencyBadge = (urgency?: string) => {
    if (!urgency) return null;
    
    const styles = {
      critical: 'bg-red-100 text-red-700 border-red-300',
      high: 'bg-orange-100 text-orange-700 border-orange-300',
      medium: 'bg-yellow-100 text-yellow-700 border-yellow-300',
      low: 'bg-blue-100 text-blue-700 border-blue-300',
    };
    
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded border text-xs font-bold ${styles[urgency as keyof typeof styles]}`}>
        <AlertCircle className="w-3 h-3" />
        {urgency.toUpperCase()}
      </span>
    );
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-4xl font-bold tracking-tight text-gray-900">Support Critical Hospital Equipment</h2>
            <p className="text-lg text-gray-700 mt-4 max-w-3xl leading-relaxed">
              Every donation brings us closer to providing essential medical equipment that saves lives across Sri Lankan hospitals.
            </p>
          </div>
        </div>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {allEquipment.map((equipment) => {
            const progress = calculateProgress(equipment.raised, equipment.goal);
            
            return (
              <article 
                key={equipment.id} 
                className={`flex flex-col rounded-2xl border-2 bg-white shadow-md overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 duration-300 h-full ${
                  equipment.isApprovedRequest ? 'border-green-300 ring-2 ring-green-200' : ''
                }`}
              >
                {equipment.isApprovedRequest && (
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2 px-4 flex items-center gap-2 text-sm font-semibold">
                    <CheckCircle2 className="w-4 h-4" />
                    Ministry Approved
                  </div>
                )}
                
                <div className="h-56 w-full overflow-hidden bg-gray-100 flex-shrink-0">
                  <img 
                    className="w-full h-full object-cover" 
                    src={equipment.img} 
                    alt={equipment.title}
                    loading="lazy"
                  />
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                    <p className="text-sm text-emerald-600 font-bold">{formatCurrency(equipment.raised)} raised</p>
                    <p className="text-xs text-gray-500 font-semibold">Goal: {formatCurrency(equipment.goal)}</p>
                  </div>
                  
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="font-bold text-xl text-gray-900 leading-tight flex-1">{equipment.title}</h4>
                    {equipment.isApprovedRequest && equipment.urgency && getUrgencyBadge(equipment.urgency)}
                  </div>
                  
                  <p className="text-sm text-emerald-700 font-semibold mt-2 flex items-center gap-1">
                    <span className="inline-block w-2 h-2 bg-emerald-600 rounded-full"></span>
                    {equipment.hospital}
                  </p>
                  
                  {equipment.isApprovedRequest && equipment.beneficiaries && (
                    <p className="text-xs text-gray-600 mt-1">
                      👥 Will benefit {equipment.beneficiaries.toLocaleString()} people
                    </p>
                  )}
                  
                  <p className="text-base text-gray-600 mt-3 leading-relaxed flex-grow line-clamp-3">{equipment.desc}</p>
                  
                  {/* Progress bar */}
                  <div className="mt-4 w-full bg-gray-200 rounded-full h-2.5 flex-shrink-0">
                    <div 
                      className={`h-2.5 rounded-full transition-all duration-500 ${
                        equipment.isApprovedRequest ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'bg-emerald-600'
                      }`}
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  
                  <button 
                    onClick={() => handleDonateClick(equipment.id)}
                    className={`mt-5 w-full rounded-lg text-white py-3.5 text-base font-bold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98] flex-shrink-0 ${
                      equipment.isApprovedRequest 
                        ? 'bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800'
                        : 'bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800'
                    }`}
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
