import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { GeistSans, GeistMono } from "geist/font";
import "./globals.css";
import "../styles/prism.css";
import "../styles/theme.css";

import { ThemeProvider } from "@/context/ThemeProvider";

export const metadata: Metadata = {
  title: "Code Nexus",
  description:
    "Code Nexus is a community-driven Q&A platform dedicated to empowering developers, programmers, and tech enthusiasts. It provides a space where users can ask questions, share their expertise, and engage in discussions related to various programming languages, software development, and technology topics. With a vibrant community of contributors, Query Hive is the go-to destination for finding solutions, insights, and valuable knowledge to tackle coding challenges and stay up-to-date with the ever-evolving tech landscape.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ClerkProvider>{children}</ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
