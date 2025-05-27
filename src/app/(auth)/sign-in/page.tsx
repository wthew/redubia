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
import { useRouter } from "next/navigation";
import { setAuthTokens } from "@/lib/auth";
import SidePanel from "@/components/auth/side-panel";

export default function SignIn() {
  const form = useForm({ resolver: zodResolver(loginRequestSchema) });
  const router = useRouter();

  const onSubmit = form.handleSubmit(async (data) => {
    const session = await login({ data });

    localStorage.setItem("session", JSON.stringify(session));
    await setAuthTokens(session);
    router.push("/me");
  });

  return (
    <>
      <SidePanel>
        <p>
          Conecte-se e continue sua jornada pelo universo da dublagem.
          Reencontre vozes conhecidas, descubra novos talentos e mergulhe ainda
          mais fundo no mundo que dá vida aos personagens que você ama.
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
    </>
  );
}
