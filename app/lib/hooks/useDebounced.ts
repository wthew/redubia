import { useEffect, useState } from "react";

let timeout: NodeJS.Timeout;

type UseDebouncedOptions = {
  delay: number;
};
export default function useDebounced<T>(value: T, opts?: UseDebouncedOptions) {
  const [debounced, setDebounced] = useState<T>(value);

  useEffect(() => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      setDebounced(value);
    }, opts?.delay || 500);
  }, [value]);

  return debounced;
}
