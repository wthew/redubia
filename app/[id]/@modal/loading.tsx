import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/lib/components/ui/dialog";
import { Skeleton } from "@/app/lib/components/ui/skeleton";

export default function () {
  return (
    <Dialog open>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>
            <Skeleton className="h-[125px] w-[250px] rounded-xl" />
          </DialogTitle>
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
