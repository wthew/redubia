"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";

import { useParams, useRouter } from "next/navigation";

export default function ModalGallery() {
  const router = useRouter();
  const { id } = useParams();

  return (
    <Dialog defaultOpen onOpenChange={router.back}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Galeria: {id}</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">test</div>
        <DialogFooter>foter </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
