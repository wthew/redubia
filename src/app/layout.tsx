import "./globals.css";

import { Inter } from "next/font/google";
import { ThemeProvider } from "../context/theme";
import AppBar from "../components/app-bar";
import { mustRenderAppBar } from "../components/app-bar/utils";
import { QueryProvider } from "../context/query";
import React from "react";
import { AuthProvider } from "@/context/auth";
import { headers } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "redubia",
  description: "",
  other: { "google-adsense-account": "ca-pub-9123981005716024" },
};

type Props = React.PropsWithChildren;
export default async function RootLayout({ children }: Props) {
  const pathname = (await headers()).get("x-pathname") || "";

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <AuthProvider>
            <QueryProvider>
              <AppBar mustRender={mustRenderAppBar(pathname)} />
              {children}
            </QueryProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
