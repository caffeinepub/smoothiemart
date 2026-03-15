export type SizeKey = "small" | "medium" | "large";

export interface CartItem {
  id: string;
  productId: bigint;
  name: string;
  emoji: string;
  size: SizeKey;
  quantity: number;
  basePrice: number; // cents
  unitPrice: number; // cents after size adjustment
}

export const SIZE_LABELS: Record<SizeKey, string> = {
  small: "S",
  medium: "M",
  large: "L",
};

export const SIZE_MULTIPLIERS: Record<SizeKey, number> = {
  small: 0.8,
  medium: 1.0,
  large: 1.3,
};

export const SIZE_FULL_LABELS: Record<SizeKey, string> = {
  small: "Small",
  medium: "Medium",
  large: "Large",
};
