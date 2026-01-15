import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Simon Manzler | Portfolio",
  description:
    "Simon Manzler's portfolio website showcasing his projects and skills. Built with Next.js, TailwindCSS, and Shadcn UI.",
  metadataBase: new URL("https://simonmanzler.com"),
  icons: {
    icon: "/simon-icon.png",
  },
  openGraph: {
    title: "Simon Manzler | Portfolio",
    description:
      "Simon Manzler's portfolio website showcasing his projects and skills. Built with Next.js, TailwindCSS, and Shadcn UI.",
    images: [
      {
        url: "/simon-icon.png",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="relative">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main>
            <Header />
            {children}
            <Footer />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
