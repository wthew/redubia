"use client";

import { retriveAccessToken, setAccessToken } from "@/lib/auth";
import { generatePKCE } from "@/lib/auth/pkce";
import { getAuthorizeUrl, LoginResponse } from "@/lib/services/gen";
import React, { useCallback, useState } from "react";

type Session = LoginResponse | undefined;

type AuthContextValue = {
  session: Session;
  update: (session: Session) => void;
};
const AuthContext = React.createContext({} as AuthContextValue);

export function AuthProvider({ children }: React.PropsWithChildren) {
  const [session, setSession] = useState<Session>();

  const update = useCallback((session: Session) => {
    setSession(session);
  }, []);

  React.useEffect(() => {
    retriveAccessToken().then((access_token) => {
      if (access_token) return;

      const pkce_verifier = sessionStorage.getItem("pkce_verifier");
      if (!pkce_verifier) startOAuthFlow();
    });
  }, []);

  return (
    <AuthContext.Provider value={{ session, update }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => React.useContext(AuthContext);

async function startOAuthFlow() {
  const { code_verifier, code_challenge } = await generatePKCE();

  sessionStorage.setItem("pkce_verifier", code_verifier);

  const params = new URLSearchParams({
    client_id: "rdb_hszKaET13rpsNhrDwFp63d",
    redirect_uri: "http://localhost:3000/oauth-callback",
    code_challenge,
    code_challenge_method: "S256",
  });

  sessionStorage.setItem(
    "path_before_oauth",
    window.location.pathname + window.location.search,
  );

  window.location.href = getAuthorizeUrl()
    .concat("?")
    .concat(params.toString());
}
