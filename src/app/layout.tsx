import type { Metadata } from "next";
import { Toaster } from "sonner";

export const dynamic = "error";

import "./globals.css";

export const metadata: Metadata = {
  title: "Flags SDK Example",
  description: "A Flags SDK example for Ecommerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
