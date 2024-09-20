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

export function useCanvasSize(rows: number, cols: number, solving: boolean) {
  const windowSize = useWindowSize();

  const ratioLg = 3 / 20;
  const ratioSm = 3 / 10;

  if (!windowSize) {
    return { width: 0, height: 0 };
  }

  const isSmall = windowSize.width <= 768;
  const ratio = isSmall ? ratioSm : ratioLg;

  // Calculate base canvas size
  const baseCanvasSize = solving
    ? { width: windowSize.width * ratio, height: windowSize.width * ratio }
    : {
        width: windowSize.width * ratioSm,
        height: windowSize.width * ratioSm,
      };

  // Determine whether the grid is wider (more cols) or taller (more rows)
  const aspectRatio = cols / rows;

  // Ensure cells are square by calculating the smaller of the two dimensions
  // Base size is determined by either width or height (depending on aspect ratio)
  // const canvasWidth =
  //   aspectRatio >= 1 ? baseCanvasSize : baseCanvasSize * aspectRatio;
  // const canvasHeight =
  //   aspectRatio >= 1 ? baseCanvasSize / aspectRatio : baseCanvasSize;

  // // Compute final canvas size that maintains square grid cells
  // const cellSize = Math.min(canvasWidth / cols, canvasHeight / rows);
  let aspectRatioCols = rows / cols;
  let aspectRatioRows = cols / rows;

  if (aspectRatioCols < 1) {
    let multiplier = 1.5 - aspectRatioCols;
    return {
      width: baseCanvasSize.width * Math.max(1, multiplier),
      height: baseCanvasSize.height * Math.max(1, multiplier),
    };
  }

  if (aspectRatioRows < 1) {
    let multiplier = 1.5 - aspectRatioRows;
    return {
      width: baseCanvasSize.width * Math.max(1, multiplier),
      height: baseCanvasSize.height * Math.max(1, multiplier),
    };
  }

  return baseCanvasSize;
}

// let aspectRatioCols = rows / cols;
//   let aspectRatioRows = cols / rows;

//   if (aspectRatioCols > 1) {
//     aspectRatioCols = 1;
//   }
//   if (aspectRatioRows > 1) {
//     aspectRatioRows = 1;
//   }

//   const canvasSize = {
//     width: windowSize.width * ratioSm * (2 - aspectRatioCols),
//     height: windowSize.width * ratioSm * (2 - aspectRatioRows),
//   };
