"use client";

import clsx from "clsx";
import style from "./style.module.css";
import { useCallback, useEffect, useRef, useState } from "react";

export default function SounWavesEffect() {
  const [bars, setBars] = useState(0);

  const handleContainerRef = useCallback((el: HTMLDivElement | null) => {
    if (!el) return;
    setBars(el.clientWidth / 8);
  }, []);

  const handleBarRef = useCallback((el: HTMLDivElement | null) => {
    if (!el) return;
    el.style.animationDuration = `${Math.random() * (0.7 - 0.2) + 0.4}s`;
  }, []);

  return (
    <div ref={handleContainerRef} className={clsx(style["sound-wave"])}>
      {Array.from({ length: bars }).map((_, idx) => (
        <div ref={handleBarRef} key={idx} className={clsx(style["bar"])} />
      ))}
    </div>
  );
}
