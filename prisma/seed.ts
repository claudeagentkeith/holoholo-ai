import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  const operators = await Promise.all([
    prisma.operator.upsert({
      where: { email: 'kai@holoholo.ai' },
      update: {},
      create: {
        name: 'Kai Ocean Adventures',
        email: 'kai@holoholo.ai',
        description: 'Marine conservation and reef restoration experiences on the North Shore.',
        location: 'North Shore, Oahu',
        verified: true,
      },
    }),
    prisma.operator.upsert({
      where: { email: 'malama@holoholo.ai' },
      update: {},
      create: {
        name: 'Malama Aina Farm',
        email: 'malama@holoholo.ai',
        description: 'Traditional Hawaiian taro farming and cultural immersion.',
        location: 'Waipio Valley, Big Island',
        verified: true,
      },
    }),
    prisma.operator.upsert({
      where: { email: 'forest@holoholo.ai' },
      update: {},
      create: {
        name: 'Forest Revival Hawaii',
        email: 'forest@holoholo.ai',
        description: 'Native reforestation and endemic species planting programs.',
        location: 'Kokee, Kauai',
        verified: true,
      },
    }),
  ])

  console.log('Created operators:', operators.length)
  console.log('Seeding complete!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
