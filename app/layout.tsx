import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Claude Code Class — Ship Products With AI",
  description:
    "The business builder's guide to Claude Code. Ship products, land clients, and build income streams with AI-first development.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://claudecodeclass.com"),
  openGraph: {
    title: "Claude Code Class — Ship Products With AI",
    description: "The business builder's guide to Claude Code. Ship products, land clients, and build income streams with AI-first development.",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://claudecodeclass.com",
    siteName: "Claude Code Class",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Claude Code Class",
    description: "The business builder's guide to Claude Code. Ship products, land clients, and build income streams with AI-first development.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} min-h-full bg-slate-950 text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
