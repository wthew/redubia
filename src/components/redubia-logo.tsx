"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  className?: string;
  as?: React.ElementType;
};
export default function RedubiaLogo({ className, as: wrapper }: Props) {
  const Tag = wrapper || "span";
  const path = usePathname();

  return (
    <Tag className={`text-4xl font-bold animate-gradient-loop ${className}`}>
      {path === "/" ? <>redubia</> : <Link href="/">redubia</Link>}
    </Tag>
  );
}
