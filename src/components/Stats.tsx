import { stats } from "../data/profile";

export default function Stats() {
  return (
    <section className="relative border-y border-white/[0.07] bg-white/[0.018] px-6 py-8 sm:py-10">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-8 gap-y-7 lg:grid-cols-4 lg:gap-10">
        {stats.map((item, index) => (
          <div
            key={item.label}
            className="relative min-w-0"
          >
            <p className="mb-2 font-mono text-[10px] tracking-[0.18em] text-slate-600">
              0{index + 1}
            </p>
            <p className="font-display text-xl font-semibold tracking-tight text-slate-100 sm:text-2xl">
              {item.label}
            </p>
            <p className="mt-2 max-w-[18rem] text-xs leading-5 text-slate-500 sm:text-sm">
              {item.sub}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}