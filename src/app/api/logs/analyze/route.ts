import { NextResponse } from 'next/server'
import { OpenAI } from 'openai'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

const prisma = new PrismaClient()

export async function POST(req: Request) {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { logId } = await req.json()

    const log = await prisma.meetingLog.findUnique({
        where: { id: logId },
    })

    if (!log) {
        return NextResponse.json({ error: 'Log not found' }, { status: 404 })
    }

    const prompt = `
You are an assistant for a recovery support organization.
Summarize the following meeting log in a professional tone.
Highlight:
- Any recurring patterns or themes
- Any emotional highs/lows
- Any calls for help or signs of distress

MEETING LOG:
"""${log.content}"""
`

    const completion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: 'gpt-4',
    })

    const summary = completion.choices[0].message.content

    return NextResponse.json({ summary })
}