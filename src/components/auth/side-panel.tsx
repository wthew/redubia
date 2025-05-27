import RedubiaLogo from "@/components/redubia-logo";
import { PropsWithChildren } from "react";

export default function SidePanel(props: PropsWithChildren) {
  return (
    <div className="hidden md:flex flex-col flex-[3] h-full">
      <div className="p-16 h-full flex flex-col gap-y-8">
        <h3>
          <RedubiaLogo />
        </h3>
        {props.children}
      </div>
    </div>
  );
}
