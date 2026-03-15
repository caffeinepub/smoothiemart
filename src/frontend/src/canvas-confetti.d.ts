declare module "canvas-confetti" {
  interface Options {
    particleCount?: number;
    spread?: number;
    origin?: { x?: number; y?: number };
    colors?: string[];
    startVelocity?: number;
    gravity?: number;
    scalar?: number;
    ticks?: number;
    angle?: number;
    decay?: number;
    drift?: number;
    flat?: boolean;
    shapes?: string[];
    zIndex?: number;
    disableForReducedMotion?: boolean;
    useWorker?: boolean;
    resize?: boolean;
  }

  function confetti(options?: Options): Promise<null> | null;
  export = confetti;
}
