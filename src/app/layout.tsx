import type { Metadata } from 'next';
import './globals.css';
import Providers from './providers';
import metadataIcon from '../assets/icons/metadata_icon.svg';

export const metadata: Metadata = {
  metadataBase: new URL('https://snackmaster.shop'),
  title: '스낵마스터',
  description: '회사별 간식 구매·지출·요청을 한곳에서 관리하는 스낵마스터',
  icons: {
    icon: metadataIcon.src,
  },
  openGraph: {
    type: 'website',
    title: '스낵마스터',
    description: '회사별 간식 구매·지출·요청을 한곳에서 관리하는 스낵마스터',
    images: [
      {
        url: '/images/logo.png',
        width: 512,
        height: 220,
        alt: '스낵마스터',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '스낵마스터',
    description: '회사별 간식 구매·지출·요청을 한곳에서 관리하는 스낵마스터',
    images: ['/images/logo.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
