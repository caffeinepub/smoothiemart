import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

interface ThankYouOverlayProps {
  show: boolean;
  onDone: () => void;
}

const SMOOTHIE_EMOJIS = [
  "🥤",
  "🍓",
  "🫐",
  "🍌",
  "🍍",
  "🍇",
  "🍊",
  "🥝",
  "✨",
  "💖",
];

interface RainingEmoji {
  id: number;
  emoji: string;
  x: number;
  delay: number;
  duration: number;
  size: number;
  rotate: number;
}

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  angle: number;
  distance: number;
}

const SPARKLE_COLORS = [
  "oklch(0.85 0.18 355)",
  "oklch(0.80 0.18 60)",
  "oklch(0.78 0.18 160)",
  "oklch(0.75 0.18 285)",
  "oklch(0.88 0.16 90)",
  "oklch(0.82 0.20 30)",
];

export function ThankYouOverlay({ show, onDone }: ThankYouOverlayProps) {
  const [rainingEmojis, setRainingEmojis] = useState<RainingEmoji[]>([]);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    if (!show) return;

    // Generate raining emojis
    const emojis: RainingEmoji[] = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      emoji:
        SMOOTHIE_EMOJIS[Math.floor(Math.random() * SMOOTHIE_EMOJIS.length)],
      x: Math.random() * 100,
      delay: Math.random() * 1.5,
      duration: 2.0 + Math.random() * 1.5,
      size: 20 + Math.floor(Math.random() * 22),
      rotate: (Math.random() - 0.5) * 720,
    }));
    setRainingEmojis(emojis);

    // Generate burst sparkles
    const sparks: Sparkle[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: 50,
      y: 42,
      size: 6 + Math.random() * 8,
      color: SPARKLE_COLORS[i % SPARKLE_COLORS.length],
      angle: (i / 20) * 360 + Math.random() * 18,
      distance: 80 + Math.random() * 120,
    }));
    setSparkles(sparks);

    // Auto-dismiss after 3.2s
    const timer = setTimeout(() => onDone(), 3200);
    return () => clearTimeout(timer);
  }, [show, onDone]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          data-ocid="thankyou.modal"
          key="thankyou-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeOut" } }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden pointer-events-none"
          style={{
            background: "oklch(0.96 0.04 355 / 0.88)",
            backdropFilter: "blur(8px)",
          }}
        >
          {/* Raining emojis */}
          {rainingEmojis.map((e) => (
            <motion.span
              key={e.id}
              initial={{ y: "-10vh", opacity: 0, rotate: 0 }}
              animate={{
                y: "110vh",
                opacity: [0, 1, 1, 0.6, 0],
                rotate: e.rotate,
              }}
              transition={{
                duration: e.duration,
                delay: e.delay,
                ease: "easeIn",
              }}
              className="absolute pointer-events-none select-none"
              style={{
                left: `${e.x}%`,
                top: 0,
                fontSize: e.size,
                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.15))",
              }}
            >
              {e.emoji}
            </motion.span>
          ))}

          {/* Burst sparkles */}
          {sparkles.map((sp) => {
            const rad = (sp.angle * Math.PI) / 180;
            const dx = Math.cos(rad) * sp.distance;
            const dy = Math.sin(rad) * sp.distance;
            return (
              <motion.div
                key={sp.id}
                initial={{ x: "0vw", y: "0vh", scale: 1, opacity: 1 }}
                animate={{
                  x: `${dx * 0.01 * 100}vw`,
                  y: `${dy * 0.01 * 100}vh`,
                  scale: 0,
                  opacity: 0,
                }}
                transition={{ duration: 1.0, delay: 0.15, ease: "easeOut" }}
                className="absolute pointer-events-none"
                style={{
                  left: `${sp.x}%`,
                  top: `${sp.y}%`,
                  width: sp.size,
                  height: sp.size,
                  borderRadius: "50%",
                  background: sp.color,
                  transform: "translate(-50%, -50%)",
                  boxShadow: `0 0 ${sp.size * 2}px ${sp.color}`,
                }}
              />
            );
          })}

          {/* Center card */}
          <motion.div
            initial={{ scale: 0.4, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: -20 }}
            transition={{
              type: "spring",
              stiffness: 380,
              damping: 22,
              delay: 0.05,
            }}
            className="relative flex flex-col items-center gap-4 px-10 py-10 rounded-3xl shadow-2xl pointer-events-auto"
            style={{
              background:
                "linear-gradient(145deg, oklch(1.0 0.0 0 / 0.95), oklch(0.97 0.03 355 / 0.95))",
              border: "2px solid oklch(0.88 0.12 355 / 0.6)",
              maxWidth: 380,
              width: "90vw",
            }}
          >
            {/* Big emoji */}
            <motion.div
              animate={{ rotate: [0, -12, 12, -8, 8, 0], scale: [1, 1.15, 1] }}
              transition={{ duration: 0.7, delay: 0.3, ease: "easeInOut" }}
              className="text-7xl select-none"
            >
              🎉
            </motion.div>

            {/* Main heading */}
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="font-display text-4xl font-bold text-center leading-tight"
              style={{ color: "oklch(0.30 0.06 285)" }}
            >
              Thank you!{" "}
              <motion.span
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ delay: 0.6, duration: 0.4 }}
                className="inline-block"
              >
                🥤
              </motion.span>
            </motion.h2>

            {/* Sub-message */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="text-lg font-semibold text-center"
              style={{ color: "oklch(0.50 0.14 355)" }}
            >
              Your blend is on its way bestie!
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-sm text-center"
              style={{ color: "oklch(0.55 0.06 285)" }}
            >
              fr fr, this one&apos;s gonna slap 🍓✨
            </motion.p>

            {/* Decorative doodle stars */}
            <svg
              aria-hidden="true"
              className="absolute -top-4 -left-4 pointer-events-none"
              width="36"
              height="36"
              viewBox="0 0 36 36"
            >
              <path
                d="M18 3 L20 13 L30 18 L20 23 L18 33 L16 23 L6 18 L16 13 Z"
                fill="oklch(0.88 0.18 60)"
                opacity="0.85"
              />
            </svg>
            <svg
              aria-hidden="true"
              className="absolute -bottom-4 -right-4 pointer-events-none"
              width="28"
              height="28"
              viewBox="0 0 28 28"
            >
              <path
                d="M14 2 L15.8 9.5 L23 14 L15.8 18.5 L14 26 L12.2 18.5 L5 14 L12.2 9.5 Z"
                fill="oklch(0.78 0.18 355)"
                opacity="0.8"
              />
            </svg>
            <svg
              aria-hidden="true"
              className="absolute top-2 -right-5 pointer-events-none"
              width="20"
              height="20"
              viewBox="0 0 20 20"
            >
              <circle
                cx="10"
                cy="10"
                r="4"
                fill="oklch(0.80 0.18 160)"
                opacity="0.75"
              />
            </svg>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
