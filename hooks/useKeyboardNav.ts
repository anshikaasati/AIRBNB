import { useEffect } from "react";

interface KeyboardNavHandlers {
  onEsc?: () => void;
  onArrowLeft?: () => void;
  onArrowRight?: () => void;
}

export function useKeyboardNav(handlers: KeyboardNavHandlers, isActive: boolean) {
  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "Escape":
          if (handlers.onEsc) {
            handlers.onEsc();
            event.preventDefault();
          }
          break;
        case "ArrowLeft":
          if (handlers.onArrowLeft) {
            handlers.onArrowLeft();
            event.preventDefault();
          }
          break;
        case "ArrowRight":
          if (handlers.onArrowRight) {
            handlers.onArrowRight();
            event.preventDefault();
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isActive, handlers]);
}
