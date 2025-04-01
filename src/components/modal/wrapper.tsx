"use client";

import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Dialog } from "../ui/dialog";
import { usePathname, useRouter } from "next/navigation";

interface Props extends PropsWithChildren {
  route: string;
  replace?: boolean;
}

export default function ModalWrapper({ route, children, replace }: Props) {
  const [open, setOpen] = useState(true);
  const path = usePathname();
  const initial = useRef(path);
  const router = useRouter();

  const onOpenChange = useCallback(
    (open: boolean) => {
      if (initial.current === path) {
        (replace ? () => router.replace(route) : router.back)();
      }
      setOpen(open);
    },
    [replace, route, path]
  );

  useEffect(() => {
    setOpen(path === initial.current);
  }, [path]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {children}
    </Dialog>
  );
}
