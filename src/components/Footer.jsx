import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import profile from "../data/profile";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        defaults: { ease: "power3.out" },
      });

      tl.fromTo(".footer-label",
        { x: -120, opacity: 0 },
        { x: 0, opacity: 1, duration: 1 }
      )
      .fromTo(".footer-title",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 }, "-=0.4"
      )
      .fromTo(".footer-desc",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 }, "-=0.3"
      )
      .fromTo(".footer-contact-row > *",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 }, "-=0.3"
      )
      .fromTo(".footer-buttons > *",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 }, "-=0.2"
      )
      .fromTo(".footer-copy",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, "-=0.2"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer className="footer-full" ref={sectionRef}>
      <div className="footer-full-inner">
        <p className="footer-label">Let&apos;s Connect</p>
        <h2 className="footer-title">期待与你的合作</h2>
        <p className="footer-desc">
          脚踏实地，稳步前行。如果你对我的技能感兴趣，或有实习与合作机会，欢迎随时联系。
        </p>
        <div className="footer-contact-row">
          <div className="footer-contact-item">
            <span className="footer-contact-icon">📧</span>
            <span>{profile.contact.email}</span>
          </div>
          <div className="footer-contact-item">
            <span className="footer-contact-icon">📱</span>
            <span>{profile.contact.phone}</span>
          </div>
          <div className="footer-contact-item">
            <span className="footer-contact-icon">📍</span>
            <span>{profile.contact.location}</span>
          </div>
        </div>
        <div className="footer-buttons">
          <a href={"mailto:" + profile.contact.email} className="btn btn-primary">发送邮件</a>
          <a href={"https://" + profile.contact.github} target="_blank" rel="noreferrer" className="btn btn-outline">GitHub 主页</a>
        </div>
        <p className="footer-copy">
          &copy; 2026 <span>{profile.name}</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
