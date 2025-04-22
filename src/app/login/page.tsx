'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function Login() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const res = await signIn('credentials', {
            redirect: false,
            email,
            password,
        })

        if (res?.ok) {
            router.push('/')
        } else {
            setError('Invalid login')
        }
    }

    return (
        <main className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="space-y-4 bg-slate-800 p-8 rounded shadow-md w-full max-w-md"
            >
                <h1 className="text-3xl font-bold">Login</h1>

                {error && (
                    <p className="text-red-500 text-sm bg-slate-700 p-2 rounded">{error}</p>
                )}

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-2 rounded bg-slate-700 text-white"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-2 rounded bg-slate-700 text-white"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-emerald-500 hover:bg-emerald-600 p-2 rounded text-black font-bold"
                >
                    Sign In
                </button>
            </form>
        </main>
    )
}