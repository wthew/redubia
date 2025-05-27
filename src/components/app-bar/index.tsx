"use client";

import { Search as SearchIcon } from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { DialogTitle } from "../ui/dialog";
import useDebounced from "@/hooks/useDebounced";
import Link from "next/link";
import { useAuth } from "@/context/auth";
import RedubiaLogo from "../redubia-logo";
import { usePathname } from "next/navigation";
import { mustRenderAppBar } from "./utils";

export default function AppBar() {
  const path = usePathname();

  const avoidRender = useMemo(() => mustRenderAppBar(path), [path]);
  if (!avoidRender) return <></>;

  return (
    <header className="absolute top-0 left-0 w-full shadow-md z-50 transition-transform duration-300 bg-[#0005] backdrop-blur-md">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
        <RedubiaLogo className="text-xl" />
        <div className="flex items-center space-x-4">
          {/* <Search /> */}
          <ProfileIcon />
        </div>
      </div>
    </header>
  );
}

export function Search() {
  const [open, setOpen] = React.useState(false);

  const [search, setSearch] = useState("");
  const debounced = useDebounced(search);
  const { data = [], isLoading } = { data: [], isLoading: false }; // FIXME

  const onOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const clear = useCallback(() => {
    setOpen(false);
    setSearch("");
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <div onClick={onOpen} className="flex border rounded-md px-4 py-2">
        <SearchIcon />
        <span className="mx-3 opacity-50">Pesquisar ...</span>
      </div>

      <CommandDialog shouldFilter={false} open={open} onOpenChange={setOpen}>
        <DialogTitle className="hidden">Type a Command</DialogTitle>
        <CommandInput
          placeholder="Type a command or search..."
          value={search}
          onValueChange={(value) => setSearch(value)}
        />
        <CommandList>
          <CommandEmpty>
            {isLoading ? "Loading..." : "No results found."}
          </CommandEmpty>
          <CommandGroup>
            {data.map(({ id, title }) => (
              <CommandItem key={id}>
                <Link onClick={clear} href={`/${id}`}>
                  {title}
                </Link>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}

export function ProfileIcon() {
  const { session } = useAuth();
  const path = usePathname();

  return session?.profile?.id ? (
    path === "/me" ? (
      <> </>
    ) : (
      <Link href="/me">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Minha conta
        </button>
      </Link>
    )
  ) : (
    <Link href="/sign-in">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Login
      </button>
    </Link>
  );
}
