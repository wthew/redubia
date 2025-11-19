import { Card } from "@/components/ui/card";
import { PropsWithChildren } from "react";

export default async function Layout(props: PropsWithChildren) {
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <Card className="flex bg-transparent relative flex-col items-center justify-evenly overflow-hidden w-4xl h-full md:h-3/4 md:flex-row border-0 md:border-1 pb-0">
        <div className="absolute pointer-events-none inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5 animate-pulse-slow" />

        {props.children}
      </Card>
    </div>
  );
}
