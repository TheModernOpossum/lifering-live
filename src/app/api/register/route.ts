import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export async function POST(req: Request) {
    const { email, name, password } = await req.json()

    if (!email || !password) {
        return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    try {
        const existingUser = await prisma.user.findUnique({ where: { email } })
        if (existingUser) {
            return NextResponse.json({ error: 'Email already in use' }, { status: 409 })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
            },
        })

        return NextResponse.json({ user })
    } catch (e) {
        return NextResponse.json({ error: 'Registration failed' }, { status: 500 })
    }
