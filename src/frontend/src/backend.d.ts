import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface MenuItem {
    id: bigint;
    name: string;
    description: string;
    emoji: string;
    category: Category;
    basePrice: bigint;
}
export enum Category {
    greenSmoothies = "greenSmoothies",
    classicShakes = "classicShakes",
    proteinShakes = "proteinShakes",
    fruitSmoothies = "fruitSmoothies"
}
export interface backendInterface {
    getMenuItems(): Promise<Array<MenuItem>>;
    initializeMenu(): Promise<void>;
}
