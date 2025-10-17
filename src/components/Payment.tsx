// src/pages/Payment.tsx
import { useMemo, useState } from "react";

type Category = { name: string; count: number };
type Urgent = { id: string; title: string; img: string; excerpt: string };

const CATEGORIES: Category[] = [
  { name: "Clean Water", count: 3 },
  { name: "Education", count: 6 },
  { name: "Ecology", count: 4 },
  { name: "Ending Hunger", count: 8 },
  { name: "Health Care", count: 8 },
  { name: "Local communities", count: 3 },
];

const URGENT: Urgent[] = [
  {
    id: "1",
    title: "End Hunger",
    img: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800&auto=format&fit=crop",
    excerpt:
      "Help families access nutritious food while hospitals focus on care.",
  },
  {
    id: "2",
    title: "Improve Education",
    img: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=800&auto=format&fit=crop",
    excerpt: "Support after-school programs and safe study spaces.",
  },
  {
    id: "3",
    title: "Clean Water Initiative",
    img: "https://images.unsplash.com/photo-1528821154947-1aa3d1a20f51?q=80&w=800&auto=format&fit=crop",
    excerpt: "Bring safe water to communities near rural hospitals.",
  },
];

const presetAmounts = [10, 25, 50, 100, 500];

export default function SingleCause() {
  // Demo campaign numbers
  const goal = 12000;
  const raised = 8000;
  const donations = 14;

  // Form state
  const [amount, setAmount] = useState<number>(presetAmounts[0]);
  const [custom, setCustom] = useState<string>("");
  const [method, setMethod] = useState<"card" | "paypal">("card");
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");

  const displayAmount = useMemo(() => {
    const c = Number(custom);
    return isFinite(c) && c > 0 ? Math.round(c) : amount;
  }, [amount, custom]);

  const progressPct = Math.min(100, Math.round((raised / goal) * 100));

  function onDonate() {
    // Replace with your payment flow
    alert(
      `Donating $${displayAmount} via ${method === "card" ? "Credit Card" : "PayPal"}\n` +
        `Name: ${first} ${last}\nEmail: ${email}`
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Top bar (optional) */}
      <div className="bg-black text-white">
        <div className="max-w-6xl mx-auto px-4 h-12 flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <span className="font-semibold">CHARITY</span>
          </div>
          <nav className="hidden sm:flex items-center gap-6 opacity-90">
            <a href="#" className="hover:opacity-100">
              Home
            </a>
            <a href="#" className="hover:opacity-100">
              Causes
            </a>
            <span className="text-amber-400">Single Cause</span>
            <a href="#" className="hover:opacity-100">
              About Us
            </a>
            <a href="#" className="hover:opacity-100">
              Contact Us
            </a>
          </nav>
          <button className="rounded-full bg-amber-500 hover:bg-amber-400 px-4 py-1.5 text-sm font-semibold">
            DONATE
          </button>
        </div>
      </div>

      {/* Breadcrumb + Title */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <p className="text-sm text-gray-500">
          Home <span className="mx-1">›</span> Causes
        </p>
        <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold">
          Clean Water for All
        </h1>
      </div>

      {/* Main grid */}
      <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-12 gap-8">
        {/* Left content */}
        <div className="lg:col-span-8">
          {/* Hero image */}
          <div className="rounded-2xl overflow-hidden border bg-gray-100">
            <img
              src="https://images.unsplash.com/photo-1507120410856-1f35574c3b45?q=80&w=1800&auto=format&fit=crop"
              alt="Cause"
              className="w-full h-72 sm:h-96 object-cover"
            />
          </div>

          {/* Progress bar & stats */}
          <div className="mt-4">
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <div className="mt-3 flex items-center justify-between text-sm">
              <div className="font-semibold">
                Goal: ${goal.toLocaleString()}
                <span className="ml-4 font-normal text-gray-600">
                  Raised: ${raised.toLocaleString()}
                </span>
              </div>
              <div className="text-gray-600">
                <span className="font-semibold">{donations}</span> donations
              </div>
            </div>
          </div>

          {/* Donation card */}
          <div className="mt-6 rounded-2xl border shadow-sm p-5 sm:p-6">
            <h3 className="font-semibold">Donation Amount</h3>

            {/* Presets */}
            <div className="mt-3 flex flex-wrap gap-2">
              {presetAmounts.map((v) => {
                const active =
                  custom.trim() === "" && Number(displayAmount) === v;
                return (
                  <button
                    key={v}
                    type="button"
                    onClick={() => {
                      setCustom("");
                      setAmount(v);
                    }}
                    className={[
                      "px-4 py-2 rounded-full border text-sm",
                      active
                        ? "bg-gray-900 text-white border-gray-900"
                        : "hover:bg-gray-50",
                    ].join(" ")}
                  >
                    ${v}
                  </button>
                );
              })}
              <span className="inline-flex items-center px-4 py-2 rounded-full border text-sm bg-amber-50 border-amber-300 text-amber-700">
                CUSTOM AMOUNT
              </span>
            </div>

            {/* Custom input */}
            <div className="mt-3 flex items-center gap-2">
              <span className="px-3 py-2 rounded-lg bg-gray-100 font-semibold">
                $
              </span>
              <input
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="600"
                value={custom}
                onChange={(e) => setCustom(e.target.value.replace(/[^\d]/g, ""))}
                className="w-40 px-4 py-2 rounded-xl bg-gray-100 focus:bg-white border focus:border-gray-300 outline-none"
              />
            </div>

            {/* Payment method */}
            <h3 className="mt-6 font-semibold">Select Payment Method</h3>
            <div className="mt-3 flex items-center gap-8 text-sm">
              <label className="inline-flex items-center gap-2">
                <input
                  type="radio"
                  checked={method === "card"}
                  onChange={() => setMethod("card")}
                  className="accent-amber-500"
                />
                Credit Card
              </label>
              <label className="inline-flex items-center gap-2">
                <input
                  type="radio"
                  checked={method === "paypal"}
                  onChange={() => setMethod("paypal")}
                  className="accent-amber-500"
                />
                Pay Pal
              </label>
            </div>

            {/* Card input (placeholder) */}
            {method === "card" && (
              <div className="mt-3">
                <label className="text-sm text-gray-700">Credit Card Number</label>
                <div className="mt-1 flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100">
                  <span className="i-credit-card" />
                  <input
                    placeholder="•••• •••• •••• ••••"
                    className="bg-transparent outline-none w-full"
                  />
                </div>
              </div>
            )}

            {/* Personal info */}
            <h3 className="mt-6 font-semibold">Personal Information</h3>
            <div className="mt-3 grid sm:grid-cols-2 gap-3">
              <div>
                <label className="text-sm text-gray-700">First Name</label>
                <input
                  value={first}
                  onChange={(e) => setFirst(e.target.value)}
                  placeholder="First Name"
                  className="mt-1 w-full px-3 py-2 rounded-lg bg-gray-100 focus:bg-white border focus:border-gray-300 outline-none"
                />
              </div>
              <div>
                <label className="text-sm text-gray-700">Last Name</label>
                <input
                  value={last}
                  onChange={(e) => setLast(e.target.value)}
                  placeholder="Last Name"
                  className="mt-1 w-full px-3 py-2 rounded-lg bg-gray-100 focus:bg-white border focus:border-gray-300 outline-none"
                />
              </div>
            </div>
            <div className="mt-3">
              <label className="text-sm text-gray-700">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="mt-1 w-full px-3 py-2 rounded-lg bg-gray-100 focus:bg-white border focus:border-gray-300 outline-none"
              />
            </div>

            {/* Total + CTA */}
            <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="text-sm">
                <span className="text-gray-600">Donation Total:</span>{" "}
                <span className="font-semibold text-amber-600">
                  ${displayAmount.toLocaleString()}
                </span>
              </div>
              <button
                onClick={onDonate}
                className="w-full sm:w-auto rounded-md bg-amber-500 hover:bg-amber-400 px-6 py-3 font-semibold text-white"
              >
                DONATE NOW
              </button>
            </div>
          </div>

          {/* Long-form content */}
          <article className="prose max-w-none mt-10 prose-headings:font-bold">
            <h2>Lectus augue libero etiam</h2>
            <p>
              Arcu ultricies malesuada lectus nulla est nunc integer pellentesque
              magna. Egestas malesuada faucibus arcu nunc elit eu quis interdum.
            </p>

            <h2>Vivamus a dignissim nulla</h2>
            <p>
              Vitae pellentesque viverra malesuada viverra eget aliquam. Diam mi
              dolor adipiscing pellentesque nec at.
            </p>

            <h2>Pharetra malesuada velit</h2>
            <p>
              Pulvinar aliquam sed egestas tempus aliquet sollicitudin. Lectus et
              rhoncus venenatis interdum lectus nam.
            </p>
            <ul>
              <li>Nunc tortor at ornare et placerat.</li>
              <li>Pulvinar aliquam sed egestas tempus aliquet sollicitudin.</li>
              <li>Accumsan quis vel habitasse arcu nisl sed.</li>
              <li>Arcu ultricies malesuada lectus nulla est nunc integer.</li>
            </ul>

            <img
              src="https://images.unsplash.com/photo-1592906209473-2995c0c8a3c1?q=80&w=1600&auto=format&fit=crop"
              alt="Project"
              className="rounded-2xl border my-4"
            />

            <h2>Libero etiam</h2>
            <p>
              Condimentum posuere velit cras velit tortor ridiculus sit. Lectus
              augue libero etiam sed nisl.
            </p>
          </article>
        </div>

        {/* Right sidebar */}
        <aside className="lg:col-span-4">
          {/* Search */}
          <div className="rounded-xl border p-4">
            <input
              placeholder="Search..."
              className="w-full px-3 py-2 rounded-lg bg-gray-100 focus:bg-white border focus:border-gray-300 outline-none"
            />
          </div>

          {/* Categories */}
          <div className="mt-5 rounded-xl border p-4">
            <h4 className="font-semibold">Categories</h4>
            <ul className="mt-3 space-y-2 text-sm">
              {CATEGORIES.map((c) => (
                <li key={c.name} className="flex items-center justify-between">
                  <a className="hover:text-gray-900 text-gray-700" href="#">
                    {c.name}
                  </a>
                  <span className="text-gray-500">({c.count})</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="mt-5 rounded-xl border p-4">
            <h4 className="font-semibold">Subscribe to our newsletter</h4>
            <input
              type="email"
              placeholder="Enter your email address"
              className="mt-3 w-full px-3 py-2 rounded-lg bg-gray-100 focus:bg-white border focus:border-gray-300 outline-none"
            />
            <button className="mt-3 w-full rounded-md bg-amber-500 hover:bg-amber-400 px-4 py-2 font-semibold text-white">
              SUBSCRIBE
            </button>
          </div>

          {/* Urgent causes */}
          <div className="mt-5 rounded-xl border p-4">
            <h4 className="font-semibold">Urgent Causes</h4>
            <div className="mt-3 space-y-3">
              {URGENT.map((u) => (
                <article
                  key={u.id}
                  className="flex gap-3 rounded-lg border p-2 hover:shadow-sm transition"
                >
                  <img
                    src={u.img}
                    alt={u.title}
                    className="w-20 h-20 rounded-md object-cover"
                  />
                  <div className="flex-1">
                    <h5 className="font-semibold text-sm">{u.title}</h5>
                    <p className="text-xs text-gray-600 line-clamp-3">
                      {u.excerpt}
                    </p>
                    <a className="text-xs text-amber-600 font-semibold" href="#">
                      VIEW DETAILS
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* Footer (compact) */}
      <footer className="mt-16 bg-black text-gray-300">
        <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-4 gap-8">
          <div>
            <div className="font-semibold text-white">CHARITY</div>
            <p className="mt-2 text-sm opacity-80">
              Tristique luctus porta amet lectus at ultricies nec lorem.
            </p>
            <p className="mt-2 text-sm">Phone: (301) 386-7883</p>
            <p className="text-sm">Address: 8911 Tanglewood Ave, MD</p>
          </div>
          <div>
            <h5 className="font-semibold text-white">About Us</h5>
            <ul className="mt-2 space-y-1 text-sm">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Causes</a></li>
              <li><a href="#">Volunteers</a></li>
              <li><a href="#">Partners</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-white">Useful Links</h5>
            <ul className="mt-2 space-y-1 text-sm">
              <li><a href="#">F.A.Q</a></li>
              <li><a href="#">News</a></li>
              <li><a href="#">Reports</a></li>
              <li><a href="#">Terms of Use</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-white">Causes</h5>
            <div className="mt-2 grid grid-cols-4 gap-2">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="w-full aspect-square rounded-md bg-gray-700" />
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="max-w-6xl mx-auto px-4 py-4 text-xs text-gray-400">
            © Copyright Charity 2024. Design by Figma.guru
          </div>
        </div>
      </footer>
    </div>
  );
}
