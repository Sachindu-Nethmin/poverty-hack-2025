// src/components/Partners.tsx
export default function Partners() {
  const logos = [
    "UNICEF",
    "DrDone",
    "CarePlus",
    "MedRelay",
    "AidNetwork",
    "SriCare",
  ];
  return (
    <section className="py-6 border-y bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-6 opacity-70 text-sm">
          {logos.map((name) => (
            <div
              key={name}
              className="px-4 py-2 rounded-full border bg-white shadow-sm"
              title={name}
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
