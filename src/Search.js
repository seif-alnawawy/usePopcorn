import { useEffect, useRef } from "react";
import { useKey } from "./hooks/useKey";

export default function Search({ query, onChange }) {
  const inputElm = useRef(null);

  useEffect(() => {
    inputElm.current.focus();
  }, []);

  useKey("Enter", () => inputElm.current.focus());

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={onChange}
      ref={inputElm}
    />
  );
}
