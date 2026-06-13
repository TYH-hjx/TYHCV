import { lazy, Suspense } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "./components/Navbar";
import Lightfall from "./components/reactbits/Lightfall";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import WorkExperience from "./components/WorkExperience";

gsap.registerPlugin(ScrollTrigger);

const Education = lazy(() => import("./components/Education"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("./components/Footer"));

const fallbackStyle = { minHeight: 100, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)", fontSize: "0.85rem" };

export default function App() {
  return (
    <>
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <Lightfall paused={false} dpr={1} />
      </div>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <WorkExperience />
      <Suspense fallback={<div style={fallbackStyle} />}>
        <Education />
      </Suspense>
      <Suspense fallback={<div style={fallbackStyle} />}>
        <Contact />
      </Suspense>
      <Suspense fallback={<div style={fallbackStyle} />}>
        <Footer />
      </Suspense>
    </>
  );
}
