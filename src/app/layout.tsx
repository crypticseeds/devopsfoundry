import type { Metadata } from "next";
import { Montserrat, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import "katex/dist/katex.css";
import { ThemeProvider } from "@/components/theme-provider";
import { StatusWidget } from "@/components/StatusWidget";
import { Background } from "@/components/Background";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevOps Foundry – Femi Akinlotan – DevOps, SRE & Platform Engineer",
  description:
    "Portfolio of London-based DevOps, SRE, Platform and AI Engineer Femi Akinlotan. Showcasing cloud-native infrastructure, CI/CD, observability, MLOps and automation projects for modern engineering teams.",
  icons: {
    icon: "/assets/logo-mark.png",
    shortcut: "/assets/logo-mark.png",
    apple: "/assets/logo-mark.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${montserrat.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Background />
          <StatusWidget />
        </ThemeProvider>
      </body>
    </html>
  );
}
