import { useEffect, useState, MutableRefObject } from "react";

export type UsePageMaxHeightProps = {
  extraHeight?: number;
  wrapperRef: MutableRefObject<HTMLDivElement | null>;
  targetClassName?: string;
  position?: "top" | "bottom";
};

const defaultTargetClassName = "ant-table-thead";
const defaultPosition = "bottom";

export const usePageMaxHeight = (props: UsePageMaxHeightProps) => {
  const {
    wrapperRef,
    extraHeight = 0,
    targetClassName = defaultTargetClassName,
    position = defaultPosition,
  } = props;

  const [maxHeight, setMaxHeight] = useState<string | number>(0);
  const [refreshComputed, setRefreshComputed] = useState(false);

  const getPageScrollY = () => {
    let totalHeight = extraHeight;
    if (wrapperRef.current) {
      const targetElement = wrapperRef.current?.querySelector(
        `.${targetClassName}`
      );
      const top = Math.ceil(
        targetElement?.getBoundingClientRect()?.[position] ?? 0
      );
      totalHeight = totalHeight + top;
    }
    const bodyHeight = `calc(100vh - ${totalHeight}px)`;
    setMaxHeight(bodyHeight);
  };

  useEffect(() => {
    getPageScrollY();
  }, [wrapperRef.current, refreshComputed]);

  return { maxHeight, setRefreshComputed };
};
