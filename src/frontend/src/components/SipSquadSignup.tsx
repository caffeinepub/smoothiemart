import { motion } from "motion/react";
import { useState } from "react";

export function SipSquadSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  };

  return (
    <section
      data-ocid="sipsquad.section"
      className="py-20 px-6 relative overflow-hidden"
    >
      {/* Animated pastel gradient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.93 0.09 355 / 0.55) 0%, oklch(0.90 0.09 285 / 0.50) 50%, oklch(0.92 0.08 355 / 0.45) 100%)",
          animation: "gradientPulse 8s ease infinite alternate",
        }}
      />

      {/* Decorative blobs */}
      <div
        className="absolute -top-12 -left-12 w-56 h-56 rounded-full blur-3xl opacity-30 pointer-events-none"
        style={{ background: "oklch(0.78 0.16 355)" }}
      />
      <div
        className="absolute -bottom-12 -right-12 w-64 h-64 rounded-full blur-3xl opacity-25 pointer-events-none"
        style={{ background: "oklch(0.75 0.14 285)" }}
      />

      {/* Floating emojis */}
      {["💌", "🥤", "✨", "🍓", "💜"].map((emoji, i) => (
        <div
          key={emoji}
          className="absolute select-none pointer-events-none text-2xl opacity-30 animate-float"
          style={{
            top: `${15 + i * 15}%`,
            left: i % 2 === 0 ? `${3 + i * 2}%` : undefined,
            right: i % 2 !== 0 ? `${3 + i * 2}%` : undefined,
            animationDelay: `${i * 0.6}s`,
          }}
        >
          {emoji}
        </div>
      ))}

      <div className="container mx-auto relative z-10 max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Icon badge */}
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-full text-3xl mb-6 shadow-lg"
            style={{ background: "oklch(0.93 0.09 355 / 0.7)" }}
          >
            💌
          </div>

          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-3 leading-tight">
            join the sip squad
            <span className="ml-2">💌</span>
          </h2>
          <p className="text-foreground/65 text-lg mb-8 leading-relaxed">
            get exclusive drops, secret menu leaks &amp; vibes delivered to your
            inbox fr
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="inline-flex flex-col items-center gap-3 px-10 py-8 rounded-3xl border border-white/70 shadow-lg"
              style={{ background: "oklch(0.95 0.06 160 / 0.6)" }}
              data-ocid="sipsquad.success_state"
            >
              <span className="text-5xl">🎉</span>
              <p className="font-display text-2xl font-bold text-foreground">
                you&apos;re in bestie!
              </p>
              <p className="text-foreground/65">
                check your inbox 📬 the vibes are incoming
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <input
                  data-ocid="sipsquad.input"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com bestie"
                  className="flex-1 max-w-xs sm:max-w-none px-5 py-3.5 rounded-2xl border-2 border-white/70 bg-white/60 backdrop-blur-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-pink-300 dark:bg-white/10 dark:border-white/20 font-body text-base shadow-sm"
                />
                <button
                  data-ocid="sipsquad.submit_button"
                  type="submit"
                  className="px-7 py-3.5 rounded-2xl text-white font-bold text-base shadow-md transition-transform hover:scale-105 active:scale-95 whitespace-nowrap"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.65 0.18 355), oklch(0.60 0.16 285))",
                  }}
                >
                  i&apos;m in bestie 🥤
                </button>
              </div>
              <p className="text-xs text-foreground/40 mt-3">
                no spam, only sips 🚫📧 unsubscribe anytime
              </p>
            </form>
          )}

          {/* Social proof micro-copy */}
          <p className="text-sm text-foreground/50 mt-6">
            🥤 12,400+ besties already sippin on the inside
          </p>
        </motion.div>
      </div>
    </section>
  );
}
