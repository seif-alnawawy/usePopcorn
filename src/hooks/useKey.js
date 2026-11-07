import { useEffect } from "react";

export function useKey(key, action) {
  useEffect(() => {
    function onEscapePressed(e) {
      if (e.code.toLowerCase() === key.toLowerCase()) {
        action();
      }
    }
    document.addEventListener("keydown", onEscapePressed);

    return () => document.removeEventListener("keydown", onEscapePressed);
  }, [key, action]);
}
