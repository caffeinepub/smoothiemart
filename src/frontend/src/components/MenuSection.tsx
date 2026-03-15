import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import type { MenuItem } from "../backend.d";
import { Category } from "../backend.d";
import type { CartItem } from "../types/cart";
import { ProductCard } from "./ProductCard";

const CATEGORIES = [
  { key: "all", label: "All", emoji: "🥤" },
  { key: Category.fruitSmoothies, label: "Fruit Smoothies", emoji: "🍓" },
  { key: Category.greenSmoothies, label: "Green Smoothies", emoji: "🥬" },
  { key: Category.proteinShakes, label: "Protein Shakes", emoji: "💪" },
  { key: Category.classicShakes, label: "Classic Shakes", emoji: "🍦" },
];

const SKELETON_IDS = ["sk1", "sk2", "sk3", "sk4", "sk5", "sk6", "sk7", "sk8"];

const FALLBACK_ITEMS: MenuItem[] = [
  {
    id: 1n,
    name: "Strawberry Sunrise",
    description:
      "Fresh strawberries blended with banana, orange juice, and a hint of vanilla.",
    emoji: "🍓",
    category: Category.fruitSmoothies,
    basePrice: 699n,
  },
  {
    id: 2n,
    name: "Tropical Mango Tango",
    description:
      "Mango, pineapple, coconut milk, and a squeeze of lime. Pure paradise.",
    emoji: "🥭",
    category: Category.fruitSmoothies,
    basePrice: 749n,
  },
  {
    id: 3n,
    name: "Blueberry Dream",
    description:
      "Wild blueberries, acai, almond milk, and honey. Antioxidant powerhouse.",
    emoji: "🫐",
    category: Category.fruitSmoothies,
    basePrice: 799n,
  },
  {
    id: 4n,
    name: "Emerald Detox",
    description:
      "Spinach, kale, green apple, cucumber, lemon, and ginger. Feel the green!",
    emoji: "🥬",
    category: Category.greenSmoothies,
    basePrice: 849n,
  },
  {
    id: 5n,
    name: "Avocado Mint Chill",
    description:
      "Creamy avocado, fresh mint, lime, and coconut water. Silky smooth.",
    emoji: "🥑",
    category: Category.greenSmoothies,
    basePrice: 879n,
  },
  {
    id: 6n,
    name: "Power Vanilla Whey",
    description:
      "Vanilla whey protein, banana, oat milk, almond butter, and cinnamon.",
    emoji: "💪",
    category: Category.proteinShakes,
    basePrice: 999n,
  },
  {
    id: 7n,
    name: "Choco Peanut Boost",
    description:
      "Chocolate protein, peanut butter, banana, and whole milk. Post-workout fuel.",
    emoji: "🍫",
    category: Category.proteinShakes,
    basePrice: 1049n,
  },
  {
    id: 8n,
    name: "Classic Vanilla Shake",
    description:
      "Old-school hand-scooped vanilla ice cream shake. Thick, creamy perfection.",
    emoji: "🍦",
    category: Category.classicShakes,
    basePrice: 649n,
  },
  {
    id: 9n,
    name: "Double Choco Indulgence",
    description:
      "Chocolate ice cream, chocolate fudge, whole milk. A chocoholic's dream.",
    emoji: "🍫",
    category: Category.classicShakes,
    basePrice: 699n,
  },
  {
    id: 10n,
    name: "Watermelon Fizz",
    description:
      "Fresh watermelon, lemon, mint, and a touch of sparkling water.",
    emoji: "🍉",
    category: Category.fruitSmoothies,
    basePrice: 629n,
  },
  {
    id: 11n,
    name: "Kiwi Passion",
    description:
      "Kiwi, passion fruit, mango, and coconut milk. A tropical escape.",
    emoji: "🥝",
    category: Category.fruitSmoothies,
    basePrice: 729n,
  },
  {
    id: 12n,
    name: "Berry Blast Protein",
    description:
      "Mixed berries, Greek yogurt, whey protein, chia seeds, and honey.",
    emoji: "🍇",
    category: Category.proteinShakes,
    basePrice: 949n,
  },
];

interface MenuSectionProps {
  items: MenuItem[];
  isLoading: boolean;
  onAddToCart: (item: CartItem) => void;
}

export function MenuSection({
  items,
  isLoading,
  onAddToCart,
}: MenuSectionProps) {
  const [activeCategory, setActiveCategory] = useState("all");

  const displayItems = items.length > 0 ? items : FALLBACK_ITEMS;

  const filtered =
    activeCategory === "all"
      ? displayItems
      : displayItems.filter((i) => i.category === activeCategory);

  return (
    <section id="menu" data-ocid="menu.section" className="py-20 px-6">
      <div className="container mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/70 dark:bg-white/10 rounded-full px-4 py-2 mb-4 shadow-xs border border-white/80 dark:border-white/20">
            <span>🌈</span>
            <span className="text-sm font-semibold text-foreground/60 uppercase tracking-wide">
              the menu, bestie
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            Pick Your{" "}
            <span className="italic" style={{ color: "oklch(0.60 0.16 285)" }}>
              Vibe
            </span>
          </h2>
          <p className="text-foreground/60 mt-3 max-w-lg mx-auto">
            every blend is made fresh to order, real fruits only, no cap. no
            fake stuff, periodt.
          </p>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              type="button"
              data-ocid="menu.category.tab"
              onClick={() => setActiveCategory(cat.key)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 border-2 ${
                activeCategory === cat.key
                  ? "text-white border-transparent shadow-sm scale-105"
                  : "bg-white/60 dark:bg-white/10 border-white/80 dark:border-white/20 text-foreground/70 hover:bg-white/80"
              }`}
              style={
                activeCategory === cat.key
                  ? {
                      background: "oklch(0.60 0.16 285)",
                      borderColor: "oklch(0.60 0.16 285)",
                    }
                  : {}
              }
            >
              <span>{cat.emoji}</span>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Product grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {SKELETON_IDS.map((id) => (
              <Skeleton key={id} className="h-96 rounded-3xl" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20" data-ocid="menu.empty_state">
            <div className="text-6xl mb-4">🫙</div>
            <p className="font-display text-2xl font-bold text-foreground">
              nothing here bestie 😭
            </p>
            <p className="text-muted-foreground mt-2">try a diff vibe.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((item, i) => (
              <ProductCard
                key={String(item.id)}
                item={item}
                index={i}
                onAddToCart={onAddToCart}
                isBestseller={i === 0}
                isFave={i === 1}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
