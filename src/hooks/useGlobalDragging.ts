import { useEffect, useState } from "react";
import dragDropManager from "../singletons/drag-drop-manager";

export default function useGlobalDragging() {
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const removeDragStartListener = dragDropManager.monitor.addEventListener(
      "dragstart",
      () => setIsDragging(true),
    );
    const removeDragEndListener = dragDropManager.monitor.addEventListener(
      "dragend",
      () => setIsDragging(false),
    );

    return () => {
      removeDragStartListener();
      removeDragEndListener();
    };
  }, []);

  return isDragging;
}
