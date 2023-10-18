import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/app/components/navbar/Navbar'
import RegisterModal from '@/app/components/modals/RegisterModal'
import ClientProvider from '@/app/providers/ClientProvider'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Airbnb',
  description: 'Airbnb clone',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientProvider>
          <Toaster />
        </ClientProvider>
        <RegisterModal />
        <Navbar />
        {children}
      </body>
    </html>
  )
}
