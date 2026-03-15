import { Toaster } from "@/components/ui/sonner";
import { Moon, ShoppingBag, Sun } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { CartSheet } from "./components/CartSheet";
import { FruitCursor } from "./components/FruitCursor";
import { HashtagWall } from "./components/HashtagWall";
import { Hero } from "./components/Hero";
import { LoyaltyBanner } from "./components/LoyaltyBanner";
import { MenuSection } from "./components/MenuSection";
import { ScrollProgressBar } from "./components/ScrollProgressBar";
import { SipSquadSignup } from "./components/SipSquadSignup";
import { ThankYouOverlay } from "./components/ThankYouOverlay";
import { TodaysSpecial } from "./components/TodaysSpecial";
import { UGCSection } from "./components/UGCSection";
import { useGetMenuItems } from "./hooks/useQueries";
import type { CartItem } from "./types/cart";

const PUNCHLINES = [
  { icon: "🌟", text: "sip. vibe. repeat." },
  { icon: "💫", text: "main character energy 🥤" },
  { icon: "🎉", text: "no bad vibes allowed fr" },
  { icon: "🥤", text: "fruit always hits different" },
  { icon: "🍓", text: "taste the rainbow (no cap)" },
];

// Effect 7: Sparkle pop particles when cart opens
interface NavSparkle {
  id: string;
  x: number;
  y: number;
  emoji: string;
}

