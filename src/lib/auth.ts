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

export async function retriveRefreshToken() {
  const store = await cookies();
  return store.get("refresh_token")?.value
}

export async function setRefreshToken(token: string) {
  const store = await cookies();
  store.set("refresh_token", token);
}

export async function authHeaders() {
  const token = await retriveAccessToken();
  return { Authorization: "Bearer " + token };
}
