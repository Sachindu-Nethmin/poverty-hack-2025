// src/components/BlogList.tsx
const posts = Array.from({ length: 4 }).map((_, i) => ({
  id: i,
  title: "10 Creative Ways to Raise Money for Your Favorite Charity",
  img: "https://images.unsplash.com/photo-1526253038957-bce54e05968f?q=80&w=1400&auto=format&fit=crop",
  reading: "Read Post →",
}));

export default function BlogList() {
  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {posts.map((p) => (
            <article key={p.id} className="rounded-2xl border bg-white shadow-sm overflow-hidden">
              <img className="h-40 w-full object-cover" src={p.img} alt={p.title} />
              <div className="p-4">
                <h4 className="font-semibold text-sm">{p.title}</h4>
                <a className="text-emerald-700 text-sm font-medium inline-block mt-2 hover:underline" href="#">
                  {p.reading}
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
