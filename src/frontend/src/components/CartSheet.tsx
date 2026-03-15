import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { toast } from "sonner";
import type { CartItem, SizeKey } from "../types/cart";
import { SIZE_FULL_LABELS } from "../types/cart";

interface CartSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: CartItem[];
  onUpdateQty: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
  onOrderPlaced?: () => void;
}

export function CartSheet({
  open,
  onOpenChange,
  items,
  onUpdateQty,
  onRemove,
  onClear,
  onOrderPlaced,
}: CartSheetProps) {
  const formatPrice = (cents: number) => `$${(cents / 100).toFixed(2)}`;

  const subtotal = items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0,
  );

  const handleOrder = () => {
    toast.success("🎉 Order placed! Your blend is on its way!", {
      description: "We'll have it ready in 5-7 minutes.",
    });
    onClear();
    onOpenChange(false);
    onOrderPlaced?.();
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        data-ocid="cart.sheet"
        className="w-full sm:max-w-md flex flex-col gap-0 p-0"
        style={{ background: "oklch(0.985 0.008 85)" }}
      >
        <SheetHeader className="px-6 py-5 border-b border-border">
          <SheetTitle className="font-display text-2xl font-bold flex items-center gap-2">
            <span>🛍️</span> Your Blend Bag
          </SheetTitle>
          {items.length > 0 && (
            <p className="text-sm text-muted-foreground">
              {items.reduce((s, i) => s + i.quantity, 0)} items
            </p>
          )}
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 p-8 text-center">
            <div className="text-6xl animate-wiggle">🥤</div>
            <h3 className="font-display text-xl font-bold text-foreground">
              Your bag is empty!
            </h3>
            <p className="text-muted-foreground">
              Add some delicious blends from our menu.
            </p>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1">
              <div className="px-6 py-4 flex flex-col gap-4">
                {items.map((item, idx) => (
                  <div
                    key={item.id}
                    data-ocid={`cart.item.${idx + 1}`}
                    className="flex items-start gap-3 p-3 rounded-2xl bg-white/60 border border-white/80 shadow-xs"
                  >
                    <div
                      className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                      style={{ background: "rgba(255,200,200,0.3)" }}
                    >
                      {item.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-foreground text-sm truncate">
                        {item.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {SIZE_FULL_LABELS[item.size as SizeKey]}
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          type="button"
                          onClick={() =>
                            onUpdateQty(item.id, item.quantity - 1)
                          }
                          className="w-6 h-6 rounded-lg bg-white border border-border flex items-center justify-center hover:bg-muted transition-colors"
                        >
                          <Minus size={10} />
                        </button>
                        <span className="text-sm font-bold w-5 text-center">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            onUpdateQty(item.id, item.quantity + 1)
                          }
                          className="w-6 h-6 rounded-lg bg-white border border-border flex items-center justify-center hover:bg-muted transition-colors"
                        >
                          <Plus size={10} />
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="font-display font-bold text-foreground text-sm">
                        {formatPrice(item.unitPrice * item.quantity)}
                      </span>
                      <button
                        type="button"
                        onClick={() => onRemove(item.id)}
                        className="text-destructive hover:opacity-70 transition-opacity"
                        aria-label="Remove item"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="border-t border-border px-6 py-5 flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-foreground">Subtotal</span>
                <span className="font-display text-2xl font-bold text-foreground">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <Separator />
              <button
                type="button"
                data-ocid="cart.order.button"
                onClick={handleOrder}
                className="w-full py-4 rounded-2xl text-white font-semibold text-lg flex items-center justify-center gap-2 shadow-pastel transition-transform hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.65 0.18 355), oklch(0.60 0.16 285))",
                }}
              >
                <ShoppingBag size={20} />
                Order Now — {formatPrice(subtotal)}
              </button>
              <p className="text-center text-xs text-muted-foreground">
                🌿 Fresh & made to order
              </p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
