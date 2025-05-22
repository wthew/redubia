"use client";

import { LoginResponse } from "@/lib/services/gen";
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
    localStorage.setItem("session", JSON.stringify(session));
  }, []);

  React.useEffect(() => {
    const session = localStorage.getItem("session");
    if (session) {
      setSession(JSON.parse(session));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ session, update }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => React.useContext(AuthContext)