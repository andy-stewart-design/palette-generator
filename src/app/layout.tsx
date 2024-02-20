import type { Metadata } from "next";
import "@/styles/main.css";

export const metadata: Metadata = {
  title: "Palette Generator",
  description: "Programmatic color palette generator",
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
