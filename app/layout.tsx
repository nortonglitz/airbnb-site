import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'
import Navbar from '@/app/components/navbar/Navbar'
import RegisterModal from '@/app/components/modals/RegisterModal'
import ClientProvider from '@/app/providers/ClientProvider'
import { Toaster } from 'react-hot-toast'
import LoginModal from '@/app/components/modals/LoginModal'
import getCurrentUser from '@/app/actions/getCurrentUser'
import RentModal from '@/app/components/modals/RentModal'

const nunito = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Airbnb',
  description: 'Airbnb clone',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const currentUser = await getCurrentUser()
  return (
    <html lang="en">
      <body className={nunito.className}>
        <ClientProvider>
          <Toaster />
        </ClientProvider>
        <RegisterModal />
        <LoginModal />
        <RentModal />
        <Navbar currentUser={currentUser} />
        {children}
      </body>
    </html>
  )
}
