import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import profile from "../data/profile";
import Aurora from "./reactbits/Aurora";
import ShinyText from "./reactbits/ShinyText";
import Magnet from "./reactbits/Magnet";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef(null);
  const tlRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tlRef.current = tl;

      // Initial hidden state
      gsap.set(".hero-greeting, .hero-name-wrap, .hero-divider, .hero-title, .hero-bio, .hero-buttons > *", {
        opacity: 0,
        y: 40,
      });
      gsap.set(".hero-visual-wrap", { clipPath: "inset(0 0 0 100%)", opacity: 0 });
      gsap.set(".hero-scroll", { opacity: 0 });

      tl.to(".hero-greeting", { opacity: 1, y: 0, duration: 0.8 }, 0.2)
        .to(".hero-name-wrap", { opacity: 1, y: 0, duration: 0.6 }, 0.5)
        .to(".hero-name-inner", { y: "0%", duration: 1.4, ease: "power4.out" }, 0.5)
        .to(".hero-divider", { opacity: 1, y: 0, scaleX: 1, duration: 1, ease: "power3.out" }, 1.2)
        .to(".hero-title", { opacity: 1, y: 0, duration: 0.8 }, 1.5)
        .to(".hero-bio", { opacity: 1, y: 0, duration: 0.8 }, 1.8)
        .to(".hero-buttons > *", { opacity: 1, y: 0, duration: 0.6, stagger: 0.15 }, 2.1)
        .to(".hero-visual-wrap", { clipPath: "inset(0 0 0 0%)", opacity: 1, duration: 1.2, ease: "power4.out" }, 0.8)
        .to(".hero-scroll", { opacity: 1, duration: 1 }, 2.8);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" ref={sectionRef}>
      <div className="hero-bg-grid" />
      <Aurora
        colorStops={["#2d1b69", "#4a2d8f", "#1a0533"]}
        speed={0.5}
        blend={0.5}
        amplitude={0.6}
      />
      <div className="hero-body">
        <div className="hero-text">
          <p className="hero-greeting">{profile.greeting}</p>
          <div className="hero-name-wrap">
            <h1 className="hero-name-inner">
              <ShinyText text={profile.name} color="#a29bfe" shineColor="#e056a0" speed={3} direction="left" />
            </h1>
          </div>
          <div className="hero-divider" />
          <p className="hero-title">{profile.title}</p>
          <p className="hero-bio">{profile.bio}</p>
          <div className="hero-buttons">
            <Magnet magnetStrength={6}>
              <a href="#learning" className="btn btn-primary">学习规划<span className="btn-arrow">→</span></a>
            </Magnet>
            <Magnet magnetStrength={6}>
              <a href="#contact" className="btn btn-outline">联系我</a>
            </Magnet>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-visual-wrap">
            <div className="hero-avatar">
              <span>🧑‍💻</span>
            </div>
          </div>
        </div>
      </div>
      <div className="hero-scroll">
        <span>Scroll</span>
        <div className="hero-scroll-line"></div>
      </div>
    </section>
  );
}
