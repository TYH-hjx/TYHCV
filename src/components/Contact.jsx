import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import profile from "../data/profile";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef(null);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".contact-item, .contact-form, .contact-intro", { y: 40, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        defaults: { ease: "power3.out" },
      });

      tl.fromTo(".contact-label",
        { x: -120, opacity: 0 },
        { x: 0, opacity: 1, duration: 1 }
      )
      .fromTo(".contact-title",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 }, "-=0.4"
      )
      .fromTo(".contact-desc",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 }, "-=0.3"
      )
      .to(".contact-intro", { y: 0, opacity: 1, duration: 0.8 }, "-=0.3")
      .to(".contact-item", { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 }, "-=0.4")
      .to(".contact-form", { y: 0, opacity: 1, duration: 0.8 }, "-=0.3");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => { setSent(false); e.target.reset(); }, 3000);
  };

  return (
    <section className="section section-alt" id="contact" ref={sectionRef}>
      <div className="section-inner">
        <p className="section-label contact-label">Contact</p>
        <h2 className="section-title contact-title">联系我</h2>
        <p className="section-desc contact-desc">有学习交流或合作想法？欢迎联系我！</p>
        <div className="contact-grid">
          <div className="contact-info">
            <h3 className="contact-intro">期待与你的交流</h3>
            <p className="contact-intro">无论你是想交流学习心得、探讨技术问题，还是提供实习机会，我都会很高兴收到你的消息。</p>
            <div className="contact-item"><div className="contact-icon">📧</div><span>{profile.contact.email}</span></div>
            <div className="contact-item"><div className="contact-icon">📱</div><span>{profile.contact.phone}</span></div>
            <div className="contact-item"><div className="contact-icon">📍</div><span>{profile.contact.location}</span></div>
            <div className="contact-item"><div className="contact-icon">🐙</div><span><a href={"https://"+profile.contact.github} target="_blank" rel="noreferrer" style={{color:"var(--accent-light)",textDecoration:"none"}}>{profile.contact.github}</a></span></div>
            <div className="contact-item"><div className="contact-icon">🏫</div><span>{profile.contact.school}</span></div>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group"><input type="text" placeholder="你的名字" required /></div>
            <div className="form-group"><input type="email" placeholder="你的邮箱" required /></div>
            <div className="form-group"><input type="text" placeholder="主题" /></div>
            <div className="form-group"><textarea placeholder="你的消息..." required></textarea></div>
            <button type="submit" className="btn btn-primary" style={{ background: sent ? "#00b894" : "" }}>{sent ? "✅ 发送成功！" : "发送消息 ✈️"}</button>
          </form>
        </div>
      </div>
    </section>
  );
}
