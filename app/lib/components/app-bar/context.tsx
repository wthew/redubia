// context/AppBarContext.js
"use client";

import { Card } from "@/app/lib/components/ui/card";
import { createContext, useContext, useState, useEffect, useRef } from "react";

type AppBarContextValue = {
  visible: boolean;
  updateContainerRef: (ref: HTMLDivElement | null) => void;
  appBarHeight: number;
  appBarRef: React.RefObject<HTMLElement | null>;
};

const AppBarContext = createContext({} as AppBarContextValue);
export const AppBarProvider: React.FC<React.PropsWithChildren> = (props) => {
  const [visible, setVisible] = useState(true);
  const [appBarHeight, setAppBarHeight] = useState(0);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const appBarRef = useRef<HTMLElement | null>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    console.log("effect");
    if (!container) return;

    const handleScroll = () => {
      console.log("scroll");
      const currentScrollY = container.scrollTop;

      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setVisible(false);
        console.log("false");
      } else {
        setVisible(true);
        console.log("true");
      }

      lastScrollY.current = currentScrollY;
    };

    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [container]);

  useEffect(() => {
    if (appBarRef.current) {
      setAppBarHeight(appBarRef.current?.offsetHeight); // Calcula a altura
    }
  }, [appBarRef.current]);

  const updateContainerRef = (ref: HTMLDivElement | null) => {
    setContainer(ref);
  };

  return (
    <AppBarContext.Provider
      value={{ visible, updateContainerRef, appBarHeight, appBarRef }}
    >
      {props.children}
    </AppBarContext.Provider>
  );
};

export function useAppBar() {
  return useContext(AppBarContext);
}

export const HandlerAppBarHides: React.FC<React.PropsWithChildren> = (
  props
) => {
  const { updateContainerRef, appBarHeight, visible } = useAppBar();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerHeight, setContainerHeight] = useState("1vh");

  useEffect(() => {
    const updateHeight = () => {
      const viewportHeight = window.innerHeight; // Calcula a altura visível atual
      setContainerHeight(`${viewportHeight * 0.01}px`);
    };

    window.addEventListener("resize", updateHeight);
    updateHeight(); // Calcula a altura inicial

    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  return (
    <div className="flex flex-col w-screen z-10 justify-center items-center min-h-dvh h-auto">
      <Card
        className={`border-0 md:border-1 rounded-none h-full md:rounded-lg w-full max-w-5xl`}
        ref={(el) => {
          if (el && !containerRef.current) {
            updateContainerRef(el);
            containerRef.current = el;
          }
        }}
      >
        {props.children}
      </Card>
    </div>
  );
};
