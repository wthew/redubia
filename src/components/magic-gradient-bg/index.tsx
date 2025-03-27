"use client"; // Necessário para hooks do React

import { useState, useRef, PropsWithChildren } from 'react';

const default_colors = ["rgba(34, 211, 238, 0.15) 0%", "rgba(79, 70, 229, 0.1) 30%"]
type Props = PropsWithChildren & { className?: string, colors?: string[] }
export default function MagicGradientBackground(props: Props) {
  const { children, className, colors } = props
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    setMouseX(e.clientX - rect.left);
    setMouseY(e.clientY - rect.top);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={"h-full w-full group relative overflow-hidden rounded-3xl border border-gray-900 transition-all " + className}
    >
      {/* Camada de gradiente dinâmica */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(300px circle at ${mouseX}px ${mouseY}px, 
            ${[...(colors || default_colors), 'transparent 70%'].join(',')} `
        }}
      />

      {/* Conteúdo */}
      <div className="relative bg-black/50 backdrop-blur-sm h-full w-full">
        {children}
      </div>
    </div>
  );
}
