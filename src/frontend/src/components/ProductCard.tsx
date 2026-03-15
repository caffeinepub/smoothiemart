import { Minus, Plus, ShoppingBag } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import type { MenuItem } from "../backend.d";
import type { CartItem, SizeKey } from "../types/cart";
import { SIZE_FULL_LABELS, SIZE_MULTIPLIERS } from "../types/cart";

const CARD_STYLES = [
  "card-pink",
  "card-mint",
  "card-lavender",
  "card-peach",
  "card-yellow",
  "card-berry",
];

const BUTTON_COLORS = [
  "oklch(0.65 0.18 355)", // pink
  "oklch(0.58 0.16 160)", // mint
  "oklch(0.60 0.16 285)", // lavender
  "oklch(0.65 0.16 40)", // peach
  "oklch(0.72 0.15 90)", // yellow
  "oklch(0.60 0.18 310)", // berry
];

const CONFETTI_COLORS = [
  "#ffb3c6",
  "#b3f0d9",
  "#d4b3ff",
  "#ffd4b3",
  "#ffe5b3",
  "#f0b3ff",
  "#ff9de2",
  "#a8f0c6",
];

interface ConfettiParticle {
  id: string;
  x: number;
  y: number;
  color: string;
  angle: number;
  distance: number;
  rotation: number;
  size: number;
}

interface FlyingEmoji {
  id: string;
  emoji: string;
  x: number;
  rotate: number;
}

function spawnConfetti(
  originX: number,
  originY: number,
  count: number,
): ConfettiParticle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `conf-${Date.now()}-${i}`,
    x: originX,
    y: originY,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    angle: Math.random() * 360,
    distance: 80 + Math.random() * 120,
    rotation: (Math.random() - 0.5) * 720,
    size: 6 + Math.random() * 6,
  }));
}

interface ProductCardProps {
  item: MenuItem;
  index: number;
  onAddToCart: (cartItem: CartItem) => void;
  isBestseller?: boolean;
  isFave?: boolean;
}

