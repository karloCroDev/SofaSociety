// Extenal packages
import localFont from 'next/font/local';
import { twMerge } from 'tailwind-merge';

// Styles
import './globals.css';

// Fonts
const MonaSansFont = localFont({
  src: '../public/fonts/Mona-Sans.ttf',
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={twMerge('bg-gray-10', MonaSansFont.className)}>
        {children}
      </body>
    </html>
  );
}
