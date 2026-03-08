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

// Update this for a professional brand appearance in Google searches
export const metadata: Metadata = {
  title: "NS India Exim Solutions | Premium Garment Exporters",
  description: "Your Trusted Partner In The Exim World - Merchant Exporter of Men's, Women's, and Kids' Apparel.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}
      >
        
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}