import { useEffect, useState } from "react";

export function FruitCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState({ x: -100, y: -100 });
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const checkTouch = () =>
      setIsTouch(window.matchMedia("(pointer: coarse)").matches);
    checkTouch();
    window.addEventListener("resize", checkTouch);
    return () => window.removeEventListener("resize", checkTouch);
  }, []);

  useEffect(() => {
    if (isTouch) return;
    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setTimeout(() => setTrail({ x: e.clientX, y: e.clientY }), 80);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <>
      {/* Main emoji cursor */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          left: pos.x - 12,
          top: pos.y - 14,
          pointerEvents: "none",
          zIndex: 9999,
          fontSize: "24px",
          lineHeight: 1,
          userSelect: "none",
          transform: "translateZ(0)",
          transition: "left 0.02s, top 0.02s",
        }}
      >
        🍓
      </div>
      {/* Trailing dot */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          left: trail.x - 4,
          top: trail.y - 4,
          pointerEvents: "none",
          zIndex: 9998,
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "oklch(0.72 0.18 355 / 0.5)",
          userSelect: "none",
          transform: "translateZ(0)",
          transition: "left 0.1s, top 0.1s",
        }}
      />
    </>
  );
}
