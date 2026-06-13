import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import profile from "../data/profile";
import BorderGlow from "./reactbits/BorderGlow";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        defaults: { ease: "power3.out" },
      });

      tl.fromTo(".about-label",
        { x: -120, opacity: 0 },
        { x: 0, opacity: 1, duration: 1 }
      )
      .fromTo(".about-title",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 }, "-=0.4"
      )
      .fromTo(".about-desc",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 }, "-=0.3"
      )
      .fromTo(".about-info",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9 }, "-=0.2"
      )
      .fromTo(".stat-card",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.12 }, "-=0.5"
      )
      .fromTo(".about-image-wrap",
        { clipPath: "inset(0 100% 0 0)" },
        { clipPath: "inset(0 0% 0 0)", duration: 1.2, ease: "power4.out" }, "-=0.6"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section section-alt" id="about" ref={sectionRef}>
      <div className="section-inner">
        <p className="section-label about-label">About</p>
        <h2 className="section-title about-title">关于我</h2>
        <p className="section-desc about-desc">脚踏实地，稳步前行，用数据创造价值。</p>
        <div className="about-grid">
          <div className="about-info">
            <h3>{profile.school}</h3>
            <p>{profile.major} · {profile.grade}在读</p>
            <p>{profile.bio}</p>
            <div className="about-stats">
              {profile.stats.map((s, i) => (
                <div className="stat-card" key={i}>
                  <div className="stat-number">{s.number}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="about-image-wrapper">
            <div className="about-image-wrap">
              <div className="about-image">
                <div className="about-image-inner">
                  <span>🧑‍💻</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
