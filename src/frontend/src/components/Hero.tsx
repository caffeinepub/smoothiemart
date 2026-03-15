import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { AnimatedCounter } from "./AnimatedCounter";

const STICKERS = [
  {
    emoji: "🍓",
    top: "8%",
    left: "4%",
    delay: 0,
    size: "text-4xl",
    anim: "animate-float",
  },
  {
    emoji: "🥭",
    top: "15%",
    right: "5%",
    delay: 0.5,
    size: "text-5xl",
    anim: "animate-float-reverse",
  },
  {
    emoji: "🍋",
    top: "60%",
    left: "2%",
    delay: 1,
    size: "text-3xl",
    anim: "animate-float-slow",
  },
  {
    emoji: "🫐",
    top: "70%",
    right: "3%",
    delay: 0.8,
    size: "text-4xl",
    anim: "animate-wiggle",
  },
  {
    emoji: "🍌",
    top: "25%",
    left: "12%",
    delay: 0.3,
    size: "text-3xl",
    anim: "animate-float-reverse",
  },
  {
    emoji: "🍉",
    top: "45%",
    right: "10%",
    delay: 1.2,
    size: "text-5xl",
    anim: "animate-float",
  },
  {
    emoji: "🥝",
    top: "80%",
    left: "15%",
    delay: 0.6,
    size: "text-3xl",
    anim: "animate-wiggle",
  },
  {
    emoji: "🍇",
    top: "5%",
    left: "40%",
    delay: 1.5,
    size: "text-3xl",
    anim: "animate-float-slow",
  },
  {
    emoji: "🥥",
    top: "85%",
    right: "18%",
    delay: 0.4,
    size: "text-4xl",
    anim: "animate-float",
  },
  {
    emoji: "🍑",
    top: "35%",
    left: "5%",
    delay: 1.8,
    size: "text-3xl",
    anim: "animate-float-reverse",
  },
  {
    emoji: "🍊",
    top: "55%",
    right: "22%",
    delay: 0.7,
    size: "text-3xl",
    anim: "animate-float-slow",
  },
  {
    emoji: "🍍",
    top: "10%",
    right: "25%",
    delay: 2.0,
    size: "text-4xl",
    anim: "animate-wiggle",
  },
  {
    emoji: "🧃",
    top: "90%",
    left: "45%",
    delay: 1.1,
    size: "text-3xl",
    anim: "animate-float",
  },
  {
    emoji: "🍒",
    top: "30%",
    right: "30%",
    delay: 0.2,
    size: "text-3xl",
    anim: "animate-float-reverse",
  },
  {
    emoji: "✨",
    top: "50%",
    left: "30%",
    delay: 1.6,
    size: "text-2xl",
    anim: "animate-float-slow",
  },
  {
    emoji: "💖",
    top: "75%",
    right: "40%",
    delay: 0.9,
    size: "text-2xl",
    anim: "animate-wiggle",
  },
  {
    emoji: "🌺",
    top: "20%",
    left: "25%",
    delay: 2.2,
    size: "text-3xl",
    anim: "animate-float",
  },
  {
    emoji: "🌈",
    top: "65%",
    left: "50%",
    delay: 1.3,
    size: "text-2xl",
    anim: "animate-float-slow",
  },
];

const MARQUEE_ITEMS = [
  { id: "m1", text: "🍓 No Bad Vibes (fr fr)" },
  { id: "m2", text: "🥭 Only Bussin Sips" },
  { id: "m3", text: "🍋 Fresh Daily No Cap" },
  { id: "m4", text: "🫐 Packed w/ Luv bestie" },
  { id: "m5", text: "🍉 Zero Regrets Periodt" },
  { id: "m6", text: "🥤 Blend Happens lol" },
  { id: "m7", text: "✨ Pure Magic No Printer" },
  { id: "m8", text: "💖 Sip Happy Bestie" },
  { id: "m9", text: "🌈 Bad Drinks? Not on my watch bestie" },
];
const MARQUEE_DOUBLED = [
  ...MARQUEE_ITEMS.map((m) => ({ ...m, uid: `a-${m.id}` })),
  ...MARQUEE_ITEMS.map((m) => ({ ...m, uid: `b-${m.id}` })),
];

const SURPRISE_SMOOTHIES = [
  "Mango Madness",
  "Berry Bliss",
  "Tropical Sunrise",
  "Green Goddess",
  "Strawberry Dream",
  "Peach Paradise",
  "Pineapple Punch",
  "Watermelon Wave",
];

