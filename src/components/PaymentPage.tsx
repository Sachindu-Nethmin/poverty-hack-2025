// src/components/PaymentPage.tsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getEquipmentById, formatCurrency, calculateProgress } from '../data/equipmentData';
import type { HospitalNeedRequest } from '../types/request';

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

const presetAmounts = [1000, 5000, 10000, 25000, 50000, 100000];

export default function PaymentPage() {
  const { equipmentId } = useParams<{ equipmentId: string }>();
  const [equipment, setEquipment] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!equipmentId) {
      setLoading(false);
      return;
    }

    // First, try to get from static equipment data
    const staticEquipment = getEquipmentById(equipmentId);
    if (staticEquipment) {
      setEquipment(staticEquipment);
      setLoading(false);
      return;
    }

    // If not found in static data, check localStorage for approved requests
    const storedRequests = localStorage.getItem('hospitalRequests');
    if (storedRequests) {
      const requests: HospitalNeedRequest[] = JSON.parse(storedRequests);
      const approvedRequest = requests.find(
        req => req.id === equipmentId && req.status === 'approved'
      );
      
      if (approvedRequest) {
        // Get the correct image from the map based on equipment name
        const equipmentImage = equipmentImageMap[approvedRequest.equipmentName] || ct1Image;
        
        // Convert HospitalNeedRequest to equipment format
        setEquipment({
          id: approvedRequest.id,
          title: approvedRequest.equipmentName,
          img: equipmentImage,
          raised: approvedRequest.approvalDetails?.currentRaised || 0,
          goal: approvedRequest.estimatedCost,
          desc: approvedRequest.reason,
          hospital: approvedRequest.hospitalName,
          category: approvedRequest.equipmentCategory,
          urgency: approvedRequest.urgency,
          beneficiaries: approvedRequest.expectedBeneficiaries,
          detailedDesc: approvedRequest.description,
        });
      }
    }
    setLoading(false);
  }, [equipmentId]);

  // Form state
  const [amount, setAmount] = useState<number>(presetAmounts[2]);
  const [custom, setCustom] = useState<string>("");
  const [method, setMethod] = useState<"card" | "bank">("card");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading equipment details...</p>
        </div>
      </div>
    );
  }

  if (!equipment) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Equipment Not Found</h2>
          <p className="text-gray-600 mb-4">The equipment you're looking for doesn't exist or has been removed.</p>
          <Link to="/" className="text-emerald-600 hover:text-emerald-700 font-semibold">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const displayAmount = custom && Number(custom) > 0 ? Number(custom) : amount;
  const progress = calculateProgress(equipment.raised, equipment.goal);

  function handleDonate() {
    if (!equipment) return;
    
    // Replace with your payment flow
    alert(
      `Thank you for donating ${formatCurrency(displayAmount)}!\n\n` +
      `Equipment: ${equipment.title}\n` +
      `Hospital: ${equipment.hospital}\n` +
      `Name: ${firstName} ${lastName}\n` +
      `Email: ${email}\n` +
      `Phone: ${phone}`
    );
    // Uncomment to navigate back to home after successful donation
    // navigate('/');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center text-sm text-gray-600">
            <Link to="/" className="hover:text-emerald-600 transition-colors">Home</Link>
            <span className="mx-2">›</span>
            <Link to="/#donations" className="hover:text-emerald-600 transition-colors">Equipment</Link>
            <span className="mx-2">›</span>
            <span className="text-gray-900 font-semibold">Donation</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Column - Equipment Details */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
              {/* Equipment Image */}
              <div className="h-96 overflow-hidden bg-gray-100">
                <img
                  src={equipment.img}
                  alt={equipment.title}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>

              {/* Equipment Info */}
              <div className="p-8">
                <div className="flex items-center gap-2 mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    equipment.urgency === 'critical' ? 'bg-red-100 text-red-700' :
                    equipment.urgency === 'high' ? 'bg-orange-100 text-orange-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {equipment.urgency.toUpperCase()} NEED
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">
                    {equipment.category}
                  </span>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-4">{equipment.title}</h1>
                
                <div className="flex items-center gap-2 text-emerald-700 font-semibold mb-6">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  {equipment.hospital}
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-bold text-emerald-600">{formatCurrency(equipment.raised)}</span>
                    <span className="text-sm text-gray-600">raised of {formatCurrency(equipment.goal)} goal</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm text-gray-600">
                    <span>{progress}% funded</span>
                    <span>{equipment.beneficiaries.toLocaleString()} beneficiaries</span>
                  </div>
                </div>

                {/* Description */}
                <div className="prose max-w-none">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">About This Campaign</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">{equipment.desc}</p>
                  <p className="text-gray-700 leading-relaxed">{equipment.detailedDesc}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Donation Form */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Make a Donation</h2>

              {/* Amount Selection */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Select Amount (LKR)
                </label>
                <div className="grid grid-cols-3 gap-3 mb-3">
                  {presetAmounts.map((amt) => {
                    const isActive = custom.trim() === "" && displayAmount === amt;
                    return (
                      <button
                        key={amt}
                        onClick={() => {
                          setAmount(amt);
                          setCustom("");
                        }}
                        className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                          isActive
                            ? 'bg-emerald-600 text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {amt >= 1000 ? `${amt/1000}K` : amt}
                      </button>
                    );
                  })}
                </div>
                <input
                  type="number"
                  placeholder="Custom amount"
                  value={custom}
                  onChange={(e) => setCustom(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none"
                />
              </div>

              {/* Payment Method */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Payment Method
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setMethod("card")}
                    className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                      method === "card"
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    💳 Card
                  </button>
                  <button
                    onClick={() => setMethod("bank")}
                    className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                      method === "bank"
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    🏦 Bank
                  </button>
                </div>
              </div>

              {/* Donor Information */}
              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="First Name *"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Last Name *"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none"
                    required
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email Address *"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none"
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone Number *"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none"
                  required
                />
                <textarea
                  placeholder="Message (Optional)"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none resize-none"
                />
              </div>

              {/* Total & Submit */}
              <div className="border-t-2 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-semibold text-gray-700">Total Donation:</span>
                  <span className="text-2xl font-bold text-emerald-600">{formatCurrency(displayAmount)}</span>
                </div>
                <button
                  onClick={handleDonate}
                  className="w-full py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-lg font-bold text-lg hover:from-emerald-700 hover:to-emerald-800 transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Donate Now
                </button>
                <p className="mt-3 text-xs text-gray-500 text-center">
                  Your donation is secure and will go directly to {equipment.hospital}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
