"use client";

import { Search as SearchIcon } from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/app/lib/components/ui/command";

// components/AppBar.js

import React, { useCallback, useEffect, useState } from "react";
import { cn } from "@/app/lib/utils"; // Função utilitária para lidar com classes no ShadCN
import { useAppBar } from "@/app/lib/components/app-bar/context";
import { DialogTitle } from "../ui/dialog";
import useDebounced from "@/app/lib/hooks/useDebounced";
import Link from "next/link";
import { useSearch } from "@/app/lib/services/gen";

export default function AppBar() {
  const { visible, appBarRef } = useAppBar();

  return (
    <header
      ref={appBarRef}
      className={cn(
        "bg-card text-card-foreground fixed top-0 left-0 w-full shadow-md z-50 transition-transform duration-300",
        visible ? "translate-y-0" : "-translate-y-full",
        "md:translate-y-0" // Sempre visível no desktop
      )}
    >
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-semibold">redub.ia</h1>
        <Search />
      </div>
    </header>
  );
}

export function Search() {
  const [open, setOpen] = React.useState(false);

  const [search, setSearch] = useState("");
  const debounced = useDebounced(search);
  const { data, isLoading } = useSearch({ params: { q: debounced } });
  const options = Array.isArray(data?.data) ? data.data : [];

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
            {options.map(({ id, title }) => (
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
