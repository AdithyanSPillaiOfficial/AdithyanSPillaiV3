import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Adithyan S Pillai | Software Engineer & Full-Stack Developer",
  description:
    "B.Tech Computer Science graduate (CGPA: 6.91) from CCET, Alappuzha. Software Engineer skilled in React, Node.js, Flutter, Python, and AI/ML.",
  keywords: ["Software Engineer", "Full-Stack Developer", "React", "Node.js", "Flutter", "Python", "AI", "Kerala"],
  authors: [{ name: "Adithyan S Pillai" }],
  openGraph: {
    title: "Adithyan S Pillai — Software Engineer",
    description: "Software Engineer · Full-Stack Developer · AI & ML Enthusiast",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="antialiased">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
