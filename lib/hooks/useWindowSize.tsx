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
  const canvasSize = {
    width: windowSize === undefined ? 0 : windowSize.width / 3,
    height: windowSize === undefined ? 0 : windowSize.width / 3,
  };

  return canvasSize;
}
