// src/components/Stats.tsx
export default function Stats() {
  const items = [
    { label: "Active Campaigns", value: "145+" },
    { label: "Donors", value: "1200+" },
    { label: "Hospitals Supported", value: "54+" },
  ];
  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {items.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border bg-white p-6 text-center shadow-sm"
            >
              <div className="text-2xl font-extrabold">{s.value}</div>
              <div className="text-sm text-gray-600">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
