import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import profile from "../data/profile";
import BorderGlow from "./reactbits/BorderGlow";

gsap.registerPlugin(ScrollTrigger);

export default function WorkExperience() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".work-card", { y: 50, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        defaults: { ease: "power3.out" },
      });

      tl.fromTo(".work-label",
        { x: -120, opacity: 0 },
        { x: 0, opacity: 1, duration: 1 }
      )
      .fromTo(".work-title",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 }, "-=0.4"
      )
      .fromTo(".work-desc-text",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 }, "-=0.3"
      )
      .to(".work-card", {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.2,
      }, "-=0.3");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section" id="work" ref={sectionRef}>
      <div className="section-inner">
        <p className="section-label work-label">Work</p>
        <h2 className="section-title work-title">工作经历</h2>
        <p className="section-desc work-desc-text">在社会实践中锻炼沟通能力与服务意识。</p>
        <div className="work-grid">
          {profile.workExperience.map((w, i) => (
            <BorderGlow
              key={i}
              backgroundColor="#11111f"
              borderRadius={14}
              glowColor="262 83 66"
              glowIntensity={0.8}
              glowRadius={20}
              colors={["#6c5ce7", "#a29bfe", "#e056a0"]}
              fillOpacity={0.35}
            >
              <div className="work-card" style={{ transitionDelay: `${0.15 * i}s` }}>
                <div className="work-date">{w.date}</div>
                <div className="work-content">
                  <h3 className="work-role">{w.role}</h3>
                  <p className="work-company">{w.company}</p>
                  <p className="work-desc">{w.desc}</p>
                </div>
              </div>
            </BorderGlow>
          ))}
        </div>
      </div>
    </section>
  );
}
