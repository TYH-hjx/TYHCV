import { useEffect, useRef, useCallback } from "react";

export default function SplashCursor({
  color = "#6c5ce7",
  count = 8,
  radius = 4,
  friction = 0.85,
  sizeVariance = 2,
}) {
  const canvasRef = useRef(null);
  const pointsRef = useRef([]);
  const mouseRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef(null);

  const addPoint = useCallback((x, y) => {
    const pt = {
      x, y,
      vx: (Math.random() - 0.5) * 3,
      vy: (Math.random() - 0.5) * 3,
      life: 1,
      decay: 0.015 + Math.random() * 0.025,
      radius: radius + (Math.random() - 0.5) * sizeVariance,
    };
    pointsRef.current.push(pt);
    if (pointsRef.current.length > 200) pointsRef.current.shift();
  }, [radius, sizeVariance]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      for (let i = 0; i < count; i++) {
        addPoint(e.clientX + (Math.random() - 0.5) * 20, e.clientY + (Math.random() - 0.5) * 20);
      }
    };

    const handleClick = (e) => {
      for (let i = 0; i < count * 3; i++) {
        addPoint(
          e.clientX + (Math.random() - 0.5) * 60,
          e.clientY + (Math.random() - 0.5) * 60
        );
      }
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("click", handleClick);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const pts = pointsRef.current;

      for (let i = pts.length - 1; i >= 0; i--) {
        const p = pts[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= friction;
        p.vy *= friction;
        p.life -= p.decay;

        if (p.life <= 0) {
          pts.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * p.life, 0, Math.PI * 2);
        ctx.fillStyle = color + Math.floor(p.life * 200).toString(16).padStart(2, "0");
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("resize", resize);
    };
  }, [color, count, friction, addPoint]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        pointerEvents: "none",
      }}
    />
  );
}