// Bubble config: Effect 5
const BUBBLES = [
  {
    size: 18,
    left: "8%",
    color: "oklch(0.90 0.08 355 / 0.45)",
    duration: "14s",
    delay: "0s",
    sway: "18px",
  },
  {
    size: 26,
    left: "20%",
    color: "oklch(0.88 0.08 285 / 0.4)",
    duration: "18s",
    delay: "2.5s",
    sway: "-22px",
  },
  {
    size: 14,
    left: "35%",
    color: "oklch(0.91 0.09 160 / 0.5)",
    duration: "12s",
    delay: "5s",
    sway: "14px",
  },
  {
    size: 22,
    left: "52%",
    color: "oklch(0.91 0.08 40 / 0.45)",
    duration: "16s",
    delay: "1s",
    sway: "-16px",
  },
  {
    size: 16,
    left: "65%",
    color: "oklch(0.94 0.09 90 / 0.5)",
    duration: "13s",
    delay: "3.5s",
    sway: "20px",
  },
  {
    size: 30,
    left: "78%",
    color: "oklch(0.88 0.08 310 / 0.4)",
    duration: "20s",
    delay: "0.5s",
    sway: "-25px",
  },
  {
    size: 12,
    left: "88%",
    color: "oklch(0.90 0.08 355 / 0.5)",
    duration: "11s",
    delay: "4s",
    sway: "12px",
  },
  {
    size: 20,
    left: "44%",
    color: "oklch(0.88 0.08 285 / 0.45)",
    duration: "15s",
    delay: "7s",
    sway: "-18px",
  },
];

// Sparkle config: Effect 1
interface Sparkle {
  id: string;
  top: string;
  left: string;
  size: number;
  color: string;
  delay: number;
}

const SPARKLE_COLORS = [
  "oklch(0.80 0.12 355)",
  "oklch(0.78 0.14 285)",
  "oklch(0.80 0.12 160)",
  "oklch(0.82 0.12 40)",
  "oklch(0.84 0.11 90)",
  "oklch(0.78 0.14 310)",
];

function randomSparkle(): Sparkle {
  return {
    id: `sp-${Date.now()}-${Math.random()}`,
    top: `${10 + Math.random() * 75}%`,
    left: `${5 + Math.random() * 88}%`,
    size: 12 + Math.random() * 8,
    color: SPARKLE_COLORS[Math.floor(Math.random() * SPARKLE_COLORS.length)],
    delay: Math.random() * 0.4,
  };
}

function SparkleLayer() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    // spawn a small batch immediately
    setSparkles([randomSparkle(), randomSparkle(), randomSparkle()]);

    timerRef.current = setInterval(() => {
      setSparkles((prev) => [
        ...prev.slice(-8), // cap to last 8
        randomSparkle(),
        randomSparkle(),
      ]);
    }, 2200);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {sparkles.map((s) => (
        <span
          key={s.id}
          className="absolute select-none animate-sparkle-pop"
          style={{
            top: s.top,
            left: s.left,
            fontSize: s.size,
            color: s.color,
            animationDelay: `${s.delay}s`,
            filter: `drop-shadow(0 0 4px ${s.color})`,
          }}
        >
          ✨
        </span>
      ))}
    </div>
  );
}

function handleSurpriseMe() {
  const menuEl = document.getElementById("menu");
  if (menuEl) menuEl.scrollIntoView({ behavior: "smooth" });
  setTimeout(() => {
    const pick =
      SURPRISE_SMOOTHIES[Math.floor(Math.random() * SURPRISE_SMOOTHIES.length)];
    toast.success(`✨ Fate chose: ${pick}! go get it bestie 🍹`);
  }, 300);
}

