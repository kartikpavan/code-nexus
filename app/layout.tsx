import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";

import "@radix-ui/themes/styles.css";
import "./theme-config.css";
import { Theme, ThemePanel } from "@radix-ui/themes";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});
export const metadata: Metadata = {
  title: "Query Hive",
  description:
    "Query Hive is a community-driven Q&A platform dedicated to empowering developers, programmers, and tech enthusiasts. It provides a space where users can ask questions, share their expertise, and engage in discussions related to various programming languages, software development, and technology topics. With a vibrant community of contributors, Query Hive is the go-to destination for finding solutions, insights, and valuable knowledge to tackle coding challenges and stay up-to-date with the ever-evolving tech landscape.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <Theme accentColor="lime" scaling="105%">
          <main>{children}</main>
        </Theme>
      </body>
    </html>
  );
}
