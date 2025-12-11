import { useEffect } from "react";
import About from "../sections/about";
import Hero from "../sections/hero";
import Projects from "../sections/projects";
import Skills from "../sections/skills";
import Contact from "../sections/contact";
import { useRouter } from "next/navigation";
import Experience from "../sections/experience";

const Root = () => {
  return (
    <>
      <Hero />
      <Projects />
      <Skills />
      <About />
      <Experience />
      <Contact />
    </>
  );
};

export default Root;
