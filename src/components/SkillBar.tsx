"use client";

import { useEffect, useRef, useState } from "react";

interface SkillBarProps {
  name: string;
  value: number;
}

export default function SkillBar({ name, value }: SkillBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="skill-bar" ref={ref}>
      <div className="skill-header">
        <span>{name}</span>
        <span>{value}%</span>
      </div>
      <div className="skill-progress">
        <div
          className="skill-fill"
          style={{
            width: isVisible ? `${value}%` : "0%",
            transition: "width 1.5s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />
      </div>
    </div>
  );
}