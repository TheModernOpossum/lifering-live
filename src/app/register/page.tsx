'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Register() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const res = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, name, password }), // ← no hashing here
        })

        if (res.ok) {
            router.push('/login')
        }
    }

    return (
        <main className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="space-y-4 bg-slate-800 p-8 rounded shadow-md w-full max-w-md"
            >
                <h1 className="text-3xl font-bold">Register</h1>
                <input
                    type="text"
                    placeholder="Name"
                    className="w-full p-2 rounded bg-slate-700 text-white"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
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
                    Sign Up
                </button>
            </form>
        </main>
    )
}