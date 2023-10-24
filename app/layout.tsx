import { ClerkProvider } from "@clerk/nextjs";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./theme-config.css";

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
        <Theme accentColor="lime" scaling="105%">
          <ClerkProvider>
            <main>{children}</main>
          </ClerkProvider>
        </Theme>
      </body>
    </html>
  );
}
