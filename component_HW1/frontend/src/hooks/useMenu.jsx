import { useState, useEffect } from "react";

const useMenu = () => {
  const [menuMobile, setMenuMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setMenuMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);


    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { menuMobile, setMenuMobile };
};

export default useMenu;