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
import SidePanel from "@/components/auth/side-panel";

export default function SignUp() {
  const form = useForm({ resolver: zodResolver(loginRequestSchema) });
  const onSubmit = form.handleSubmit(signUpAction);

  return (
    <>
      <SidePanel>
        <p>
          Junte-se à comunidade que dá voz aos seus personagens favoritos.
          Descubra bastidores, conheça dubladores incríveis e comece agora sua
          jornada pelo universo da dublagem. Sua voz também pode fazer parte
          dessa história.
        </p>
      </SidePanel>
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
    </>
  );
}
