"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/auth";
import {
  getCurrentUserDataQueryKey,
  updateProfileRequestSchema,
  useUpdateCurrentUserData,
} from "@/lib/services/gen";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { omit } from "lodash";
import { useEffect } from "react";

import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function MeForm() {
  const queryClient = useQueryClient();
  const { session } = useAuth();

  const form = useForm({
    resolver: zodResolver(updateProfileRequestSchema),
    defaultValues: { username: "", full_name: "" },
  });

  useEffect(() => {
    if (!session?.profile) return;

    const entries = Object.entries(omit(session.profile, ["id", "avatar_url"]));
    for (const [key, value] of entries) form.setValue(key, value);
  }, [session?.profile]);

  const { mutate } = useUpdateCurrentUserData({
    mutation: {
      onSuccess: (_, { data }) => {
        queryClient.setQueryData(
          getCurrentUserDataQueryKey(),
          (old: typeof data) => ({ ...old, ...data })
        );
        toast("Salvo.", { position: "bottom-center" });
      },
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => mutate({ data }))}
        className="max-w-lg space-y-8"
      >
        <FormField
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} placeholder="username" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="full_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Full Name" />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" disabled={!form.formState.isDirty} className="w-full">
          Salvar
        </Button>
      </form>
    </Form>
  );
}
