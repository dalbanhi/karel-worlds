import React, { createContext, useState, useContext, ReactNode } from "react";
import { SimpleKarelElementType } from "@/types/karelWorld";

interface RunningKarelContextProps {
  runningKarel: SimpleKarelElementType;
  setRunningKarel: React.Dispatch<React.SetStateAction<SimpleKarelElementType>>;
}

const RunningKarelContext = createContext<RunningKarelContextProps | undefined>(
  undefined
);

const defaultKarelState: SimpleKarelElementType = {
  x: 0,
  y: 0,
  direction: "east",
  backpack: 0,
  infiniteBackpack: false,
  type: "karel",
  count: 1,
  subtype: "karel",
};

export const RunningKarelProvider = ({ children }: { children: ReactNode }) => {
  const [runningKarel, setRunningKarel] =
    useState<SimpleKarelElementType>(defaultKarelState);

  return (
    <RunningKarelContext.Provider value={{ runningKarel, setRunningKarel }}>
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
