import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Terrakube",
  description:
    "Open source infrastructure as code automation and collaboration for Terraform and OpenTofu. Self-hosted anywhere.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
