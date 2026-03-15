import { ShoppingBag } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { CartItem } from "../types/cart";

interface TodaysSpecialProps {
  onAddToCart: (item: CartItem) => void;
}

function getSecondsLeft() {
  const now = new Date();
  const midnight = new Date();
  midnight.setHours(24, 0, 0, 0);
  return Math.max(0, Math.floor((midnight.getTime() - now.getTime()) / 1000));
}

function useCountdownToMidnight() {
  const [secondsLeft, setSecondsLeft] = useState(getSecondsLeft);

  useEffect(() => {
    const id = setInterval(() => setSecondsLeft(getSecondsLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const h = String(Math.floor(secondsLeft / 3600)).padStart(2, "0");
  const m = String(Math.floor((secondsLeft % 3600) / 60)).padStart(2, "0");
  const s = String(secondsLeft % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

const ORIGINAL_PRICE = 699; // cents
const DISCOUNTED_PRICE = Math.round(ORIGINAL_PRICE * 0.8); // 20% off

export function TodaysSpecial({ onAddToCart }: TodaysSpecialProps) {
  const countdown = useCountdownToMidnight();
  const [stockLeft] = useState(() => Math.floor(Math.random() * 6) + 3);

  const handleAdd = () => {
    const item: CartItem = {
      id: `special-medium-${Date.now()}`,
      productId: 1n,
      name: "Strawberry Sunrise",
      emoji: "🍓",
      size: "medium",
      quantity: 1,
      basePrice: ORIGINAL_PRICE,
      unitPrice: DISCOUNTED_PRICE,
    };
    onAddToCart(item);
    toast.success("🍓 Strawberry Sunrise added!", {
      description: "Today's special snagged bestie — you ate fr 🌅",
    });
  };

  return (
    <section data-ocid="special.section" className="py-16 px-6">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative rounded-3xl overflow-hidden p-8 md:p-12 border border-white/60 dark:border-white/10"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.93 0.1 355 / 0.55), oklch(0.90 0.1 40 / 0.5), oklch(0.93 0.08 285 / 0.4))",
          }}
        >
          {/* Dark mode overlay */}
          <div
            className="absolute inset-0 hidden dark:block rounded-3xl"
            style={{ background: "oklch(0.20 0.08 355 / 0.5)" }}
          />

          {/* Decorative blobs */}
          <div
            className="absolute -top-10 -right-10 w-48 h-48 rounded-full blur-3xl opacity-40 pointer-events-none"
            style={{ background: "oklch(0.75 0.18 355)" }}
          />
          <div
            className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full blur-3xl opacity-30 pointer-events-none"
            style={{ background: "oklch(0.80 0.15 40)" }}
          />

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            {/* Emoji art */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="text-8xl md:text-9xl select-none flex-shrink-0"
            >
              🍓
            </motion.div>

            {/* Content */}
            <div className="flex-1 text-center md:text-left">
              {/* Badge */}
              <div className="flex flex-wrap items-center gap-2 justify-center md:justify-start mb-4">
                <div
                  className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-bold text-white shadow-md"
                  style={{ background: "oklch(0.62 0.22 25)" }}
                >
                  <span>🔥</span> TODAY&apos;S SPECIAL
                </div>
                {/* FOMO stock badge */}
                <div
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-bold text-white shadow-md animate-pulse"
                  style={{ background: "oklch(0.60 0.20 30)" }}
                >
                  🔥 Only {stockLeft} left today!
                </div>
              </div>

              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-2">
                Strawberry Sunrise
              </h2>
              <p className="text-foreground/70 text-lg mb-1">
                today&apos;s pick hits different bestie 🌅
              </p>
              <p className="text-foreground/55 text-sm mb-5">
                Fresh strawberries · banana · orange juice · hint of vanilla
              </p>

              {/* Price */}
              <div className="flex items-baseline gap-3 justify-center md:justify-start mb-5">
                <span
                  className="font-display text-4xl font-bold"
                  style={{ color: "oklch(0.55 0.20 25)" }}
                >
                  ${(DISCOUNTED_PRICE / 100).toFixed(2)}
                </span>
                <span className="text-xl text-foreground/40 line-through">
                  ${(ORIGINAL_PRICE / 100).toFixed(2)}
                </span>
                <span
                  className="rounded-full px-2.5 py-1 text-xs font-bold text-white"
                  style={{ background: "oklch(0.58 0.18 160)" }}
                >
                  20% OFF
                </span>
              </div>

              {/* Countdown */}
              <div className="flex items-center gap-3 justify-center md:justify-start mb-6">
                <span className="text-sm text-foreground/60">
                  deal expires in
                </span>
                <span
                  className="font-mono font-bold text-lg tracking-widest px-3 py-1 rounded-xl border border-white/60 bg-white/40 dark:bg-white/10"
                  style={{ color: "oklch(0.55 0.20 25)" }}
                >
                  {countdown}
                </span>
              </div>

              {/* CTA */}
              <motion.button
                data-ocid="special.add.button"
                type="button"
                onClick={handleAdd}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-white font-bold text-lg shadow-lg"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.62 0.20 355), oklch(0.60 0.18 25))",
                }}
              >
                <ShoppingBag size={20} />
                grab it bestie
              </motion.button>
            </div>

            {/* Hashtags */}
            <div className="flex flex-col gap-2 flex-shrink-0 text-sm font-semibold text-foreground/50">
              {[
                "#TodaysSpecial",
                "#StrawberrySzn",
                "#HitsBlinkDifferent",
                "#SmoothieMart",
              ].map((tag) => (
                <span
                  key={tag}
                  className="bg-white/40 dark:bg-white/10 rounded-full px-3 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
