import { type Variants, motion } from "motion/react";

const HASHTAGS = [
  { tag: "#SmoothieMart", color: "oklch(0.88 0.12 355 / 0.5)" },
  { tag: "#BlendedAndBlessed", color: "oklch(0.88 0.12 160 / 0.5)" },
  { tag: "#SipSipHooray", color: "oklch(0.86 0.12 285 / 0.5)" },
  { tag: "#FruitGang", color: "oklch(0.89 0.12 40 / 0.5)" },
  { tag: "#NoCapNoBadVibes", color: "oklch(0.92 0.12 90 / 0.5)" },
  { tag: "#SmoothieEra", color: "oklch(0.87 0.12 310 / 0.5)" },
  { tag: "#BlendItUp", color: "oklch(0.88 0.12 355 / 0.5)" },
  { tag: "#FreshAndFed", color: "oklch(0.88 0.12 160 / 0.5)" },
  { tag: "#SlayAndSip", color: "oklch(0.86 0.12 285 / 0.5)" },
  { tag: "#FruitIsMyPersonality", color: "oklch(0.89 0.12 40 / 0.5)" },
  { tag: "#NoCupNoVibe", color: "oklch(0.92 0.12 90 / 0.5)" },
  { tag: "#SmoothieSzn", color: "oklch(0.87 0.12 310 / 0.5)" },
  { tag: "#PureAndUnhinged", color: "oklch(0.88 0.12 355 / 0.5)" },
];

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const pillVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35, ease: [0.34, 1.56, 0.64, 1] },
  },
};

export function HashtagWall() {
  return (
    <section data-ocid="hashtag.section" className="py-16 px-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            join the vibe 📲{" "}
            <span className="italic" style={{ color: "oklch(0.60 0.16 285)" }}>
              #SmoothieMart
            </span>
          </h2>
          <p className="text-foreground/55 mt-2 text-sm">
            tag us & become part of the fruit fam 🍉🍓🥭
          </p>
        </div>

        {/* Pills */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="flex flex-wrap gap-3 justify-center"
        >
          {HASHTAGS.map((h) => (
            <motion.span
              key={h.tag}
              variants={pillVariants}
              whileHover={{ scale: 1.08, y: -2 }}
              className="px-5 py-2.5 rounded-full font-semibold text-sm border border-white/60 dark:border-white/15 text-foreground/80 cursor-default shadow-xs"
              style={{ background: h.color }}
            >
              {h.tag}
            </motion.span>
          ))}
        </motion.div>

        {/* CTA */}
        <div className="text-center mt-8">
          <p className="text-foreground/50 text-sm">
            sharing = slay 🌟 use our tags and get featured, no cap
          </p>
        </div>
      </div>
    </section>
  );
}
