import { useRef, useEffect, useCallback } from 'react';

const useScrollBottom = (pending, getData, duration = 1, delay = 0) => {
  const element = useRef();

  const onScroll = useCallback(([entry])=>{
    if(entry.isIntersecting){
      // console.log('마지막 element');
      // getData && getData();
    }
  },[pending, delay, duration]);

  useEffect(() => {
    let observer;

    if (element?.current) {
      observer = new IntersectionObserver(onScroll, { threshold: [0, 1] });
      observer.observe(element.current);
    }

    return () => observer && observer.disconnect();
  }, [onScroll]);

  return {
    ref: element,
  };
}

export default useScrollBottom;