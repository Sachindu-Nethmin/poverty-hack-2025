// src/components/HowToStart.tsx
export default function HowToStart() {
  const steps = [
    { title: "Register Yourself", desc: "Create an account or continue as a guest." },
    { title: "Select Donate", desc: "Choose a campaign that resonates with you." },
    { title: "Share Happiness", desc: "Spread the word and amplify the impact." },
  ];
  return (
    <section id="how" className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-amber-50 border p-8 text-center">
          <h3 className="text-2xl font-bold mb-2">How To Start Help</h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            It only takes a minute to create a wave of change. Follow three simple
            steps to support a verified medical need.
          </p>
          <div className="mt-8 grid sm:grid-cols-3 gap-6">
            {steps.map((s) => (
              <div key={s.title} className="rounded-2xl bg-white border p-6 shadow-sm">
                <div className="font-semibold">{s.title}</div>
                <div className="text-sm text-gray-600 mt-1">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
