import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/lib/components/ui/card";
import { Skeleton } from "../lib/components/ui/skeleton";

export default function () {
  return (
    <div className="flex justify-center items-center h-dvh md:p-8">
      <Card className="rounded-none md:rounded-lg w-full max-w-5xl z-10">
        <div className="p-6 pb-0 flex flex-row justify-between">
          <CardHeader className="h-full p-0">
            <CardTitle>
              <Skeleton className="h-[20px] w-[100px] rounded-xl" />
            </CardTitle>
            <CardDescription>
              <Skeleton className="h-[16px] w-[400px] rounded-xl" />
            </CardDescription>
            <div className="flex flex-row gap-3 mb-5 items-center">
              <Skeleton className="h-[48px] w-[48px] rounded-xl" />
              <Skeleton className="h-[48px] w-[48px] rounded-xl" />
              <Skeleton className="h-[48px] w-[48px] rounded-xl" />
              <Skeleton className="h-[48px] w-[48px] rounded-xl" />
            </div>
          </CardHeader>
          <div className="rounded-md w-1/5 m-3 overflow-hidden">
            <Skeleton className="h-full w-full rounded-xl" />
          </div>
        </div>
        <CardContent>
          <div className="flex flex-col gap-3 ">
          <Skeleton className="h-[20px] w-full rounded-xl" />
          <Skeleton className="h-[20px] w-full rounded-xl" />
          <Skeleton className="h-[20px] w-full rounded-xl" />
          <Skeleton className="h-[20px] w-full rounded-xl" />
          <Skeleton className="h-[20px] w-full rounded-xl" />
          <Skeleton className="h-[20px] w-full rounded-xl" />
          <Skeleton className="h-[20px] w-full rounded-xl" />
          </div>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </div>
  );
}
