"use client";

import Image from "next/image";
import { useAppBar } from "../app-bar/context";
import Link from "next/link";

export default function Aside() {
  const { appBarHeight: height } = useAppBar();
  const popular = { isLoading: false, data: [] }; // FIXME

  return (
    <aside
      style={{ top: height, maxHeight: `calc(100vh - ${height}px)` }}
      className="w-full md:w-1/4 bg-gray-900 p-6 border-gray-800 flex flex-row md:flex-col overflow-x-auto md:overflow-y-auto md:h-screen md:sticky md:top-0 md:order-none order-1"
    >
      <h2 className="text-xl font-semibold mb-4 md:mb-4 text-blue-400">
        Páginas mais visitadas
      </h2>
      <ul className="text-gray-400 space-x-4 md:space-x-0 md:space-y-2 flex md:flex-col">
        {popular.isLoading && <>carrgendo...</>}
        {popular.data?.map(({ id, title, thumbnail }) => (
          <Link
            href="#"
            className="hover:text-blue-400 text-gray-200 transition-colors"
          >
            <li className="flex items-center gap-2">
              {/* <Image
                className="rounded-full"
                image={thumbnail.url}
                alt=""
                width={48}
                height={48}
              /> */}
              <h4>{title}</h4>
            </li>
          </Link>
        ))}
      </ul>
    </aside>
  );
}
