const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')

const prisma = new PrismaClient()

async function main() {
    const hashed = await bcrypt.hash('lifering123', 10)

    await prisma.user.upsert({
        where: { email: 'admin@lifering.org' },
        update: { role: 'admin' },
        create: {
            email: 'admin@lifering.org',
            name: 'The OG Convener',
            role: 'admin',
            password: hashed,
        },
    })

    console.log('✅ Seeded admin user: admin@lifering.org / lifering123')
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect())