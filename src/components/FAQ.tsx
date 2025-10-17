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
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-2xl font-bold">Find Answers to Your Donation Questions</h3>
          <p className="text-gray-600 mt-2">
            We’ve compiled common questions to help you donate with confidence and clarity.
          </p>
        </div>
        <div className="space-y-3">
          {items.map((item, i) => (
            <div key={item.q} className="border rounded-md">
              <button
                className="w-full text-left px-4 py-3 font-medium hover:bg-gray-50"
                onClick={() => setOpen(open === i ? null : i)}
              >
                {item.q}
              </button>
              {open === i && (
                <div className="px-4 pb-4 text-sm text-gray-600">{item.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