export default function App() {
  const { data: menuItems = [], isLoading } = useGetMenuItems();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  // Effect 4: track previous totalCount for bounce animation key
  const [badgeKey, setBadgeKey] = useState(0);
  // Effect 7: sparkle pop near cart icon
  const [navSparkles, setNavSparkles] = useState<NavSparkle[]>([]);
  const cartBtnRef = useRef<HTMLButtonElement>(null);
  const prevCartOpen = useRef(false);

  const totalCount = cartItems.reduce((s, i) => s + i.quantity, 0);

  // Effect 4: bump badge key whenever totalCount increases
  const prevTotalCount = useRef(totalCount);
  useEffect(() => {
    if (totalCount > prevTotalCount.current) {
      setBadgeKey((k) => k + 1);
    }
    prevTotalCount.current = totalCount;
  }, [totalCount]);

  // Effect 7: spawn sparkles near cart icon when cart opens
  useEffect(() => {
    if (cartOpen && !prevCartOpen.current && cartBtnRef.current) {
      const rect = cartBtnRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const emojis = ["✨", "💖", "🌟", "⭐", "💫"];
      const newSparkles: NavSparkle[] = Array.from({ length: 5 }, (_, i) => ({
        id: `nsp-${Date.now()}-${i}`,
        x: cx + (Math.random() - 0.5) * 60,
        y: cy + (Math.random() - 0.5) * 40,
        emoji: emojis[i % emojis.length],
      }));
      setNavSparkles(newSparkles);
      setTimeout(() => setNavSparkles([]), 1200);
    }
    prevCartOpen.current = cartOpen;
  }, [cartOpen]);

  const handleAddToCart = (item: CartItem) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (ci) => ci.productId === item.productId && ci.size === item.size,
      );
      if (existing) {
        return prev.map((ci) =>
          ci.id === existing.id
            ? { ...ci, quantity: ci.quantity + item.quantity }
            : ci,
        );
      }
      return [...prev, item];
    });
  };

  const handleUpdateQty = (id: string, qty: number) => {
    if (qty <= 0) {
      setCartItems((prev) => prev.filter((ci) => ci.id !== id));
    } else {
      setCartItems((prev) =>
        prev.map((ci) => (ci.id === id ? { ...ci, quantity: qty } : ci)),
      );
    }
  };

  const handleRemove = (id: string) => {
    setCartItems((prev) => prev.filter((ci) => ci.id !== id));
  };

  const handleClear = () => setCartItems([]);

  return (
    <div
      className={`min-h-screen flex flex-col${isDark ? " dark" : ""}`}
      style={
        isDark
          ? { background: "oklch(0.15 0.05 285)", colorScheme: "dark" }
          : {}
      }
    >
      <ScrollProgressBar />
      <FruitCursor />

      {/* Effect 7: Nav sparkle pop overlay */}
      <AnimatePresence>
        {navSparkles.map((sp) => (
          <motion.span
            key={sp.id}
            initial={{ opacity: 1, scale: 0.5, x: sp.x, y: sp.y }}
            animate={{
              opacity: 0,
              scale: 1.6,
              x: sp.x + (Math.random() - 0.5) * 30,
              y: sp.y - 30,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="fixed pointer-events-none z-[100] select-none text-lg"
            style={{ left: 0, top: 0 }}
          >
            {sp.emoji}
          </motion.span>
        ))}
      </AnimatePresence>

      {/* Navbar */}
      <header
        className="sticky top-0 z-40 backdrop-blur-md border-b shadow-xs"
        style={{
          background: isDark
            ? "oklch(0.18 0.06 285 / 0.85)"
            : "rgba(255,255,255,0.70)",
          borderColor: isDark
            ? "oklch(0.28 0.06 285)"
            : "rgba(255,255,255,0.8)",
        }}
      >
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🥤</span>
            {/* Effect 2: Rainbow shimmer on SmoothieMart brand name */}
            <span className="font-display font-bold text-xl text-rainbow-shimmer">
              SmoothieMart
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-foreground/70">
            <a
              data-ocid="nav.link"
              href="#menu"
              className="hover:text-foreground transition-colors"
            >
              Menu
            </a>
            <a
              data-ocid="nav.link"
              href="#about"
              className="hover:text-foreground transition-colors"
            >
              origin arc
            </a>
            <a
              data-ocid="nav.link"
              href="#contact"
              className="hover:text-foreground transition-colors"
            >
              Contact
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <button
              type="button"
              data-ocid="darkmode.toggle"
              onClick={() => setIsDark((d) => !d)}
              aria-label={
                isDark ? "Switch to light mode" : "Switch to dark mode"
              }
              className="w-10 h-10 rounded-full flex items-center justify-center border transition-all hover:scale-105 active:scale-95"
              style={{
                background: isDark
                  ? "oklch(0.28 0.08 285)"
                  : "rgba(255,255,255,0.7)",
                borderColor: isDark
                  ? "oklch(0.38 0.08 285)"
                  : "rgba(255,255,255,0.9)",
                color: isDark ? "oklch(0.85 0.12 90)" : "oklch(0.55 0.12 285)",
              }}
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <button
              ref={cartBtnRef}
              type="button"
              data-ocid="nav.cart_button"
              onClick={() => setCartOpen(true)}
              className="relative flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm transition-transform hover:scale-105 active:scale-95 text-white shadow-sm"
              style={{ background: "oklch(0.65 0.18 355)" }}
            >
              <ShoppingBag size={16} />
              <span className="hidden sm:inline">Bag</span>
              {/* Effect 4: Bouncy cart badge with key-driven animation */}
              {totalCount > 0 && (
                <motion.span
                  key={badgeKey}
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center text-white"
                  style={{ background: "oklch(0.55 0.15 160)" }}
                  initial={{ scale: 1.6 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 15 }}
                >
                  {totalCount}
                </motion.span>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Hero />

        <LoyaltyBanner />
        <TodaysSpecial onAddToCart={handleAddToCart} />

        {/* Punchline Banner */}
        <section
          className="py-8 px-6 overflow-hidden"
          style={{
            background: isDark
              ? "oklch(0.18 0.06 285 / 0.6)"
              : "oklch(0.985 0.008 85)",
          }}
        >
          <div className="container mx-auto">
            <div className="flex flex-wrap gap-4 justify-center">
              {PUNCHLINES.map((p, i) => (
                <motion.div
                  key={p.text}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="flex items-center gap-2 rounded-full px-5 py-3 font-semibold text-sm shadow-sm border border-white/70 dark:border-white/15"
                  style={{
                    background:
                      i % 3 === 0
                        ? "linear-gradient(135deg, oklch(0.90 0.08 355 / 0.5), oklch(0.93 0.06 355 / 0.3))"
                        : i % 3 === 1
                          ? "linear-gradient(135deg, oklch(0.88 0.08 285 / 0.5), oklch(0.92 0.06 285 / 0.3))"
                          : "linear-gradient(135deg, oklch(0.91 0.09 160 / 0.5), oklch(0.93 0.07 160 / 0.3))",
                  }}
                >
                  <span className="text-xl">{p.icon}</span>
                  <span className="text-foreground/80">{p.text}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <MenuSection
          items={menuItems}
          isLoading={isLoading}
          onAddToCart={handleAddToCart}
        />

        <UGCSection isDark={isDark} />
        <HashtagWall />
        <SipSquadSignup />

        {/* About teaser */}
        <section id="about" className="py-20 px-6 relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
          >
            <svg
              aria-hidden="true"
              role="presentation"
              className="absolute"
              style={{ top: "15%", left: "3%", opacity: 0.5 }}
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
            >
              <path
                d="M15 3 L17 11 L25 15 L17 19 L15 27 L13 19 L5 15 L13 11 Z"
                stroke="oklch(0.72 0.14 355)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <svg
              aria-hidden="true"
              role="presentation"
              className="absolute animate-wiggle"
              style={{
                top: "25%",
                right: "4%",
                opacity: 0.45,
                animationDelay: "0.6s",
              }}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12 2 L13.5 8.5 L20 12 L13.5 15.5 L12 22 L10.5 15.5 L4 12 L10.5 8.5 Z"
                stroke="oklch(0.70 0.14 285)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <svg
              aria-hidden="true"
              role="presentation"
              className="absolute"
              style={{ bottom: "20%", left: "2%", opacity: 0.4 }}
              width="70"
              height="22"
              viewBox="0 0 70 22"
              fill="none"
            >
              <path
                d="M2 11 Q10 2 18 11 Q26 20 34 11 Q42 2 50 11 Q58 20 68 11"
                stroke="oklch(0.78 0.12 160)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <svg
              aria-hidden="true"
              role="presentation"
              className="absolute animate-float-slow"
              style={{
                bottom: "30%",
                right: "5%",
                opacity: 0.45,
                animationDelay: "1.2s",
              }}
              width="28"
              height="26"
              viewBox="0 0 28 26"
              fill="none"
            >
              <path
                d="M14 23 C14 23 2 15 2 8 C2 4.5 5 2 8.5 2 C11 2 13 3.5 14 5.2 C15 3.5 17 2 19.5 2 C23 2 26 4.5 26 8 C26 15 14 23 14 23Z"
                stroke="oklch(0.72 0.17 355)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div
            className="container mx-auto rounded-3xl p-12 text-center relative"
            style={{
              background: isDark
                ? "oklch(0.20 0.07 285 / 0.8)"
                : "linear-gradient(135deg, oklch(0.90 0.08 355 / 0.4), oklch(0.88 0.08 285 / 0.35), oklch(0.91 0.09 160 / 0.35))",
              border: isDark
                ? "1.5px solid oklch(0.30 0.08 285)"
                : "1.5px solid rgba(255,255,255,0.7)",
            }}
          >
            <div className="text-5xl mb-4">🌿</div>
            <h2 className="font-display text-4xl font-bold text-foreground mb-4">
              Pure. Fresh.{" "}
              <span
                className="italic"
                style={{ color: "oklch(0.60 0.16 285)" }}
              >
                It&apos;s giving.
              </span>
            </h2>
            <p className="text-foreground/70 max-w-xl mx-auto text-lg mb-4">
              every ingredient sourced fresh daily, no cap. no artificial stuff,
              just real fruits, real goodness, real slay.
            </p>
            <p className="text-foreground/75 max-w-xl mx-auto text-lg mb-2 font-semibold">
              We don&apos;t just make smoothies. We make{" "}
              <span
                className="italic"
                style={{ color: "oklch(0.60 0.18 355)" }}
              >
                MOMENTS.
              </span>{" "}
              (and we ate) ✨
            </p>
            <p className="text-foreground/60 max-w-lg mx-auto text-base mb-8 italic">
              one sip and you&apos;ll forget it&apos;s even a Tuesday 🌈
            </p>
            <div className="flex flex-wrap justify-center gap-8">
              {[
                { icon: "🍓", label: "farm-fresh fruits (real ones)" },
                { icon: "💧", label: "zero sugar drama" },
                { icon: "🌱", label: "plant-based era" },
                { icon: "⚡", label: "ready in minutes bestie" },
              ].map((f) => (
                <div key={f.label} className="flex items-center gap-2">
                  <span className="text-2xl">{f.icon}</span>
                  <span className="font-semibold text-foreground/80">
                    {f.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        id="contact"
        className="border-t py-10 px-6"
        style={{
          background: isDark
            ? "oklch(0.18 0.06 285 / 0.8)"
            : "oklch(0.96 0.015 285 / 0.4)",
          borderColor: isDark ? "oklch(0.28 0.06 285)" : undefined,
        }}
      >
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🥤</span>
            <span className="font-display font-bold text-foreground">
              SmoothieMart
            </span>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            life&apos;s short, sip something bussin 🍓 only good vibes, always.
          </p>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()}. Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>

      {/* Floating cart button */}
      <AnimatePresence>
        {totalCount > 0 && (
          <motion.button
            data-ocid="cart.open_modal_button"
            key="float-cart"
            type="button"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCartOpen(true)}
            className="fixed bottom-8 right-8 z-50 flex items-center gap-3 px-5 py-4 rounded-2xl text-white font-semibold shadow-lg"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.65 0.18 355), oklch(0.60 0.16 285))",
            }}
          >
            <ShoppingBag size={22} />
            <span>
              {totalCount} item{totalCount !== 1 ? "s" : ""}
            </span>
            <span className="bg-white/30 rounded-xl px-2 py-0.5 text-sm font-bold">
              view bag bestie
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <CartSheet
        open={cartOpen}
        onOpenChange={setCartOpen}
        items={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemove={handleRemove}
        onClear={handleClear}
        onOrderPlaced={() => setShowThankYou(true)}
      />

      <ThankYouOverlay
        show={showThankYou}
        onDone={() => setShowThankYou(false)}
      />

      <Toaster richColors position="top-right" />
    </div>
  );
}
