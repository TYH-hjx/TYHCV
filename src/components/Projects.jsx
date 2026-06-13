import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import profile from "../data/profile";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".project-card", { y: 60, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        defaults: { ease: "power3.out" },
      });

      tl.fromTo(".projects-label",
        { clipPath: "inset(0 100% 0 0)", x: 80 },
        { clipPath: "inset(0 0% 0 0)", x: 0, duration: 1 }
      )
      .fromTo(".projects-title",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 }, "-=0.4"
      )
      .fromTo(".projects-desc",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 }, "-=0.3"
      )
      .to(".project-card", {
        y: 0, opacity: 1, duration: 0.9, stagger: 0.12,
      }, "-=0.3");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section section-alt" id="learning" ref={sectionRef}>
      <div className="section-inner">
        <p className="section-label projects-label">Learning</p>
        <h2 className="section-title projects-title">学习规划</h2>
        <p className="section-desc projects-desc">在校期间的学习方向与目标，正在持续努力中。</p>
        <div className="projects-grid">
          {profile.learningPlan.map((p, i) => (
            <div className="project-card" key={i}>
              <div className="project-image" style={{ background: p.gradient }}>
                <span>{p.icon}</span>
              </div>
              <div className="project-body">
                <div className="project-tags">
                  {p.tags.map((t, j) => (
                    <span className="project-tag" key={j}>{t}</span>
                  ))}
                </div>
                <h3 className="project-title">{p.title}</h3>
                <p className="project-desc">{p.desc}</p>
                <div className="project-links">
                  <span className="project-link">{p.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
