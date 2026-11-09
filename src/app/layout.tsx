import type { Metadata } from "next";
import "./globals.css";

const description =
  "Open source infrastructure as code automation and collaboration for Terraform and OpenTofu. Self-hosted anywhere.";

export const metadata: Metadata = {
  metadataBase: new URL("https://terrakube.io"),
  title: "Terrakube · Infrastructure as code automation for Terraform and OpenTofu",
  description,
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Terrakube",
    description,
    url: "https://terrakube.io",
    siteName: "Terrakube",
    images: [{ url: "/workspaces.png", width: 2304, height: 1440, alt: "Terrakube workspace list" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terrakube",
    description,
    images: ["/workspaces.png"],
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
