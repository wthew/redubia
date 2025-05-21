"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function useMustRender() {
  const [mustRender, setMustRender] = useState(true);
  const path = usePathname();

  useEffect(() => {
    switch (path) {
      case "/sign-in":
        setMustRender(false);
        break;

      default:
        setMustRender(true);
        break;
    }
  }, [path]);

  return mustRender;
}
