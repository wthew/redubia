"use client";

import Image from "next/image";
import { CardContent, CardFooter } from "@/components/ui/card";
import { useGetCurrentUserData } from "@/lib/services/gen";
import { PLACEHOLDER_IMAGE } from "@/utils";
import MeForm from "./form";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useCallback } from "react";
import { redirect } from "next/navigation";

export default function MePage() {
  const { data, isLoading } = useGetCurrentUserData();
  const { username, avatar_url } = data || {};
  const logout = useCallback(() => {
    localStorage.removeItem("session")
    redirect("/sign-in")
  }, [])

  return (
    <div className="flex flex-col h-full w-full justify-between">
      <div>
        <div className="relative">
          {!isLoading ? (
            <Image
              style={{ objectFit: "cover" }}
              alt={username || ""}
              src={{
                src: avatar_url || PLACEHOLDER_IMAGE,
                width: 1,
                height: 1,
              }}
              className="h-32 w-full blur-lg brightness-50 opacity-50"
            />
          ) : (
            <Skeleton className="h-32 w-full blur-lg brightness-50 opacity-50" />
          )}
          <div className="absolute -bottom-full -translate-y-1/2 flex left-8">
            {!isLoading ? (
              <Image
                style={{ objectFit: "cover" }}
                alt={username || ""}
                src={{
                  src: avatar_url || PLACEHOLDER_IMAGE,
                  width: 1,
                  height: 1,
                }}
                className="rounded-full border-card border-3 h-32 w-32"
              />
            ) : (
              <Skeleton className="rounded-full border-card border-3 h-32 w-32" />
            )}
          </div>
        </div>
        <div className="h-16 pt-2 pl-16 ml-32 place-content-end">
          <span className="font-bold text-2xl">{username}</span>
        </div>
      </div>
      <CardContent className="flex mt-8 flex-col gap-y-4 items-center">
        <MeForm />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={logout} variant="outline">Sair</Button>
      </CardFooter>
    </div>
  );
}
