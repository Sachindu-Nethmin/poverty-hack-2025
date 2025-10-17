// src/data/equipmentData.ts
import ct1Image from '../assets/CT1.jpg';
import XrayImage from '../assets/X-ray.jpg';
import bpImage from '../assets/BP.jpg';
import glucometerImage from '../assets/Glucometer.jpg';
import thermoImage from '../assets/thermo.jpg';
import ultrasound1Image from '../assets/Ultrasound Scanner1.jpg';

export type Equipment = {
  id: string;
  title: string;
  img: string;
  raised: number;
  goal: number;
  desc: string;
  hospital: string;
  category: string;
  urgency: 'critical' | 'high' | 'medium';
  beneficiaries: number;
  detailedDesc: string;
};

export const equipmentData: Equipment[] = [
  {
    id: "ct-scanner",
    title: "CT Scanner for Emergency Diagnostics",
    img: ct1Image,
    raised: 2450000,
    goal: 8500000,
    desc: "Help us acquire a modern CT scanner for faster emergency diagnostics at Colombo General Hospital.",
    hospital: "Colombo General Hospital",
    category: "Diagnostic Equipment",
    urgency: "critical",
    beneficiaries: 5000,
    detailedDesc: "This state-of-the-art CT scanner will revolutionize emergency diagnostics at Colombo General Hospital. It will enable doctors to quickly identify internal injuries, brain hemorrhages, and other critical conditions, potentially saving hundreds of lives each month. The equipment includes advanced 3D imaging capabilities and will serve over 5,000 patients annually in the emergency department.",
  },
  {
    id: "xray-machine",
    title: "Digital X-Ray Machine",
    img: XrayImage,
    raised: 1820000,
    goal: 4200000,
    desc: "Support the procurement of a digital X-ray machine for accurate imaging at Kandy Teaching Hospital.",
    hospital: "Kandy Teaching Hospital",
    category: "Imaging Equipment",
    urgency: "high",
    beneficiaries: 3500,
    detailedDesc: "A modern digital X-ray system will replace the outdated analog equipment at Kandy Teaching Hospital. This upgrade will provide clearer images for accurate diagnosis, reduce radiation exposure for patients, and enable instant image sharing with specialists. The system will benefit over 3,500 patients annually across orthopedics, respiratory, and general medicine departments.",
  },
  {
    id: "bp-monitors",
    title: "Blood Pressure Monitors",
    img: bpImage,
    raised: 125000,
    goal: 350000,
    desc: "Provide automated BP monitors for the cardiology ward at Galle District Hospital.",
    hospital: "Galle District Hospital",
    category: "Patient Monitoring",
    urgency: "medium",
    beneficiaries: 1200,
    detailedDesc: "Automated blood pressure monitors are essential for continuous patient monitoring in the cardiology ward. These devices will enable nurses to track vital signs more efficiently and alert medical staff to any concerning changes immediately. The 20 monitors will serve approximately 1,200 cardiac patients annually, ensuring better care and faster response times.",
  },
  {
    id: "glucometers",
    title: "Glucometers for Diabetes Care",
    img: glucometerImage,
    raised: 85000,
    goal: 200000,
    desc: "Help diabetic patients with accurate monitoring devices at Jaffna Teaching Hospital.",
    hospital: "Jaffna Teaching Hospital",
    category: "Diagnostic Tools",
    urgency: "high",
    beneficiaries: 2000,
    detailedDesc: "Reliable glucometers are critical for managing diabetes patients. These portable devices will be used in the diabetes clinic and endocrinology ward to provide instant blood sugar readings, helping doctors adjust treatment plans quickly. With diabetes rates rising in Sri Lanka, these 50 devices will serve over 2,000 patients annually, improving their quality of life and preventing complications.",
  },
  {
    id: "thermometers",
    title: "Digital Thermometers",
    img: thermoImage,
    raised: 45000,
    goal: 120000,
    desc: "Equip pediatric wards with contactless thermometers at Anuradhapura General Hospital.",
    hospital: "Anuradhapura General Hospital",
    category: "Basic Medical Equipment",
    urgency: "medium",
    beneficiaries: 1800,
    detailedDesc: "Contactless infrared thermometers are especially important in pediatric care, providing quick and comfortable temperature readings without disturbing sick children. These 30 devices will be distributed across the pediatric ward, neonatal unit, and outpatient clinic, serving approximately 1,800 children annually and helping detect fevers early for timely treatment.",
  },
  {
    id: "ultrasound-scanner",
    title: "Ultrasound Scanner for Maternity Ward",
    img: ultrasound1Image,
    raised: 3200000,
    goal: 6800000,
    desc: "Support safe pregnancies with advanced ultrasound equipment at Batticaloa Hospital.",
    hospital: "Batticaloa Hospital",
    category: "Maternal Health Equipment",
    urgency: "critical",
    beneficiaries: 4000,
    detailedDesc: "An advanced ultrasound scanner is vital for maternal and fetal health monitoring. This equipment will enable obstetricians to detect potential complications early, monitor fetal development, and guide safer deliveries. The 4D imaging capability will provide clearer views for better diagnosis. Serving over 4,000 expectant mothers annually, this scanner will significantly reduce maternal and infant mortality rates in the region.",
  },
];

// Helper function to get equipment by ID
export const getEquipmentById = (id: string): Equipment | undefined => {
  return equipmentData.find(eq => eq.id === id);
};

// Helper function to format currency
export const formatCurrency = (amount: number): string => {
  return `LKR ${amount.toLocaleString('en-US')}`;
};

// Helper function to calculate percentage
export const calculateProgress = (raised: number, goal: number): number => {
  return Math.min(Math.round((raised / goal) * 100), 100);
};
