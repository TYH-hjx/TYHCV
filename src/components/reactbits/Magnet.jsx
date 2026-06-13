import { useState, useRef, useCallback, useEffect } from "react";

export default function Magnet({
  children,
  padding = 100,
  disabled = false,
  magnetStrength = 15,
  magnetDirection = "opposite",
  transition = "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
}) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (disabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;
    const dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const maxDist = Math.max(rect.width / 2, rect.height / 2) + padding;
    const factor = Math.min(dist / maxDist, 1);
    const dir = magnetDirection === "opposite" ? 1 : -1;
    setPosition({
      x: (deltaX / maxDist) * magnetStrength * dir * (1 - factor),
      y: (deltaY / maxDist) * magnetStrength * dir * (1 - factor),
    });
  }, [disabled, padding, magnetStrength, magnetDirection]);

  const handleMouseLeave = useCallback(() => {
    if (disabled) return;
    setPosition({ x: 0, y: 0 });
  }, [disabled]);

  useEffect(() => {
    if (!ref.current || disabled) return;
    const el = ref.current;
    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave, disabled]);

  return (
    <span
      ref={ref}
      className="magnet-wrapper"
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition,
        willChange: "transform",
      }}
    >
      {children}
    </span>
  );
}
