import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function DashboardPage() {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
        console.log('❌ No session')
        redirect('/login')
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
    })

    if (!user || user.role !== 'admin') {
        console.log('❌ Access denied for:', user?.email, 'role:', user?.role)
        redirect('/')
    }

    return (
        <main className="min-h-screen bg-black text-white p-10">
            <h1 className="text-3xl font-bold">✅ Welcome to the Admin Dashboard</h1>
            <p className="mt-4 text-slate-400">Logged in as: {user.email}</p>
            <p className="text-slate-400">Role: {user.role}</p>
        </main>
    )
}