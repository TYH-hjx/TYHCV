import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import profile from "../data/profile";

gsap.registerPlugin(ScrollTrigger);

export default function Education() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".timeline-item", { y: 50, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        defaults: { ease: "power3.out" },
      });

      tl.fromTo(".edu-label",
        { x: -120, opacity: 0 },
        { x: 0, opacity: 1, duration: 1 }
      )
      .fromTo(".edu-title",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 }, "-=0.4"
      )
      .fromTo(".edu-desc",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 }, "-=0.3"
      )
      .to(".timeline-item", {
        y: 0, opacity: 1, duration: 0.7, stagger: 0.15,
      }, "-=0.3");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section section-alt" id="education" ref={sectionRef}>
      <div className="section-inner">
        <p className="section-label edu-label">Education</p>
        <h2 className="section-title edu-title">教育经历</h2>
        <p className="section-desc edu-desc">在校学习历程，每一步都在为未来积蓄力量。</p>
        <div className="timeline">
          {profile.education.map((e, i) => (
            <div className="timeline-item" key={i}>
              <div className="timeline-date">{e.date}</div>
              <div className="timeline-title">{e.title}</div>
              <div className="timeline-sub">{e.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
