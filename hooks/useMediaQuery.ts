"use client";
//from https://stackoverflow.com/questions/76608501/error-usemediaquery-is-a-client-only-hook
import { useMediaQuery } from "@uidotdev/usehooks";

const useDevice = () => {
  const isSmall = useMediaQuery("only screen and (max-width : 640px)");
  const isMobile = useMediaQuery("only screen and (max-width : 820px)");

  return { isSmall, isMobile };
};

export default useDevice;
