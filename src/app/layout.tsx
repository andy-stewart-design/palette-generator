import type { Metadata } from 'next';
import '@/styles/main.css';

type NextLayout = Readonly<{
  children: React.ReactNode;
  params: Record<string, string>;
}>;

export const metadata: Metadata = {
  title: 'Palette Generator',
  description: 'Programmatic color palette generator',
};

export default function RootLayout({ children }: NextLayout) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
