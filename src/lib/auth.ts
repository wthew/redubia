"use server";

import { cookies } from "next/headers";

export async function retriveAccessToken() {
  const store = await cookies();
  return store.get("access_token")?.value
}

export async function setAccessToken(token: string) {
  const store = await cookies();
  store.set("access_token", token);
}

export async function authHeaders() {
  const token = await retriveAccessToken();
  console.log('lido:', token)
  return { Authorization: "Bearer " + token };
}
