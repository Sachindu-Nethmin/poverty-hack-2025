// src/components/DonationGrid.tsx
type Card = {
  id: string;
  title: string;
  img: string;
  raisedText: string;
  desc: string;
};

const cards: Card[] = Array.from({ length: 6 }).map((_, i) => ({
  id: String(i),
  title: "Share Food With Others in Need",
  img: "https://images.unsplash.com/photo-1545259741-2ea3ebf61fa5?q=80&w=1400&auto=format&fit=crop",
  raisedText: "$820 raised",
  desc: "Support families near government hospitals while patients receive care.",
}));

export default function DonationGrid() {
  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-2xl font-bold mb-6">Let’s Give Help To Those In Need</h3>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c) => (
            <article key={c.id} className="rounded-2xl border bg-white shadow-sm overflow-hidden">
              <div className="h-56 w-full overflow-hidden">
                <img className="w-full h-full object-cover" src={c.img} alt={c.title} />
              </div>
              <div className="p-5">
                <p className="text-xs text-gray-500 font-medium">{c.raisedText}</p>
                <h4 className="font-semibold">{c.title}</h4>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{c.desc}</p>
                <button className="mt-4 w-full rounded-md bg-amber-500 text-white py-2.5 text-sm font-medium hover:bg-amber-600">
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
