import { useEffect, useState } from "react";

export function useLocalStorageState(key, initialState) {
  const [value, setValue] = useState(
    () => JSON.parse(localStorage.getItem(key)) || initialState,
  );

  useEffect(() => {
    localStorage.setItem("watchedMovies", JSON.stringify(value));
  }, [value]);

  return [value, setValue];
}
