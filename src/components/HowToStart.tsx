// src/components/HowToStart.tsx
export default function HowToStart() {
  const steps = [
    { title: "Register Yourself", desc: "Create an account or continue as a guest." },
    { title: "Select Donate", desc: "Choose a campaign that resonates with you." },
    { title: "Share Happiness", desc: "Spread the word and amplify the impact." },
  ];
  return (
    <section id="how" className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-amber-50 border-2 p-12 text-center">
          <h2 className="text-4xl font-bold mb-4 tracking-tight">How To Start Help</h2>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto leading-relaxed">
            It only takes a minute to create a wave of change. Follow three simple
            steps to support a verified medical need.
          </p>
          <div className="mt-10 grid sm:grid-cols-3 gap-8">
            {steps.map((s) => (
              <div key={s.title} className="rounded-2xl bg-white border-2 p-8 shadow-md hover:shadow-lg transition-shadow">
                <div className="font-bold text-xl mb-2">{s.title}</div>
                <div className="text-base text-gray-600 leading-relaxed">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
