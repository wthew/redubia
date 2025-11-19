import "./globals.css";

import { Inter } from "next/font/google";
import { ThemeProvider } from "../context/theme";
import AppBar from "../components/app-bar";
import { QueryProvider } from "../context/query";
import React from "react";
import { AuthProvider } from "@/context/auth";
import { headers } from "next/headers";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "redubia",
  description: "",
  other: { "google-adsense-account": "ca-pub-9123981005716024" },
};

type Props = React.PropsWithChildren;
export default async function RootLayout({ children }: Props) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <AuthProvider>
            <QueryProvider>
              <AppBar />
              {children}
              <Toaster />
            </QueryProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
