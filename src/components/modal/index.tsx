import { PropsWithChildren, ReactNode } from "react";
import { DialogContent, DialogTitle } from "../ui/dialog";
import ModalWrapper from "./wrapper";

interface ModalProps extends PropsWithChildren {
  route: string;
  title: ReactNode
  replace?: boolean
}

export default async function Modal(props: ModalProps) {
  return <ModalWrapper route={props.route} replace={props.replace}>
  <DialogContent className="max-w-4xl">
    <DialogTitle className="mb-4">{props.title}</DialogTitle>
    {props.children}
  </DialogContent>
</ModalWrapper>
}
