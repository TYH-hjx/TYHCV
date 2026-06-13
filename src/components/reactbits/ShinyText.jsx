import { useMemo } from "react";

export default function ShinyText({
  text = "",
  color = "#b5b5b5",
  shineColor = "#ffffff",
  speed = 2,
  delay = 0,
  spread = 120,
  yoyo = false,
  pauseOnHover = false,
  direction = "left",
  disabled = false,
  className = "",
}) {
  const animationStyle = useMemo(() => {
    if (disabled) return {};
    const safeSpeed = String(speed).replace(".", "-");
    const animName = `shine-${direction}-${safeSpeed}-${spread}`;
    return {
      backgroundImage: `linear-gradient(${direction === "right" ? "-" : ""}${spread}deg, ${color} 40%, ${shineColor} 50%, ${color} 60%)`,
      backgroundSize: "200% auto",
      backgroundClip: "text",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      animation: `${animName} ${speed}s linear ${delay}s ${yoyo ? "alternate" : "normal"} infinite`,
    };
  }, [disabled, direction, spread, color, shineColor, speed, delay, yoyo]);

  return <span className={"shiny-text " + className} style={animationStyle}>{text}</span>;
}
