import { OrbitingCircles } from "./OrbitingCircles";
import { useEffect, useMemo, useState } from "react";

const SKILLS = [
  "javascript",
  "python",
  "next",
  "typescript",
  "nodejs",
  "Express",
  "threejs",
  "tailwindcss",
  "css3",
  "git",
  "html5",
  "react",
  "stripe",
  "mongo",
  "redis",
  "razorpay",
];

export function FrameWorks() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const updateLayout = () => setIsMobile(mediaQuery.matches);

    updateLayout();
    mediaQuery.addEventListener("change", updateLayout);

    return () => {
      mediaQuery.removeEventListener("change", updateLayout);
    };
  }, []);

  const reverseSkills = useMemo(() => [...SKILLS].reverse(), []);

  return (
    <div className="relative flex h-[15rem] w-full flex-col items-center justify-center">
      <OrbitingCircles iconSize={isMobile ? 28 : 40} radius={isMobile ? 90 : 200}>
        {SKILLS.map((skill, index) => (
          <Icon key={index} src={`assets/logos/${skill}.svg`} />
        ))}
      </OrbitingCircles>
      <OrbitingCircles
        iconSize={isMobile ? 18 : 25}
        radius={isMobile ? 58 : 120}
        reverse
        speed={2}
      >
        {reverseSkills.map((skill, index) => (
          <Icon key={index} src={`assets/logos/${skill}.svg`} />
        ))}
      </OrbitingCircles>
    </div>
  );
}

const Icon = ({ src }) => (
  <img src={src} className="duration-200 rounded-sm hover:scale-110" alt="" aria-hidden="true" />
);