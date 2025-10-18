// src/components/EquipmentGrid.tsx
import React from "react";

export type EquipmentNeed = {
  id: string;
  title: string;
  hospital: string;     // e.g., "Colombo General Hospital"
  city?: string;        // optional
  imageUrl: string;
  description: string;
  raisedLKR: number;
  goalLKR: number;
  verified?: boolean;
};

type Props = {
  items: EquipmentNeed[];
  onDonateClick?: (item: EquipmentNeed) => void;
};

const fmtLKR = (v: number) =>
  new Intl.NumberFormat("en-LK", {
    style: "currency",
    currency: "LKR",
    maximumFractionDigits: 0,
  }).format(v);

export default function EquipmentGrid({ items, onDonateClick }: Props) {
  return (
    <section className="w-full">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => (
          <article
            key={it.id}
            className="rounded-2xl border bg-white shadow-sm overflow-hidden"
          >
            {/* Image */}
            <div className="h-48 w-full overflow-hidden bg-gray-100">
              <img
                src={it.imageUrl}
                alt={it.title}
                className="h-full w-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    "https://placehold.co/800x450?text=Equipment";
                }}
              />
            </div>

            {/* Content */}
            <div className="p-4">
              {/* Raised / Goal row */}
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-emerald-700">
                  {fmtLKR(it.raisedLKR)} raised
                </span>
                <span className="text-gray-500">
                  Goal: {fmtLKR(it.goalLKR)}
                </span>
              </div>

              {/* Title */}
              <h3 className="mt-2 font-semibold">{it.title}</h3>

              {/* Hospital */}
              <p className="mt-1 text-sm text-gray-700 flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-600" />
                <span>
                  {it.hospital}
                  {it.city ? ` • ${it.city}` : ""}
                </span>
              </p>

              {/* Description */}
              <p className="mt-2 text-sm text-gray-600 line-clamp-3">
                {it.description}
              </p>

              {/* (Removed progress bar as requested) */}

              {/* Donate Button */}
              <button
                onClick={() => onDonateClick?.(it)}
                className="mt-4 w-full rounded-md bg-emerald-700 text-white py-2.5 font-semibold hover:bg-emerald-800"
              >
                Approve
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ---------- Demo data (remove in production) ---------- */
export const demoItems: EquipmentNeed[] = [
  {
    id: "1",
    title: "CT Scanner for Emergency Diagnostics",
    hospital: "Colombo General Hospital",
    imageUrl:
      "https://images.unsplash.com/photo-1584433144859-1fc3ab64a957?q=80&w=1600&auto=format&fit=crop",
    description:
      "Help us acquire a modern CT scanner for faster emergency diagnostics at Colombo General Hospital.",
    raisedLKR: 2450000,
    goalLKR: 8500000,
    city: "Colombo",
  },
  {
    id: "2",
    title: "Digital X-Ray Machine",
    hospital: "Kandy Teaching Hospital",
    imageUrl:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1600&auto=format&fit=crop",
    description:
      "Support the procurement of a digital X-ray machine for accurate imaging at Kandy Teaching Hospital.",
    raisedLKR: 1820000,
    goalLKR: 4200000,
    city: "Kandy",
  },
  {
    id: "3",
    title: "Blood Pressure Monitors",
    hospital: "Galle District Hospital",
    imageUrl:
      "https://images.unsplash.com/photo-1582719478170-9896b1b5c6ae?q=80&w=1600&auto=format&fit=crop",
    description:
      "Provide automated BP monitors for the cardiology ward at Galle District Hospital.",
    raisedLKR: 125000,
    goalLKR: 350000,
    city: "Galle",
  },
  {
    id: "4",
    title: "Glucometers for Diabetes Care",
    hospital: "Jaffna Teaching Hospital",
    imageUrl:
      "https://images.unsplash.com/photo-1582719478179-1f3c8f2d1d7a?q=80&w=1600&auto=format&fit=crop",
    description:
      "Help diabetic patients with accurate monitoring devices at Jaffna Teaching Hospital.",
    raisedLKR: 85000,
    goalLKR: 200000,
    city: "Jaffna",
  },
  {
    id: "5",
    title: "Digital Thermometers",
    hospital: "Anuradhapura General Hospital",
    imageUrl:
      "https://images.unsplash.com/photo-1610353096579-4d3a6761e9a1?q=80&w=1600&auto=format&fit=crop",
    description:
      "Equip pediatric wards with contactless thermometers at Anuradhapura General Hospital.",
    raisedLKR: 45000,
    goalLKR: 120000,
    city: "Anuradhapura",
  },
  {
    id: "6",
    title: "Ultrasound Scanner for Maternity Ward",
    hospital: "Batticaloa Hospital",
    imageUrl:
      "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=1600&auto=format&fit=crop",
    description:
      "Support safe pregnancies with advanced ultrasound equipment at Batticaloa Hospital.",
    raisedLKR: 3200000,
    goalLKR: 8000000,
    city: "Batticaloa",
  },
];