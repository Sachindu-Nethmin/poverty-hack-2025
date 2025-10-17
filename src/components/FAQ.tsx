// src/components/FAQ.tsx
import { useState } from "react";

const items = [
  { q: "Is there a service fee?", a: "We minimize fees; payment providers may charge a small processing fee." },
  { q: "How are campaigns verified?", a: "We verify with hospital admins and require documentation before publishing." },
  { q: "Can I choose a specific hospital?", a: "Yes, filter by hospital or city on the All Needs page." },
  { q: "Is my donation tax-deductible?", a: "Depends on jurisdiction; we’ll display eligibility on each campaign." },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10">
        <div>
          <h2 className="text-4xl font-bold tracking-tight">Find Answers to Your Donation Questions</h2>
          <p className="text-gray-700 text-lg mt-4 leading-relaxed">
            We've compiled common questions to help you donate with confidence and clarity.
          </p>
        </div>
        <div className="space-y-4">
          {items.map((item, i) => (
            <div key={item.q} className="border-2 rounded-lg">
              <button
                className="w-full text-left px-6 py-4 font-semibold text-lg hover:bg-gray-50 transition-colors"
                onClick={() => setOpen(open === i ? null : i)}
              >
                {item.q}
              </button>
              {open === i && (
                <div className="px-6 pb-5 text-base text-gray-700 leading-relaxed">{item.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
