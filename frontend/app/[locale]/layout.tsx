

import "../globals.css";
import { AuthProvider } from "@/app/context/AuthContext";
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { getMessages } from 'next-intl/server';
import { Providers } from '../components/ThemeProvider'

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning>
      <body>
        <AuthProvider>
        <NextIntlClientProvider>
        <Providers>{children}</Providers>
        </NextIntlClientProvider>
        </AuthProvider>
      </body>
    </html>
  )
}