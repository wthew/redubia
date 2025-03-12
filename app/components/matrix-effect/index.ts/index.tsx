"use client";

import React, { useEffect, useRef } from "react";

const renderMatrix = (canvas: HTMLCanvasElement, color?: string) => {
  const context = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const fontSize = 16;
  const columns = canvas.width / fontSize;

  const rainDrops: number[] = [];

  for (let x = 0; x < columns; x++) {
    rainDrops[x] = 1;
  }

  const render = () => {
    if (!context) return;

    context.fillStyle = "rgba(0, 0, 0, 0.1)";
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = color ? color : "#0f0";
    context.font = fontSize + "px monospace";

    for (let i = 0; i < rainDrops.length; i++) {
      const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
      context.fillText(text, i * fontSize, rainDrops[i] * fontSize);

      if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        rainDrops[i] = 0;
      }
      rainDrops[i]++;
    }
  };
  return render;
};

const MatrixRainingLetters = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!ref.current) return;

    const render = renderMatrix(ref.current);
    const intervalId = setInterval(render, 30);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <canvas className="w-full h-full" ref={ref} />

  );
};

export default MatrixRainingLetters;
