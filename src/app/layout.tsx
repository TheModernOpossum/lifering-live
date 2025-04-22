import './globals.css'
import type { Metadata } from 'next'
import AuthSessionProvider from '@/components/AuthSession'

export const metadata: Metadata = {
    title: 'LifeRing Live',
    description: 'Pop-Up Scaffolding App',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body>
        <AuthSessionProvider>{children}</AuthSessionProvider>
        </body>
        </html>
    )
}