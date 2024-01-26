import { useEffect, useState } from "react";
import { breakpoints } from "@/utils/constants";

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        // @ts-ignore
        width: window.innerWidth,
        // @ts-ignore
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowSize.width
    ? windowSize.width <= breakpoints.mediaTablet
    : null;
  const isTablet = windowSize.width
    ? windowSize.width > breakpoints.mediaTablet &&
      windowSize.width <= breakpoints.mediaLaptop
    : null;
  const isLaptop = windowSize.width
    ? windowSize.width > breakpoints.mediaLaptop &&
      windowSize.width <= breakpoints.mediaMd
    : null;
  const isDesktop = windowSize.width
    ? windowSize.width > breakpoints.mediaMd
    : null;

  return { isMobile, isTablet, isLaptop, isDesktop };
};

export default useWindowSize;
