import { useEffect, useState, MutableRefObject } from "react";

export type UseModalMaxHeightProps = {
  extraHeight?: number;
  wrapperRef: MutableRefObject<HTMLDivElement | null>;
  targetClassName?: string;
  position?: "top" | "bottom";
};

export const useModalMaxHeight = (props: UseModalMaxHeightProps) => {
  const {
    wrapperRef,
    extraHeight = 0,
    targetClassName,
    position = "top",
  } = props;

  const [maxHeight, setMaxHeight] = useState<string | number>(0);
  const [refreshComputed, setRefreshComputed] = useState(false);

  const getModalScrollY = () => {
    if (wrapperRef.current) {
      let bodyElement = wrapperRef.current?.parentElement;
      const contentElement = bodyElement?.parentElement;
      let totalHeight = extraHeight;
      if (contentElement) {
        const headerElement = document.querySelector(".ant-modal-header");
        const footerElement = document.querySelector(".ant-modal-footer");
        if (targetClassName) {
          bodyElement = contentElement?.querySelector(`.${targetClassName}`);
        }
        const bodyTop = bodyElement?.getBoundingClientRect()?.[position] ?? 0;
        const headerTop = headerElement?.getBoundingClientRect()?.top ?? 0;
        const footerHeight =
          footerElement?.getBoundingClientRect()?.height ?? 0;
        totalHeight = totalHeight + footerHeight + headerTop + bodyTop;
      }
      const bodyHeight = `calc(100vh - ${totalHeight}px)`;
      setMaxHeight(bodyHeight);
    }
  };

  useEffect(() => {
    getModalScrollY();
  }, [wrapperRef.current, refreshComputed]);

  return { maxHeight, setRefreshComputed };
};
