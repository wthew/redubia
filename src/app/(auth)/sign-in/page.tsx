"use client";

import signInAction from "./action";
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

export default function SignIn() {
  const form = useForm({ resolver: zodResolver(loginRequestSchema) });
  const onSubmit = form.handleSubmit(signInAction)

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-evenly overflow-hidden w-4xl h-full md:h-3/4 md:flex-row md:rounded-4xl md:border-2">
        <div className="hidden md:flex flex-[3] h-full items-center justify-center">
          test
        </div>
        <div className="flex flex-[2] items-center justify-center">
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
              <Button type="submit" className="w-full">Login</Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
