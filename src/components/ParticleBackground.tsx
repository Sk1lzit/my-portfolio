"use client";

import { useEffect, useRef } from "react";

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const LINK_DISTANCE = 140;
    let w = 0;
    let h = 0;
    let particles: any[] = [];
    const mouse = { x: -9999, y: -9999 };
    let animationId: number;

    // Определяем текущую тему
    function getTheme() {
      return document.documentElement.getAttribute("data-theme") === "light"
        ? "light"
        : "dark";
    }

    // Цвета в зависимости от темы
    function getColors() {
      const theme = getTheme();
      if (theme === "light") {
        return {
          bg: "#f5f5f7",
          particle: "124, 58, 237",
          link: "124, 58, 237",
        };
      }
      return {
        bg: "#0a0118",
        particle: "139, 92, 246",
        link: "139, 92, 246",
      };
    }

    function resize() {
      if (!canvas) return;
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      seedParticles();
    }

    function seedParticles() {
      const count = Math.min(90, Math.round((w * h) / 15000));
      const colors = getColors();
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.5 + 1,
        color: `rgba(${colors.particle}, ${Math.random() * 0.4 + 0.1})`,
      }));
    }

    function animate() {
      if (!ctx) return;
      const colors = getColors();
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const distToMouse = Math.sqrt(dx * dx + dy * dy);
        if (distToMouse < 130 && distToMouse > 0.1) {
          const force = (130 - distToMouse) / 130;
          p.x += (dx / distToMouse) * force * 2;
          p.y += (dy / distToMouse) * force * 2;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const d = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (d < LINK_DISTANCE) {
            const alpha = (1 - d / LINK_DISTANCE) * 0.25;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${colors.link}, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
      animationId = requestAnimationFrame(animate);
    }

    function handleMouse(e: MouseEvent) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }

    // Слушаем смену темы — перезапускаем частицы с новыми цветами
    const themeObserver = new MutationObserver(() => {
      const colors = getColors();
      // Перекрашиваем существующие частицы
      particles.forEach((p) => {
        p.color = `rgba(${colors.particle}, ${Math.random() * 0.4 + 0.1})`;
      });
    });

    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    resize();
    animate();

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouse);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
      themeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -10,
        pointerEvents: "none",
        display: "block",
        transition: "background 0.4s ease",
      }}
    />
  );
}