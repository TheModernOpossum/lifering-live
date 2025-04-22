import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    await prisma.user.deleteMany()

    await prisma.user.createMany({
        data: [
            {
                email: 'convener@lifering.org',
                name: 'Auntie Momi',
                role: 'admin',
            },
            {
                email: 'member1@lifering.org',
                name: 'Kawika',
            },
            {
                email: 'member2@lifering.org',
                name: 'Tiare',
            },
        ],
    })
}

main()
    .then(() => {
        console.log('🌱 Seed complete')
        return prisma.$disconnect()
    })
    .catch((e) => {
        console.error(e)
        return prisma.$disconnect()
    })