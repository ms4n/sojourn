import { Providers } from '@/redux/provider';
import type { Metadata } from 'next';
import { Playfair_Display } from 'next/font/google';
import Link from 'next/link';
import './globals.css';
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: 'Sojourn',
  description: 'a travel planner for the modern adventurer',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <html lang="en" className={`h-full ${playfair.variable}`}>
        <body className="h-full overflow-hidden font-rebond">
          <header className="absolute left-0 right-0 top-0 z-10">
            <div className="container mx-auto flex max-w-screen-lg items-center justify-between px-4 py-4">
              <Link
                href="/"
                className={`${playfair.className} text-3xl text-primary`}
              >
                Sojourn
              </Link>
              <Link
                href="/about"
                className="text-xl text-primary hover:underline"
              >
                about
              </Link>
            </div>
          </header>
          <main className="h-full">{children}</main>
        </body>
      </html>
    </Providers>
  );
}
