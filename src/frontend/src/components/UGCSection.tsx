import { type Variants, motion } from "motion/react";

const REVIEWS = [
  {
    avatar: "🍓",
    handle: "@smoothiequeen99",
    name: "chloe v.",
    stars: 5,
    quote:
      "not me driving 20 mins just for this mango tango fr 😭🙏 it literally slaps every single time no cap",
    tags: "#MangTango #NoCapNoBadVibes",
  },
  {
    avatar: "🥑",
    handle: "@greengirlvibes",
    name: "maya r.",
    stars: 5,
    quote:
      "girly ordered the emerald detox three times this week no cap. my body is literally thriving rn 🌿✨",
    tags: "#EmeraldDetox #GreenEra",
  },
  {
    avatar: "💜",
    handle: "@slayandsipper",
    name: "jas k.",
    stars: 5,
    quote:
      "it's giving health AND slay at the same time periodt 👑 my therapist will hear about this",
    tags: "#BlendedAndBlessed #SmoothieEra",
  },
  {
    avatar: "🌟",
    handle: "@morningchaos420",
    name: "tyler m.",
    stars: 4,
    quote:
      "bro this hits different at 8am idk what they put in it but 💀 i'm showing up every day like it's my job",
    tags: "#SipSipHooray #FruitGang",
  },
  {
    avatar: "🍑",
    handle: "@selfcareszn",
    name: "priya s.",
    stars: 5,
    quote:
      "my therapist said self care and i said smoothiemart understood the assignment bestie 🫶 this is my roman empire",
    tags: "#SmoothieMart #PureAndUnhinged",
  },
];

const CARD_COLORS = [
  "oklch(0.91 0.08 355 / 0.35)",
  "oklch(0.91 0.09 160 / 0.35)",
  "oklch(0.88 0.08 285 / 0.35)",
  "oklch(0.91 0.08 40 / 0.35)",
  "oklch(0.94 0.09 90 / 0.35)",
];

const DARK_CARD_COLORS = [
  "oklch(0.22 0.08 355 / 0.6)",
  "oklch(0.22 0.08 160 / 0.6)",
  "oklch(0.22 0.08 285 / 0.6)",
  "oklch(0.22 0.08 40 / 0.6)",
  "oklch(0.22 0.08 90 / 0.6)",
];

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

interface UGCSectionProps {
  isDark?: boolean;
}

export function UGCSection({ isDark = false }: UGCSectionProps) {
  return (
    <section data-ocid="ugc.section" className="py-20 px-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/70 dark:bg-white/10 rounded-full px-4 py-2 mb-4 shadow-xs border border-white/80 dark:border-white/20">
            <span>💬</span>
            <span className="text-sm font-semibold text-foreground/60 uppercase tracking-wide">
              real ones only
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            the besties said{" "}
            <span className="italic" style={{ color: "oklch(0.60 0.16 355)" }}>
              what they said
            </span>{" "}
            💬
          </h2>
          <p className="text-foreground/55 mt-3">
            ugc is unmatched fr, we love our smoothie fam 🫶
          </p>
        </div>

        {/* Reviews grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {REVIEWS.map((review, i) => (
            <motion.div
              key={review.handle}
              data-ocid={`ugc.item.${i + 1}`}
              variants={itemVariants}
              className="rounded-3xl p-6 border border-white/60 dark:border-white/10 flex flex-col gap-3 hover:shadow-pastel transition-shadow"
              style={{
                background: isDark ? DARK_CARD_COLORS[i] : CARD_COLORS[i],
              }}
            >
              {/* Stars */}
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, si) => (
                  <span
                    key={`star-${review.handle}-${si}`}
                    className={
                      si < review.stars
                        ? "text-yellow-400"
                        : "text-foreground/20"
                    }
                  >
                    ★
                  </span>
                ))}
              </div>

              {/* Quote */}
              <p className="text-foreground/80 leading-relaxed flex-1">
                &ldquo;{review.quote}&rdquo;
              </p>

              {/* Tag */}
              <p
                className="text-xs font-semibold"
                style={{ color: "oklch(0.58 0.14 285)" }}
              >
                {review.tags}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-white/40 dark:border-white/10">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl bg-white/50 dark:bg-white/10 flex-shrink-0">
                  {review.avatar}
                </div>
                <div>
                  <p className="font-bold text-foreground text-sm">
                    {review.name}
                  </p>
                  <p className="text-xs text-foreground/50">{review.handle}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
