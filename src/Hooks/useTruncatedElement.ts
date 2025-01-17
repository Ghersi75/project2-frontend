// https://stackoverflow.com/a/75859314
import { useState, useLayoutEffect, MutableRefObject } from 'react'

export const useTruncatedElement = ({ ref }: { ref: MutableRefObject<HTMLElement | null>}) => {
  const [isTruncated, setIsTruncated] = useState(false);
  const [isShowingMore, setIsShowingMore] = useState(false);

  useLayoutEffect(() => {
    if (ref.current) {
      const { offsetHeight, scrollHeight } = ref.current;
  
      if (offsetHeight && scrollHeight && offsetHeight < scrollHeight) {
        setIsTruncated(true);
      } else {
        setIsTruncated(false);
      }
    }
  }, [ref]);

  const toggleIsShowingMore = () => setIsShowingMore(prev => !prev);

  return {
    isTruncated,
    isShowingMore,
    toggleIsShowingMore,
  };
};