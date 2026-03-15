import { useEffect, useState } from "react";

export function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(pct);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: `${progress}%`,
        height: "3px",
        zIndex: 50,
        pointerEvents: "none",
        background:
          "linear-gradient(90deg, oklch(0.65 0.18 355), oklch(0.60 0.16 285), oklch(0.58 0.16 160), oklch(0.72 0.15 90))",
        transition: "width 0.1s linear",
      }}
    />
  );
}
