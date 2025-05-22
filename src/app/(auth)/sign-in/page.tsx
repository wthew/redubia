"use client";

import { useForm } from "react-hook-form";
import { login, loginRequestSchema } from "@/lib/services/gen";
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
import { redirect } from "next/navigation";
import { setAccessToken, setRefreshToken } from "@/lib/auth";
import { useAuth } from "@/context/auth";

export default function SignIn() {
  const { update } = useAuth()
  const form = useForm({ resolver: zodResolver(loginRequestSchema) });

  const onSubmit = form.handleSubmit(async (data) => {
    const session = await login({ data });

    setAccessToken(session.access_token);
    setRefreshToken(session.refresh_token);
    update(session);

    redirect("/wiki");
  });

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
              Conecte-se e continue sua jornada pelo universo da dublagem.
              Reencontre vozes conhecidas, descubra novos talentos e mergulhe
              ainda mais fundo no mundo que dá vida aos personagens que você
              ama.
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
                Login
              </Button>

              <Link href="/sign-up">
                <Button variant="link" className="w-full p-0">
                  Cadastre-se
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
