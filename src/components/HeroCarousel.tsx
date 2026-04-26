import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { heroBanners } from "@/data/nykaa";

export function HeroCarousel() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % heroBanners.length), 4000);
    return () => clearInterval(t);
  }, []);

  const banner = heroBanners[idx];

  return (
    <div className="px-4 pt-3">
      <div
        className="relative rounded-2xl overflow-hidden h-44 transition-all duration-500"
        style={{ background: banner.gradient }}
      >
        <div className="absolute inset-0 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-baseline gap-1 mb-2">
              <span className="nykaa-script text-2xl text-foreground">Nykaa</span>
              <span className="text-xs font-bold text-foreground/80 tracking-wider">K•BEAUTY</span>
            </div>
            <h2 className="text-xl font-extrabold text-foreground leading-tight max-w-[60%]">
              {banner.title}
            </h2>
            <p className="text-xs text-foreground/80 mt-1 max-w-[55%] leading-snug">{banner.subtitle}</p>
          </div>
          <button className="self-start bg-background/90 backdrop-blur rounded-full p-2 hover:bg-background transition">
            <ArrowRight className="w-4 h-4 text-primary" />
          </button>
        </div>
        <div className="absolute right-3 bottom-3 text-7xl opacity-90 select-none">{banner.emoji}</div>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
          {heroBanners.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`h-1.5 rounded-full transition-all ${i === idx ? "w-5 bg-white" : "w-1.5 bg-white/60"}`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
