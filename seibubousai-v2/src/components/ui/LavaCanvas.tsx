"use client";

import { useEffect, useRef } from "react";
import type { Particle } from "@/types";

const PARTICLE_COUNT = 60;
const COLORS = ["#C0392B", "#E67E22", "#F39C12", "#96281B"];

export default function LavaCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const parent = canvas.parentElement;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles: Particle[] = [];
    let animId = 0;

    function createParticle(initial = false): Particle {
      return {
        x: Math.random() * width,
        // 初期生成は画面内に散らす。再生成は下端から
        y: initial
          ? Math.random() * height
          : height + Math.random() * 120,
        radius: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: -(Math.random() * 1.5 + 0.5),
        opacity: Math.random() * 0.6 + 0.1,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        life: 0,
        maxLife: Math.random() * 200 + 100,
      };
    }

    function resize() {
      const rect = parent
        ? parent.getBoundingClientRect()
        : { width: window.innerWidth, height: window.innerHeight };
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (particles.length === 0) {
        particles = Array.from({ length: PARTICLE_COUNT }, () =>
          createParticle(true)
        );
      }
    }

    function animate() {
      ctx!.clearRect(0, 0, width, height);
      particles.forEach((p, i) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.life++;
        if (p.y < -20 || p.life > p.maxLife) {
          particles[i] = createParticle();
          return;
        }
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx!.fillStyle = p.color;
        ctx!.globalAlpha = p.opacity * (1 - p.life / p.maxLife);
        ctx!.fill();
      });
      ctx!.globalAlpha = 1;
      animId = requestAnimationFrame(animate);
    }

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) return;

    resize();
    animate();

    const ro =
      parent && "ResizeObserver" in window
        ? new ResizeObserver(() => resize())
        : null;
    if (ro && parent) ro.observe(parent);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      ro?.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 z-0 h-full w-full"
      style={{
        background:
          "radial-gradient(ellipse at bottom, rgba(192,57,43,0.18), transparent 60%)",
      }}
    />
  );
}
