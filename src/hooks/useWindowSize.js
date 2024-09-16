import { useEffect, useState } from "react";

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    isMobile: window.innerWidth <= 767,
    isTablet: window.innerWidth >= 768 && window.innerWidth <= 1024,
    isDesktop: window.innerWidth >= 1025,
  });

  const handleWindowSizeChange = () => {
    const newWidth = window.innerWidth;
    if (
      (newWidth <= 767 && !windowSize.isMobile) ||
      (newWidth >= 768 && newWidth <= 1024 && !windowSize.isTablet) ||
      (newWidth >= 1025 && !windowSize.isDesktop)
    ) {
      setWindowSize({
        width: newWidth,
        isMobile: newWidth <= 767,
        isTablet: newWidth >= 768 && newWidth <= 1024,
        isDesktop: newWidth >= 1025,
      });
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);

    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, [windowSize]);

  return windowSize;
};
