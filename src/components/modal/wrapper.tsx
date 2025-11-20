"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Dialog } from "../ui/dialog";
import { usePathname, useRouter } from "next/navigation";

interface Props extends React.PropsWithChildren {
  route: string;
}

interface ModalContext {
  close: () => void;
}
const ModalContext = React.createContext<ModalContext | null>(null);
export const useModalContext = () => React.useContext(ModalContext)!;

export default function ModalWrapper({ route, children }: Props) {
  const [open, setOpen] = useState(true);
  const path = usePathname();
  const initial = useRef(path);
  const router = useRouter();

  const onOpenChange = useCallback(
    (open: boolean) => {
      if (initial.current === path) router.replace(route);
      setOpen(open);
    },
    [route, path]
  );

  useEffect(() => {
    setOpen(path === initial.current);
  }, [path]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <ModalContext.Provider value={{ close: () => onOpenChange(false) }}>
        {children}
      </ModalContext.Provider>
    </Dialog>
  );
}
