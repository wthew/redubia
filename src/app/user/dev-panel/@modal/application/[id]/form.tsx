"use client";

import { useModalContext } from "@/components/modal/wrapper";
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
import {
  Application,
  createApplicationRequestSchema,
  useCreateDeveloperApplication,
} from "@/lib/services/gen";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";

const resolver = zodResolver(createApplicationRequestSchema);

type Props = { application: Application };
export default function FormUpdateApplication(props: Props) {
  const form = useForm({ resolver, defaultValues: props.application });
  const { close } = useModalContext();

  const redirects = useFieldArray({
    control: form.control,
    // @ts-ignore
    name: "redirect_uris",
  });

  const { mutate } = useCreateDeveloperApplication({
    mutation: {
      onSuccess: () => {
        toast("Aplicação criada com sucesso!", { position: "bottom-center" });
        close();
      },
    },
  });

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
                    {...form.register(`redirect_uris.${index}.redirect_uri`)}
                  />
                </FormControl>
                <Button variant="ghost" onClick={() => redirects.remove(index)}>
                  <Trash />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="link"
              onClick={() => {
                const id = redirects.fields.length.toString();
                redirects.append({ id, uri: "" });
              }}
            >
              add
            </Button>
          </FormItem>
        </div>

        <DialogFooter>
          <Button type="submit">Salvar</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
