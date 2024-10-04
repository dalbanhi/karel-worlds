"use client";
//from https://stackoverflow.com/questions/76608501/error-usemediaquery-is-a-client-only-hook
import { useMediaQuery } from "@uidotdev/usehooks";

const useDevice = () => {
  const isSmall = useMediaQuery("only screen and (max-width : 640px)");
  const isMobile = useMediaQuery("only screen and (max-width : 820px)");
  //   const isTablet = useMediaQuery(
  //     "only screen and (min-width : 768px) and (max-width : 1024px)"
  //   );
  //   const isDesktop = useMediaQuery(
  //     "only screen and (min-width : 1025px) and (max-width : 2379px)"
  //   );
  //   const isDesktopLarge = useMediaQuery("only screen and (min-width : 2380px)");

  return { isSmall, isMobile };
};

export default useDevice;
