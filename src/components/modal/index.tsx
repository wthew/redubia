import { PropsWithChildren, ReactNode } from "react";
import { DialogContent, DialogTitle } from "../ui/dialog";
import ModalWrapper from "./wrapper";

interface ModalProps extends PropsWithChildren {
  route: string;
  title: ReactNode;
}

export default async function Modal(props: ModalProps) {
  return (
    <ModalWrapper route={props.route}>
      <DialogContent className="max-w-4xl scrol">
        <DialogTitle className="mb-4">{props.title}</DialogTitle>
        {props.children}
      </DialogContent>
    </ModalWrapper>
  );
}
