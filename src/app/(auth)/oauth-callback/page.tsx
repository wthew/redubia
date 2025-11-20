"use client";

import { setAccessToken } from "@/lib/auth";
import { exchangeAuthorizationCodeForToken } from "@/lib/services/gen";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function OAuthCallback() {
  const params = useSearchParams();
  const code = params.get("code");

  useEffect(() => {
    if (!code) return;

    console.log("chamando back para obter token");
    completeOAuthFlow(code);
  }, [code]);

  return null;
}

async function completeOAuthFlow(code: string) {
  const code_verifier = sessionStorage.getItem("pkce_verifier");
  if (!code_verifier) throw new Error("Code verifier not found");

  const { access_token } = await exchangeAuthorizationCodeForToken({
    data: {
      client_id: "rdb_hszKaET13rpsNhrDwFp63d",
      grant_type: "authorization_code",
      redirect_uri: "http://localhost:3000/oauth-callback",
      code_verifier,
      code,
    },
  });

  await setAccessToken(access_token);

  const path = sessionStorage.getItem("path_before_oauth") || "/";
  sessionStorage.removeItem("path_before_oauth");
  sessionStorage.removeItem("pkce_verifier");
  window.location.href = path;
}
