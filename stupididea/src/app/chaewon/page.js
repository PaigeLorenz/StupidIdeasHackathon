"use client";

import { useEffect, useState } from "react";

export default function ChaewonCongrats() {
  const [started, setStarted] = useState(false);

  useEffect(() => {
    // Set up confetti
    const canvas = document.createElement("canvas");
    canvas.id = "confetti-canvas";
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = 9999;
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    const particles = Array.from({ length: 150 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 6 + 4,
      dx: Math.random() - 0.5,
      dy: Math.random() * 3 + 2,
      color: `hsl(${Math.random() * 360}, 70%, 80%)`,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
        ctx.fillStyle = p.color;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.y > window.innerHeight) p.y = 0;
      }
      requestAnimationFrame(animate);
    };

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    animate();

    // Try playing audio
    const audio = new Audio("/chaewon.mp3");
    audio.play().catch(() => {
      // If autoplay fails, wait for user interaction
      const unlockAudio = () => {
        audio.play();
        document.removeEventListener("click", unlockAudio);
      };
      document.addEventListener("click", unlockAudio);
    });

    setStarted(true);

    return () => {
      document.body.removeChild(canvas);
    };
  }, []);

  return (
    <div
      className="flex items-center justify-center h-screen text-white text-center"
      style={{
        backgroundImage: "url('/chaewon_bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        zIndex: 1,
      }}
    >
      {started && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 px-10 py-5 rounded-lg shadow-lg z-50 backdrop-blur-sm bg-white/60 text-black font-extrabold text-4xl tracking-widest uppercase">
          🎉 Congratulations! You Have Great Taste! 😌
        </div>
      )}
    </div>
  );
}