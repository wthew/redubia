"use server";

import { login, LoginRequest } from "@/lib/services/gen";
import { redirect } from "next/navigation";


export default async function signInAction(data: LoginRequest) {
  console.log('logando com usuario:', data)

  // const res = await login({ data })

  return redirect('/wiki')
}
