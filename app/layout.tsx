import type { Metadata } from 'next';
import { Playfair_Display } from 'next/font/google';
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
    <html lang="en" className="h-full">
      <body className="h-full overflow-hidden font-rebond">
        <header className="absolute left-0 right-0 top-0 z-10">
          <div className="container mx-auto max-w-screen-lg px-4 py-4">
            <h1 className={`${playfair.className} text-3xl text-primary`}>
              Sojourn
            </h1>
          </div>
        </header>
        <main className="h-full">{children}</main>
      </body>
    </html>
  );
}
