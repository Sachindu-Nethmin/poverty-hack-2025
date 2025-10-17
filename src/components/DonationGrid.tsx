// src/components/DonationGrid.tsx
import ct1Image from '../assets/CT1.jpg';
import ct2Image from '../assets/CT2.jpg';
import bpImage from '../assets/BP.jpg';
import glucometerImage from '../assets/Glucometer.jpg';
import thermoImage from '../assets/thermo.jpg';
import ultrasound1Image from '../assets/Ultrasound Scanner1.jpg';

type Card = {
  id: string;
  title: string;
  img: string;
  raisedText: string;
  goalAmount: string;
  desc: string;
  hospital: string;
};

const cards: Card[] = [
  {
    id: "1",
    title: "CT Scanner for Emergency Diagnostics",
    img: ct1Image,
    raisedText: "LKR 2,450,000 raised",
    goalAmount: "Goal: LKR 8,500,000",
    desc: "Help us acquire a modern CT scanner for faster emergency diagnostics at Colombo General Hospital.",
    hospital: "Colombo General Hospital",
  },
  {
    id: "2",
    title: "Digital X-Ray Machine",
    img: ct2Image,
    raisedText: "LKR 1,820,000 raised",
    goalAmount: "Goal: LKR 4,200,000",
    desc: "Support the procurement of a digital X-ray machine for accurate imaging at Kandy Teaching Hospital.",
    hospital: "Kandy Teaching Hospital",
  },
  {
    id: "3",
    title: "Blood Pressure Monitors",
    img: bpImage,
    raisedText: "LKR 125,000 raised",
    goalAmount: "Goal: LKR 350,000",
    desc: "Provide automated BP monitors for the cardiology ward at Galle District Hospital.",
    hospital: "Galle District Hospital",
  },
  {
    id: "4",
    title: "Glucometers for Diabetes Care",
    img: glucometerImage,
    raisedText: "LKR 85,000 raised",
    goalAmount: "Goal: LKR 200,000",
    desc: "Help diabetic patients with accurate monitoring devices at Jaffna Teaching Hospital.",
    hospital: "Jaffna Teaching Hospital",
  },
  {
    id: "5",
    title: "Digital Thermometers",
    img: thermoImage,
    raisedText: "LKR 45,000 raised",
    goalAmount: "Goal: LKR 120,000",
    desc: "Equip pediatric wards with contactless thermometers at Anuradhapura General Hospital.",
    hospital: "Anuradhapura General Hospital",
  },
  {
    id: "6",
    title: "Ultrasound Scanner for Maternity Ward",
    img: ultrasound1Image,
    raisedText: "LKR 3,200,000 raised",
    goalAmount: "Goal: LKR 6,800,000",
    desc: "Support safe pregnancies with advanced ultrasound equipment at Batticaloa Hospital.",
    hospital: "Batticaloa Hospital",
  },
];

export default function DonationGrid() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-10 tracking-tight">Support Critical Hospital Equipment</h2>
        <p className="text-lg text-gray-700 mb-12 max-w-3xl leading-relaxed">
          Every donation brings us closer to providing essential medical equipment that saves lives across Sri Lankan hospitals.
        </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c) => (
            <article key={c.id} className="rounded-2xl border-2 bg-white shadow-md overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 duration-300">
              <div className="h-56 w-full overflow-hidden bg-gray-100">
                <img className="w-full h-full object-cover" src={c.img} alt={c.title} />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm text-emerald-600 font-bold">{c.raisedText}</p>
                  <p className="text-xs text-gray-500 font-semibold">{c.goalAmount}</p>
                </div>
                <h4 className="font-bold text-xl mt-2 text-gray-900 leading-tight">{c.title}</h4>
                <p className="text-sm text-emerald-700 font-semibold mt-2 flex items-center gap-1">
                  <span className="inline-block w-2 h-2 bg-emerald-600 rounded-full"></span>
                  {c.hospital}
                </p>
                <p className="text-base text-gray-600 mt-3 leading-relaxed">{c.desc}</p>
                
                {/* Progress bar */}
                <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-emerald-600 h-2 rounded-full transition-all duration-500"
                    style={{ 
                      width: `${Math.min((parseInt(c.raisedText.replace(/[^\d]/g, '')) / parseInt(c.goalAmount.replace(/[^\d]/g, ''))) * 100, 100)}%` 
                    }}
                  ></div>
                </div>
                
                <button className="mt-5 w-full rounded-md bg-emerald-600 text-white py-3 text-base font-semibold hover:bg-emerald-700 transition-colors shadow-sm">
                  Donate Now
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
