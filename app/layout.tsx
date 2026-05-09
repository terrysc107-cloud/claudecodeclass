import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Build With Cursor — Ship Products With AI",
  description:
    "The business builder's guide to Cursor AI. Ship products, land clients, and build income streams with AI-first development.",
  metadataBase: new URL("https://buildwithcursor.com"),
  openGraph: {
    title: "Build With Cursor — Ship Products With AI",
    description: "The business builder's guide to Cursor AI. Ship products, land clients, and build income streams with AI-first development.",
    url: "https://buildwithcursor.com",
    siteName: "Build With Cursor",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Build With Cursor",
    description: "The business builder's guide to Cursor AI. Ship products, land clients, and build income streams with AI-first development.",
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
