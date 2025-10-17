// src/components/Newsletter.tsx
export default function Newsletter() {
  return (
    <section className="py-14 bg-emerald-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8 items-center">
        <h3 className="text-3xl font-bold">Sign up for our Newsletter</h3>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="bg-white/10 backdrop-blur rounded-xl p-2 flex gap-2"
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-md bg-white text-gray-900 placeholder-gray-500 focus:outline-none"
          />
          <button className="px-5 py-3 rounded-md bg-amber-400 text-gray-900 font-semibold hover:bg-amber-300">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
