"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";

import { useRouter } from "next/navigation";

export default function ModalGallery() {
  const router = useRouter();

  return (
    <Dialog defaultOpen onOpenChange={router.back}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
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
