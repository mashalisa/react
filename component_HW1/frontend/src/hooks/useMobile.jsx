import { useState, useEffect } from "react";

const useMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 576);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 576);
    };

    window.addEventListener("resize", handleResize);


    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { isMobile, setIsMobile };
};

export default useMobile;