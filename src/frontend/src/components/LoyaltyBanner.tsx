import { Progress } from "@/components/ui/progress";
import { motion } from "motion/react";

export function LoyaltyBanner() {
  const currentPoints = 320;
  const targetPoints = 500;
  const progressPct = Math.round((currentPoints / targetPoints) * 100);

  return (
    <section data-ocid="loyalty.banner.section" className="px-6 py-4">
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="container mx-auto rounded-2xl px-6 py-4 border border-white/60 dark:border-white/10 flex flex-col sm:flex-row items-center gap-4 overflow-hidden relative"
        style={{
          background:
            "linear-gradient(90deg, oklch(0.90 0.10 285 / 0.5), oklch(0.91 0.10 160 / 0.45), oklch(0.90 0.09 355 / 0.45))",
        }}
      >
        {/* Dark overlay */}
        <div
          className="absolute inset-0 hidden dark:block"
          style={{ background: "oklch(0.18 0.06 285 / 0.6)" }}
        />

        {/* Sparkle decor */}
        <div className="absolute right-4 top-2 text-2xl opacity-30 pointer-events-none select-none">
          ✨
        </div>
        <div className="absolute right-16 bottom-1 text-xl opacity-20 pointer-events-none select-none">
          💫
        </div>

        <div className="relative z-10 flex-1 flex flex-col sm:flex-row items-center gap-4">
          {/* Copy */}
          <div className="flex-1 text-center sm:text-left">
            <p className="font-bold text-foreground text-sm md:text-base">
              earn points w/ every sip 💫
              <span className="mx-2 text-foreground/40">|</span>
              100 pts = free blend bestie
              <span className="mx-2 text-foreground/40">|</span>
              <span style={{ color: "oklch(0.58 0.18 285)" }}>
                you&apos;re literally so close ✨
              </span>
            </p>
          </div>

          {/* Progress */}
          <div className="flex-shrink-0 flex items-center gap-3 bg-white/40 dark:bg-white/10 rounded-xl px-4 py-2">
            <div className="text-center">
              <p className="text-xs text-foreground/55 font-semibold mb-1">
                <span className="font-bold text-foreground">
                  {currentPoints}
                </span>{" "}
                / {targetPoints} pts to Gold Tier 🥇
              </p>
              <div className="w-44">
                <Progress value={progressPct} className="h-2.5 bg-white/50" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
