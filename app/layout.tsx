import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Query Hive",
  description:
    "Query Hive is a community-driven Q&A platform dedicated to empowering developers, programmers, and tech enthusiasts. It provides a space where users can ask questions, share their expertise, and engage in discussions related to various programming languages, software development, and technology topics. With a vibrant community of contributors, Query Hive is the go-to destination for finding solutions, insights, and valuable knowledge to tackle coding challenges and stay up-to-date with the ever-evolving tech landscape.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
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
