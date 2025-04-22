'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'

export default function HomePage() {
    const { data: session, status } = useSession()

    return (
        <main className="min-h-screen bg-slate-900 text-white p-10">
            <h1 className="text-4xl font-bold mb-6">👋 Welcome to LifeRing Live</h1>

            {status === 'loading' && <p>Checking session...</p>}

            {status === 'authenticated' ? (
                <>
                    <p className="mb-4">Hello, {session.user.name || session.user.email}</p>
                    <Link
                        href="/dashboard"
                        className="inline-block bg-emerald-500 hover:bg-emerald-600 text-black px-4 py-2 rounded font-bold"
                    >
                        Go to Dashboard
                    </Link>
                </>
            ) : (
                <Link
                    href="/login"
                    className="inline-block bg-emerald-500 hover:bg-emerald-600 text-black px-4 py-2 rounded font-bold"
                >
                    Login
                </Link>
            )}
        </main>
    )
}