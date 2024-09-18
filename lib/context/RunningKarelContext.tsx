"use client";
import React, { createContext, useState, useContext, ReactNode } from "react";
import { worldInfoType } from "@/types/karelWorld";

interface RunningKarelContextProps {
  runningWorldInfo: worldInfoType;
  setRunningWorldInfo: React.Dispatch<React.SetStateAction<worldInfoType>>;
}

// Create the context with the correct typing
const RunningKarelContext = createContext<RunningKarelContextProps | undefined>(
  undefined
);

// Default world state
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

// RunningKarelProvider to manage and provide context
export const RunningKarelProvider = ({
  children,
  value,
}: {
  children: ReactNode;
  value?: RunningKarelContextProps; // Optional to support internal state or passed-in state
}) => {
  const [runningWorldInfo, setRunningWorldInfo] = useState<worldInfoType>(
    value?.runningWorldInfo || defaultRunningWorldState
  );

  const providerValue = value || { runningWorldInfo, setRunningWorldInfo };

  return (
    <RunningKarelContext.Provider value={providerValue}>
      {children}
    </RunningKarelContext.Provider>
  );
};

// Custom hook to access the context
export const useRunningKarelContext = (): RunningKarelContextProps => {
  const context = useContext(RunningKarelContext);
  if (!context) {
    throw new Error(
      "useRunningKarelContext must be used within a RunningKarelProvider"
    );
  }
  return context;
};