export function Hero() {
  return (
    <section
      data-ocid="hero.section"
      className="relative min-h-[85vh] flex items-center justify-center overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.90 0.08 355 / 0.6) 0%, oklch(0.88 0.08 285 / 0.5) 40%, oklch(0.91 0.09 160 / 0.5) 100%)",
        animation: "gradientShift 8s ease infinite alternate",
      }}
    >
      {/* Effect 1: Sparkle burst layer */}
      <SparkleLayer />

      {/* Effect 5: Floating bubbles */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        {BUBBLES.map((b) => (
          <div
            key={b.left + b.duration}
            className="absolute bottom-0 rounded-full animate-bubble-rise"
            style={
              {
                width: b.size,
                height: b.size,
                left: b.left,
                background: b.color,
                border: `1.5px solid ${b.color.replace("/ 0.", "/ 0.7")}`,
                "--bubble-duration": b.duration,
                "--bubble-delay": b.delay,
                "--bubble-sway": b.sway,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      {/* Decorative blobs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute w-72 h-72 rounded-full opacity-30"
          style={{
            top: "-10%",
            left: "-8%",
            background: "oklch(0.90 0.10 355)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute w-96 h-96 rounded-full opacity-20"
          style={{
            bottom: "-15%",
            right: "-10%",
            background: "oklch(0.88 0.10 285)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute w-80 h-80 rounded-full opacity-25"
          style={{
            top: "20%",
            right: "15%",
            background: "oklch(0.91 0.10 160)",
            filter: "blur(70px)",
          }}
        />
      </div>

      {/* SVG Doodles */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <svg
          aria-hidden="true"
          role="presentation"
          className="absolute"
          style={{ top: "12%", left: "18%", opacity: 0.55 }}
          width="80"
          height="30"
          viewBox="0 0 80 30"
          fill="none"
        >
          <path
            d="M2 20 Q12 5 22 20 Q32 35 42 20 Q52 5 62 20 Q72 35 78 15"
            stroke="oklch(0.75 0.14 355)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <svg
          aria-hidden="true"
          role="presentation"
          className="absolute animate-wiggle"
          style={{
            top: "8%",
            right: "32%",
            opacity: 0.6,
            animationDelay: "0.4s",
          }}
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
        >
          <path
            d="M14 3 L15.8 10.2 L23 14 L15.8 17.8 L14 25 L12.2 17.8 L5 14 L12.2 10.2 Z"
            stroke="oklch(0.70 0.15 285)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <svg
          aria-hidden="true"
          role="presentation"
          className="absolute animate-float-slow"
          style={{ top: "42%", left: "8%", opacity: 0.5, animationDelay: "1s" }}
          width="32"
          height="28"
          viewBox="0 0 32 28"
          fill="none"
        >
          <path
            d="M16 25 C16 25 3 17 3 9 C3 5 6.5 2 10.5 2 C13 2 15.2 3.5 16 5.5 C16.8 3.5 19 2 21.5 2 C25.5 2 29 5 29 9 C29 17 16 25 16 25Z"
            stroke="oklch(0.72 0.17 355)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <svg
          aria-hidden="true"
          role="presentation"
          className="absolute"
          style={{ top: "18%", right: "18%", opacity: 0.5 }}
          width="50"
          height="50"
          viewBox="0 0 50 50"
          fill="none"
        >
          <circle
            cx="10"
            cy="10"
            r="3"
            stroke="oklch(0.80 0.12 160)"
            strokeWidth="2"
          />
          <circle
            cx="30"
            cy="8"
            r="2"
            stroke="oklch(0.75 0.14 355)"
            strokeWidth="2"
          />
          <circle
            cx="45"
            cy="25"
            r="3"
            stroke="oklch(0.72 0.13 285)"
            strokeWidth="2"
          />
          <circle
            cx="20"
            cy="38"
            r="2"
            stroke="oklch(0.80 0.12 160)"
            strokeWidth="2"
          />
        </svg>
        <svg
          aria-hidden="true"
          role="presentation"
          className="absolute"
          style={{ bottom: "18%", right: "8%", opacity: 0.45 }}
          width="90"
          height="25"
          viewBox="0 0 90 25"
          fill="none"
        >
          <path
            d="M2 12 Q12 2 22 12 Q32 22 42 12 Q52 2 62 12 Q72 22 82 12 Q87 7 88 10"
            stroke="oklch(0.78 0.12 160)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <svg
          aria-hidden="true"
          role="presentation"
          className="absolute animate-float"
          style={{
            bottom: "25%",
            left: "22%",
            opacity: 0.45,
            animationDelay: "1.5s",
          }}
          width="44"
          height="44"
          viewBox="0 0 44 44"
          fill="none"
        >
          <circle
            cx="22"
            cy="22"
            r="14"
            stroke="oklch(0.75 0.14 285)"
            strokeWidth="2"
            strokeDasharray="4 4"
          />
        </svg>
        <svg
          aria-hidden="true"
          role="presentation"
          className="absolute animate-wiggle"
          style={{
            bottom: "30%",
            left: "6%",
            opacity: 0.5,
            animationDelay: "0.8s",
          }}
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
        >
          <path
            d="M11 2 L12.5 8.5 L19 11 L12.5 13.5 L11 20 L9.5 13.5 L3 11 L9.5 8.5 Z"
            stroke="oklch(0.75 0.14 355)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <svg
          aria-hidden="true"
          role="presentation"
          className="absolute"
          style={{ top: "55%", right: "4%", opacity: 0.4 }}
          width="25"
          height="70"
          viewBox="0 0 25 70"
          fill="none"
        >
          <path
            d="M12 2 Q22 12 12 22 Q2 32 12 42 Q22 52 12 62 Q7 67 8 68"
            stroke="oklch(0.72 0.13 285)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Effect 6: Floating sticker emojis with jelly hover */}
      {STICKERS.map((s) => (
        <motion.div
          key={s.emoji + s.top}
          className={`absolute select-none ${s.size} ${s.anim}`}
          style={{
            top: s.top,
            left: (s as { left?: string }).left,
            right: (s as { right?: string }).right,
            animationDelay: `${s.delay}s`,
            filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.12))",
            pointerEvents: "auto",
          }}
          whileHover={{ scale: 1.35 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          {s.emoji}
        </motion.div>
      ))}

      {/* Hero content */}
      <div className="relative z-10 container mx-auto px-6 flex flex-col md:flex-row items-center gap-10 py-20">
        <motion.div
          className="flex-1 text-center md:text-left"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 mb-6 shadow-sm">
            <span className="text-lg">🥤</span>
            <span className="text-sm font-semibold text-foreground/70 tracking-wide uppercase">
              Currently Blending rn 🥤
            </span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-foreground leading-tight mb-4">
            Sip Into{" "}
            <span className="italic" style={{ color: "oklch(0.62 0.18 355)" }}>
              Something
            </span>
            <br />
            {/* Effect 2: Rainbow shimmer text */}
            <span className="text-rainbow-shimmer-fast">Lowkey Delicious</span>
          </h1>

          <div className="space-y-1.5 mb-6 max-w-lg">
            <p className="font-body text-xl text-foreground/80 font-semibold">
              life is short. drink something bussin. 🍓
            </p>
            <p className="font-body text-lg text-foreground/70">
              your daily fruity fix, no printer ✨
            </p>
            <p className="font-body text-base text-foreground/60 italic">
              boring drinks are so mid tbh 💅
            </p>
          </div>

          {/* Marquee */}
          <div
            className="relative overflow-hidden rounded-full py-2 px-0 mb-8 max-w-lg mx-auto md:mx-0"
            style={{
              background:
                "linear-gradient(90deg, oklch(0.90 0.09 355 / 0.55), oklch(0.88 0.09 285 / 0.5), oklch(0.91 0.10 160 / 0.5))",
              border: "1.5px solid oklch(0.92 0.08 355 / 0.6)",
            }}
          >
            <div className="flex whitespace-nowrap animate-marquee">
              {MARQUEE_DOUBLED.map((item) => (
                <span
                  key={item.uid}
                  className="inline-block text-sm font-semibold text-foreground/75 px-5"
                >
                  {item.text}
                  <span className="mx-3 text-foreground/30">•</span>
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            <a
              data-ocid="hero.primary_button"
              href="#menu"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white shadow-pastel transition-transform hover:scale-105 active:scale-95"
              style={{ background: "oklch(0.65 0.18 355)" }}
            >
              slay the menu 🍹
            </a>
            <a
              data-ocid="hero.secondary_button"
              href="#about"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold bg-white/70 backdrop-blur-sm text-foreground shadow-sm border border-white/80 transition-transform hover:scale-105 active:scale-95"
            >
              our origin arc 🌿
            </a>
            <button
              type="button"
              data-ocid="hero.surprise_button"
              onClick={handleSurpriseMe}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold bg-white/70 backdrop-blur-sm text-foreground shadow-sm border border-white/80 transition-transform hover:scale-110 active:scale-95"
            >
              Surprise Me 🎲
            </button>
          </div>

          {/* Stats row */}
          <div className="flex gap-8 mt-10 justify-center md:justify-start">
            {[
              {
                label: "Fresh Blends",
                counter: <AnimatedCounter target={30} suffix="+" />,
              },
              {
                label: "Happy Besties",
                counter: <AnimatedCounter target={10} suffix="K+" />,
              },
              {
                label: "Natural Ingredients (real ones)",
                counter: <AnimatedCounter target={100} suffix="%" />,
              },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-3xl font-bold text-foreground">
                  {stat.counter}
                </div>
                <div className="text-sm text-foreground/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="flex-shrink-0"
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <div className="relative">
            <div
              className="absolute inset-0 rounded-full scale-90"
              style={{
                background:
                  "radial-gradient(circle, oklch(0.90 0.08 355 / 0.4), oklch(0.91 0.09 160 / 0.3))",
                filter: "blur(30px)",
              }}
            />
            <img
              src="/assets/generated/smoothie-hero-transparent.dim_400x500.png"
              alt="Delicious colorful smoothie"
              className="relative w-72 md:w-96 animate-float-slow drop-shadow-2xl"
            />
          </div>
        </motion.div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          role="presentation"
        >
          <path
            d="M0 40C240 0 480 60 720 40C960 20 1200 60 1440 40V60H0V40Z"
            fill="oklch(0.985 0.008 85)"
          />
        </svg>
      </div>
    </section>
  );
}
