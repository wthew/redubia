"use client";

import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

export const createApplicationRequestSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  redirect_uris: z.array(z.object({ id: z.string(), uri: z.string().url() })),
  website: z.string().optional(),
  scopes: z.array(z.string()),
});

export default function FormCreateApplication() {
  const form = useForm({
    resolver: zodResolver(createApplicationRequestSchema),
    defaultValues: {
      name: "",
      description: "",
      redirect_uris: [],
      website: "",
      scopes: [],
    },
  });

  const redirects = useFieldArray({
    control: form.control,
    name: "redirect_uris",
  });

  const mutate = ({
    data,
  }: {
    data: (typeof createApplicationRequestSchema)["_type"];
  }) => {
    // Mutation logic goes here
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => mutate({ data }))}>
        <div className="max-w-lg space-y-8 w-full m-auto">
          <div className="flex gap-8 justify-items-stretch">
            <FormField
              name="name"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full">
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome da aplicação" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name="website"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full">
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input placeholder="https://seusite.com" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <FormField
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Input placeholder="Descrição" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormItem>
            <FormLabel>Redirect URLs</FormLabel>
            {redirects.fields.map((field, index) => (
              <div key={field.id} className="flex gap-2 mb-2">
                <FormControl>
                  <Input
                    placeholder="https://teste/callback"
                    {...form.register(`redirect_uris.${index}.uri`)}
                  />
                </FormControl>
                <Button variant="ghost" onClick={() => redirects.remove(index)}>
                  <Trash />
                </Button>
              </div>
            ))}
            <Button
              variant="link"
              onClick={() =>
                redirects.append({
                  id: redirects.fields.length.toString(),
                  uri: "",
                })
              }
            >
              add
            </Button>
          </FormItem>
        </div>

        <DialogFooter>
          <Button>Salvar</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
