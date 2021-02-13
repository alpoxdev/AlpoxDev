import { useCallback, useEffect, useMemo, useState } from 'react';

export enum MouseSelectorType {
  id = 'id',
  class = 'class',
}

export interface UseMouseHover {
  hover: boolean;
  onMouseOver: () => void;
  onMouseOut: () => void;
  onMouseHover: () => void;
}

export const useMouseCursor = (
  mouseSelectorType: MouseSelectorType,
  mouseSelector: string,
): boolean => {
  const isWindow = useMemo(() => typeof window !== undefined, [typeof window]);

  const onMouseMove = useCallback((): void => {
    if (!isWindow) return;

    let selectorType = '';
    if (mouseSelectorType === MouseSelectorType.id) selectorType = '#';
    if (mouseSelectorType === MouseSelectorType.class) selectorType = '.';

    window.addEventListener('mousemove', (e) => {
      const cursor: HTMLElement = document.querySelector(selectorType + mouseSelector);
      cursor.style.left = `${e.pageX}px`;
      cursor.style.top = `${e.pageY}px`;
    });
  }, [isWindow]);

  useEffect(() => {
    onMouseMove();
  }, [isWindow, onMouseMove]);

  return true;
};

export const useMouseHover = (): UseMouseHover => {
  const [hover, setHover] = useState<boolean>(false);

  const onMouseHover = useCallback(() => {
    setHover((state: boolean) => !state);
  }, [setHover]);

  return {
    hover,
    onMouseOver: onMouseHover,
    onMouseOut: onMouseHover,
    onMouseHover,
  };
};
