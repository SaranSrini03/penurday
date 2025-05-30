// components/StarfieldBackground.jsx
"use client";
import { useEffect, useRef } from "react";

export default function StarfieldBackground({  }) {
  const canvasRef = useRef(null);

  useEffect(() => {

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Create stars
    const stars = [];
    const starCount = 200;

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        speed: Math.random() * 0.5,
        opacity: Math.random() * 0.8 + 0.2
      });
    }

    // Create galaxies
    const galaxies = [];
    const galaxyCount = 3;

    for (let i = 0; i < galaxyCount; i++) {
      galaxies.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 100 + 50,
        color: `hsl(${Math.random() * 60 + 240}, 70%, 30%)`,
        opacity: Math.random() * 0.2 + 0.1
      });
    }

    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw galaxies
      galaxies.forEach(galaxy => {
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(
          galaxy.x, galaxy.y, 0,
          galaxy.x, galaxy.y, galaxy.radius
        );
        gradient.addColorStop(0, `hsla(240, 70%, 50%, ${galaxy.opacity})`);
        gradient.addColorStop(1, `hsla(240, 70%, 30%, 0)`);
        ctx.fillStyle = gradient;
        ctx.arc(galaxy.x, galaxy.y, galaxy.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      
      // Draw stars
      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
        
        // Move stars
        star.x -= star.speed;
        if (star.x < 0) {
          star.x = canvas.width;
          star.y = Math.random() * canvas.height;
        }
      });
      
      requestAnimationFrame(animate);
    };
    
    const animationFrame = requestAnimationFrame(animate);
    
    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 z-0 pointer-events-none will-change-transform"
    />
  );
}