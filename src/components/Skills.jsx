import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import profile from "../data/profile";
import BorderGlow from "./reactbits/BorderGlow";

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".skill-category", { y: 60, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
          onEnter: () => {
            // Animate skill bars when section enters viewport
            setTimeout(() => {
              document.querySelectorAll(".skill-progress").forEach((bar) => {
                bar.style.width = bar.getAttribute("data-width") + "%";
              });
            }, 600);
          },
        },
        defaults: { ease: "power3.out" },
      });

      tl.fromTo(".skills-label",
        { clipPath: "inset(0 100% 0 0)", x: 80 },
        { clipPath: "inset(0 0% 0 0)", x: 0, duration: 1 }
      )
      .fromTo(".skills-title",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 }, "-=0.4"
      )
      .fromTo(".skills-desc",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 }, "-=0.3"
      )
      .to(".skill-category", {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.15,
      }, "-=0.3");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section section-alt" id="skills" ref={sectionRef}>
      <div className="section-inner">
        <p className="section-label skills-label">Skills</p>
        <h2 className="section-title skills-title">专业技能</h2>
        <p className="section-desc skills-desc">踏实学习，稳步提升，在实践中不断积累。</p>
        <div className="skills-grid">
          {profile.skills.map((cat, ci) => (
            <BorderGlow
              key={ci}
              backgroundColor="#11111f"
              borderRadius={14}
              glowColor="262 83 66"
              glowIntensity={0.8}
              glowRadius={20}
              colors={["#6c5ce7", "#a29bfe", "#e056a0"]}
              fillOpacity={0.35}
            >
              <div className="skill-category">
                <div className="skill-category-header">
                  <div className="skill-icon">{cat.icon}</div>
                  <h3>{cat.category}</h3>
                </div>
                {cat.items.map((item, ii) => (
                  <div className="skill-item" key={ii}>
                    <div className="skill-name-row">
                      <span className="skill-name">{item.name}</span>
                      <span className="skill-percent">{item.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <div className="skill-progress" data-width={item.level}></div>
                    </div>
                  </div>
                ))}
              </div>
            </BorderGlow>
          ))}
        </div>
      </div>
    </section>
  );
}
