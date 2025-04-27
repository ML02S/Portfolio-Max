import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../app/styles/globals.css";

export const metadata: Metadata = {
  title: "Portfolio Max",
  description: "Portfolio site of Max Stokla",
  icons: {
    icon: '/images/Fish.png',
    apple: '/images/Fish.png',
  },
};

const inter = Inter({
  weight: "400",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
