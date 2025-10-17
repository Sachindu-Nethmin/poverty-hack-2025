// src/components/Stats.tsx
import { useEffect, useRef, useState } from "react";

interface StatItem {
  label: string;
  value: number;
  suffix: string;
}

export default function Stats() {
  const items: StatItem[] = [
    { label: "Active Campaigns", value: 145, suffix: "+" },
    { label: "Donors", value: 1200, suffix: "+" },
    { label: "Hospitals Supported", value: 54, suffix: "+" },
  ];

  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section ref={sectionRef} className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/80 via-blue-50/60 to-amber-50/80"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-wrap justify-center gap-8 lg:gap-12">
          {items.map((s, index) => (
            <StatCard
              key={s.label}
              item={s}
              delay={index * 150}
              animate={hasAnimated}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCard({ item, delay, animate }: { item: StatItem; delay: number; animate: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!animate) return;

    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = item.value / steps;
    const stepDuration = duration / steps;

    let current = 0;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        current += increment;
        if (current >= item.value) {
          setCount(item.value);
          clearInterval(interval);
        } else {
          setCount(Math.floor(current));
        }
      }, stepDuration);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [animate, item.value, delay]);

  return (
    <div
      className={`flex-1 min-w-[280px] max-w-[350px] rounded-2xl border border-white/40 backdrop-blur-lg p-10 text-center shadow-xl hover:shadow-2xl hover:bg-white/40 hover:border-white/60 transition-all duration-700 ${
        animate ? "opacity-100 rotate-0" : "opacity-0 rotate-y-90"
      }`}
      style={{
        transform: animate ? "rotateY(0deg)" : "rotateY(90deg)",
        transformStyle: "preserve-3d",
        transitionDelay: `${delay}ms`,
        background: "0 8px 32px 0 rgba(25, 59, 36, 0.15)",
        boxShadow: "0 8px 32px 0 rgba(19, 34, 23, 0.42)",
      }}
    >
      <div className="text-6xl font-bold text-emerald-600 mb-3 tracking-tight drop-shadow-sm">
        {count}
        {item.suffix}
      </div>
      <div className="text-lg font-semibold text-gray-800 tracking-wide">{item.label}</div>
    </div>
  );
}
