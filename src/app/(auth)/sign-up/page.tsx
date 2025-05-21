"use client";

import signUpAction from "./action";
import { useForm } from "react-hook-form";
import { loginRequestSchema } from "@/lib/services/gen";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function SignUp() {
  const form = useForm({ resolver: zodResolver(loginRequestSchema) });
  const onSubmit = form.handleSubmit(signUpAction);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-evenly overflow-hidden w-4xl h-full md:h-3/4 md:flex-row md:rounded-4xl md:border-2">
        <div className="hidden md:flex flex-col flex-[3] h-full">
          <div className="p-16 h-full flex flex-col gap-y-8">
            <h3>
              <Link href="/">
                <span className="text-4xl font-bold animate-gradient-loop">
                  <span className="">redub</span>
                  <span className="">ia</span>
                </span>
              </Link>
            </h3>
            <p>
              Junte-se à comunidade que dá voz aos seus personagens favoritos.
              Descubra bastidores, conheça dubladores incríveis e comece agora
              sua jornada pelo universo da dublagem. Sua voz também pode fazer
              parte dessa história.
            </p>
          </div>
        </div>
        <div className="flex flex-[2] w-fit items-center justify-center">
          <Form {...form}>
            <form onSubmit={onSubmit} className="space-y-8">
              <FormField
                name="email"
                defaultValue=""
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Email" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                defaultValue=""
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" placeholder="Senha" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Cadastre-se
              </Button>

              <Link href="/sign-in">
                <Button variant="link" className="w-full p-0">
                  Possui conta?
                </Button>
              </Link>

              <div></div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
