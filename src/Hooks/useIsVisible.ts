// https://dev.to/jmalvarez/check-if-an-element-is-visible-with-react-hooks-27h8
import { useEffect, useState } from "react";

export const useIsVisible = (ref: React.MutableRefObject<HTMLElement | null>): boolean => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (ref.current == null) {
      return;
    }

    const observer = new IntersectionObserver(([entry]) =>
      setIsVisible(entry.isIntersecting)
    );

    observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return isVisible;
}