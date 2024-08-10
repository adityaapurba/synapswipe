"use client";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { isMobileAtom } from "~/store/mesure";

export default function useMobile() {
  const setIsMobile = useSetRecoilState(isMobileAtom);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setIsMobile]);
}
