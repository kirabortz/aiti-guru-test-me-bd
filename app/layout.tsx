import './globals.css';
import { StoreProvider } from '@/lib/store/StoreProvider';

import { Cairo, Open_Sans, Inter, Roboto_Mono, Roboto } from 'next/font/google';

const cairo = Cairo({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-cairo', 
});

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto',
});

export const metadata = {
  title: 'Aiti Guru Test',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className={`${cairo.variable} ${openSans.variable} ${inter.variable} ${robotoMono.variable} ${roboto.variable}`}>
      <body className="min-h-screen">
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  )
}