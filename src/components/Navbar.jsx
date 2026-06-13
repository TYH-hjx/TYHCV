import { useState, useEffect, useRef } from "react";
import profile from "../data/profile";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const tickingRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!tickingRef.current) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          tickingRef.current = false;
        });
        tickingRef.current = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { href: "#about", label: "关于" },
    { href: "#skills", label: "技能" },
    { href: "#learning", label: "学习" },
    { href: "#work", label: "工作" },
    { href: "#education", label: "经历" },
    { href: "#contact", label: "联系" },
  ];

  return (
    <nav className={"navbar" + (scrolled ? " scrolled" : "")}>
      <div className="nav-inner">
        <div className="nav-logo">{profile.name}</div>
        <ul className="nav-links">
          {links.map(l => (
            <li key={l.href}><a href={l.href}>{l.label}</a></li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
