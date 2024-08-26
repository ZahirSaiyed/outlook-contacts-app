'use client';

import { Inter } from "next/font/google";
import "./globals.css";
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import { Client } from "@microsoft/microsoft-graph-client";
import { msalConfig } from '../config';

const inter = Inter({ subsets: ["latin"] });

const msalInstance = new PublicClientApplication(msalConfig);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <MsalProvider instance={msalInstance}>
        <body className={inter.className}>{children}</body>
      </MsalProvider>
    </html>
  );
}