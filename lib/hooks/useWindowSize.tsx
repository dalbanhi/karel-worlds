"use client";
import { useState, useEffect } from "react";
import { windowSizeType } from "@/types/index";

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState<windowSizeType>();

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}

export function useCanvasSize() {
  const windowSize = useWindowSize();
  const ratioLg = 3 / 20;
  const ratioSm = 3 / 10;
  if (windowSize === undefined) {
    return { width: 0, height: 0 };
  }
  const isSmall = windowSize.width <= 768;
  const ratio = isSmall ? ratioSm : ratioLg;
  const canvasSize = {
    width: windowSize === undefined ? 0 : windowSize.width * ratio,
    height: windowSize === undefined ? 0 : windowSize.width * ratio,
  };

  return canvasSize;
}
