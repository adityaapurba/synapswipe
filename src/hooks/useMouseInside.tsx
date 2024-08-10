import { useEffect, useState, type RefObject } from "react";

function useMouseInside(
  ref: RefObject<HTMLElement>,
  onEnter?: () => void,
  onLeave?: () => void,
) {
  const [isInside, setIsInside] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseEnter = () => {
      setIsInside(true);
      if (onEnter) onEnter();
    };

    const handleMouseLeave = () => {
      setIsInside(false);
      if (onLeave) onLeave();
    };

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [ref, onEnter, onLeave]);

  return isInside;
}

export default useMouseInside;
