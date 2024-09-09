"use client";
import React, { createContext, useState, useContext, ReactNode } from "react";
import { worldInfoType } from "@/types/karelWorld";

interface RunningKarelContextProps {
  runningWorldInfo: worldInfoType;
  setRunningWorldInfo: React.Dispatch<React.SetStateAction<worldInfoType>>;
}

const RunningKarelContext = createContext<RunningKarelContextProps | undefined>(
  undefined
);

const defaultRunningWorldState: worldInfoType = {
  gridElements: [],
  karel: {
    x: 0,
    y: 0,
    type: "karel",
    subtype: "karel",
    count: 1,
    direction: "east",
    backpack: 0,
    infiniteBackpack: false,
  },
};

export const RunningKarelProvider = ({ children }: { children: ReactNode }) => {
  const [runningWorldInfo, setRunningWorldInfo] = useState<worldInfoType>(
    defaultRunningWorldState
  );

  console.log("Provider runningWorldInfo", runningWorldInfo);

  return (
    <RunningKarelContext.Provider
      value={{ runningWorldInfo, setRunningWorldInfo }}
    >
      {children}
    </RunningKarelContext.Provider>
  );
};

// Custom hook to use the context
export const useRunningKarelContext = () => {
  const context = useContext(RunningKarelContext);
  if (!context) {
    throw new Error(
      "useRunningKarelContext must be used within a RunningKarelProvider"
    );
  }
  return context;
};
