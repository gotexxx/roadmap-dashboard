import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevRoadmap — Vom Web-Entwickler zum Cloud-Native KI-Ingenieur",
  description:
    "Interaktive Lernroadmap für Web-Entwickler, die in Cloud, DevOps und KI-Engineering einsteigen wollen. Fortschritt verfolgen, XP sammeln und Karriere aufbauen.",
  keywords: ["DevOps", "Cloud", "KI", "Kubernetes", "Docker", "AWS", "roadmap"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-zinc-950 text-zinc-100 antialiased">
        {children}
      </body>
    </html>
  );
}
