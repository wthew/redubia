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

export async function setAuthTokens(tokens: { access_token: string, refresh_token: string }) {
  const store = await cookies();
  store.set("access_token", tokens.access_token);
  store.set("refresh_token", tokens.refresh_token);
}

export async function clearAuthTokens() {
  const store = await cookies();
  store.delete("access_token");
  store.delete("refresh_token");
}