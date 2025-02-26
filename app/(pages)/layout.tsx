import "../globals.css";

import { Inter } from "next/font/google";
import { ThemeProvider } from "../context/theme";
import AppBar from "../components/app-bar";
import { AppBarProvider } from "../components/app-bar/context";
import { QueryProvider } from "../context/query";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "redubia",
  description: "",
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <QueryProvider>
            <AppBarProvider>
              <AppBar />
              {children}
            </AppBarProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