export function ProductCard({
  item,
  index,
  onAddToCart,
  isBestseller,
  isFave,
}: ProductCardProps) {
  const [size, setSize] = useState<SizeKey>("medium");
  const [qty, setQty] = useState(1);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [flyingEmojis, setFlyingEmojis] = useState<FlyingEmoji[]>([]);
  const [confettiParticles, setConfettiParticles] = useState<
    ConfettiParticle[]
  >([]);
  const cardRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const cardStyle = CARD_STYLES[index % CARD_STYLES.length];
  const btnColor = BUTTON_COLORS[index % BUTTON_COLORS.length];

  const basePrice = Number(item.basePrice);
  const unitPrice = Math.round(basePrice * SIZE_MULTIPLIERS[size]);
  const totalPrice = unitPrice * qty;

  const formatPrice = (cents: number) => `$${(cents / 100).toFixed(2)}`;

  const handleAdd = () => {
    const cartItem: CartItem = {
      id: `${item.id}-${size}-${Date.now()}`,
      productId: item.id,
      name: item.name,
      emoji: item.emoji,
      size,
      quantity: qty,
      basePrice,
      unitPrice,
    };

    if (btnRef.current && cardRef.current) {
      const btnRect = btnRef.current.getBoundingClientRect();
      const cardRect = cardRef.current.getBoundingClientRect();
      const relX = btnRect.left + btnRect.width / 2 - cardRect.left;
      const relY = btnRect.top + btnRect.height / 2 - cardRect.top;
      const particles = spawnConfetti(relX, relY, 28);
      setConfettiParticles((prev) => [...prev, ...particles]);
    }

    const randomX = (Math.random() - 0.5) * 140;
    const randomRotate = (Math.random() - 0.5) * 360;
    const emojiId = `emoji-${Date.now()}-${Math.random()}`;
    setFlyingEmojis((prev) => [
      ...prev,
      { id: emojiId, emoji: item.emoji, x: randomX, rotate: randomRotate },
    ]);

    onAddToCart(cartItem);
    toast.success(`${item.emoji} ${item.name} added to your cart bestie!`, {
      description: `${SIZE_FULL_LABELS[size]} × ${qty} — ${formatPrice(totalPrice)}`,
    });
  };

  const removeFlyingEmoji = (id: string) => {
    setFlyingEmojis((prev) => prev.filter((e) => e.id !== id));
  };

  const removeConfettiParticle = (id: string) => {
    setConfettiParticles((prev) => prev.filter((p) => p.id !== id));
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: -dy * 12, y: dx * 12 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const ocidIndex = index + 1;
  const sizes: SizeKey[] = ["small", "medium", "large"];

  return (
    <motion.div
      ref={cardRef}
      data-ocid={`product.item.${ocidIndex}`}
      className={`${cardStyle} rounded-3xl p-5 shadow-card flex flex-col gap-4 border border-white/60 dark:border-white/10 hover:shadow-pastel transition-shadow duration-300 relative overflow-visible`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(600px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition:
          tilt.x === 0 && tilt.y === 0
            ? "transform 0.5s ease"
            : "transform 0.08s linear",
        willChange: "transform",
      }}
    >
      {/* Confetti particles */}
      <AnimatePresence>
        {confettiParticles.map((p) => {
          const rad = (p.angle * Math.PI) / 180;
          const tx = Math.cos(rad) * p.distance;
          const ty = Math.sin(rad) * p.distance - 40;
          return (
            <motion.div
              key={p.id}
              initial={{ opacity: 1, x: p.x, y: p.y, rotate: 0, scale: 1 }}
              animate={{
                opacity: 0,
                x: p.x + tx,
                y: p.y + ty,
                rotate: p.rotation,
                scale: 0.4,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              onAnimationComplete={() => removeConfettiParticle(p.id)}
              className="pointer-events-none absolute z-50"
              style={{
                width: p.size,
                height: p.size * 0.6,
                background: p.color,
                borderRadius: 2,
                top: 0,
                left: 0,
                marginLeft: -p.size / 2,
                marginTop: -p.size * 0.3,
              }}
            />
          );
        })}
      </AnimatePresence>

      {/* Flying emoji burst animations */}
      <AnimatePresence>
        {flyingEmojis.map((fe) => (
          <motion.div
            key={fe.id}
            initial={{ opacity: 1, y: 0, x: 0, scale: 1, rotate: 0 }}
            animate={{
              opacity: 0,
              y: -130,
              x: fe.x,
              scale: 1.8,
              rotate: fe.rotate,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.85, ease: "easeOut" }}
            onAnimationComplete={() => removeFlyingEmoji(fe.id)}
            className="pointer-events-none absolute bottom-14 left-1/2 -translate-x-1/2 text-4xl z-50 select-none"
            style={{ lineHeight: 1 }}
          >
            {fe.emoji}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Bestseller / Fave badge */}
      {(isBestseller || isFave) && (
        <div
          className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full text-xs font-bold text-white shadow-md"
          style={{
            background: isFave
              ? "linear-gradient(135deg, oklch(0.65 0.16 285), oklch(0.60 0.18 310))"
              : "linear-gradient(135deg, oklch(0.65 0.18 355), oklch(0.62 0.20 25))",
          }}
        >
          {isFave ? "✨ #1 Fave" : "🔥 Most Ordered"}
        </div>
      )}

      {/* Product emoji art */}
      <div className="text-center">
        <div
          className="inline-flex items-center justify-center w-24 h-24 rounded-2xl text-6xl"
          style={{ background: "rgba(255,255,255,0.5)" }}
        >
          {item.emoji}
        </div>
      </div>

      {/* Info */}
      <div>
        <h3 className="font-display font-bold text-lg text-foreground leading-tight">
          {item.name}
        </h3>
        <p className="text-sm text-foreground/65 mt-1 line-clamp-2">
          {item.description}
        </p>
      </div>

      {/* Size selector */}
      <div data-ocid="product.size.select">
        <p className="text-xs font-semibold text-foreground/50 uppercase tracking-wide mb-2">
          Size
        </p>
        <div className="flex gap-2">
          {sizes.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSize(s)}
              className={`flex-1 py-1.5 rounded-xl text-sm font-semibold transition-all duration-200 border-2 ${
                size === s
                  ? "border-transparent text-white shadow-sm scale-105"
                  : "border-white/70 bg-white/40 text-foreground/70 hover:bg-white/60"
              }`}
              style={
                size === s
                  ? { background: btnColor, borderColor: btnColor }
                  : {}
              }
            >
              {SIZE_FULL_LABELS[s]}
            </button>
          ))}
        </div>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-2">
        <span className="font-display text-2xl font-bold text-foreground">
          {formatPrice(unitPrice)}
        </span>
        {size !== "medium" && (
          <span className="text-sm text-foreground/50 line-through">
            {formatPrice(basePrice)}
          </span>
        )}
      </div>

      {/* Quantity + Add button */}
      <div className="flex items-center gap-3 mt-auto">
        {/* Quantity selector */}
        <div className="flex items-center gap-2 bg-white/60 dark:bg-white/10 rounded-2xl px-2 py-1 border border-white/80 dark:border-white/20">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="w-7 h-7 rounded-xl flex items-center justify-center text-foreground/70 hover:bg-white/80 transition-colors"
            aria-label="Decrease quantity"
          >
            <Minus size={14} />
          </button>
          <span
            data-ocid="product.quantity.input"
            className="w-6 text-center font-bold text-foreground text-sm"
          >
            {qty}
          </span>
          <button
            type="button"
            onClick={() => setQty((q) => q + 1)}
            className="w-7 h-7 rounded-xl flex items-center justify-center text-foreground/70 hover:bg-white/80 transition-colors"
            aria-label="Increase quantity"
          >
            <Plus size={14} />
          </button>
        </div>

        {/* Effect 3: Add to cart button with pulsing ring */}
        <button
          ref={btnRef}
          type="button"
          data-ocid="product.add.button"
          onClick={handleAdd}
          className="btn-pulse-ring flex-1 flex items-center justify-center gap-2 py-2.5 rounded-2xl text-white text-sm font-semibold shadow-sm transition-transform hover:scale-105 active:scale-95"
          style={{ background: btnColor, color: btnColor }}
        >
          <span className="flex items-center gap-2 text-white">
            <ShoppingBag size={15} />
            add it fr
          </span>
        </button>
      </div>
    </motion.div>
  );
}
