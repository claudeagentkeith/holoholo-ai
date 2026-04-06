import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Holoholo.ai",
  description: "AI-powered regenerative tourism concierge for Hawai‘i.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
