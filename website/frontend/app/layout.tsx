import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ThemeProvider from "./components/ThemeProvider";
import ScrollProgress from "./components/LazyScrollProgress";
import BackgroundLayer from "./components/LazyBackgroundLayer";
import Scanline from "./components/LazyScanline";
import Footer from "./components/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Ryan — Software/Devops Engineer",
  description:
    "Personal portfolio of Ryan — Software and DevOps Engineer. Building reliable infrastructure and scalable automated solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen">
        <ThemeProvider>
          <ScrollProgress />
          <BackgroundLayer />
          <Scanline />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
