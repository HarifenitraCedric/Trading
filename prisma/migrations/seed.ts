// prisma/seed.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log(`Début du script de Seeding...`)

  // 1. Démarrer une transaction DB pour garantir la cohérence
  await prisma.$transaction(async (tx) => {
      
    // 2. Créer l'utilisateur de test
    const user = await tx.user.upsert({
      where: { username: 'test_user_01' },
      update: {}, // Pas de mise à jour si l'utilisateur existe
      create: {
        username: 'test_user_01',
        passwordHash: 'SKIP_SECURITY_FOR_TEST', // Valeur bidon
      },
    })

    console.log(`Utilisateur créé/trouvé : ${user.username} (ID: ${user.id})`)

    // 3. Créer/Mettre à jour le portefeuille USD avec un solde initial
    const usdWallet = await tx.wallet.upsert({
        where: { userId_currency: { userId: user.id, currency: 'USD' } },
        update: { balance: 10000.00 }, // Remettre à 10000 à chaque seed si on veut
        create: { 
            userId: user.id, 
            currency: 'USD', 
            balance: 10000.00 
        },
    })
    
    // 4. Créer/Mettre à jour le portefeuille BTC (initialisé à zéro)
    const btcWallet = await tx.wallet.upsert({
        where: { userId_currency: { userId: user.id, currency: 'BTC' } },
        update: { balance: 0 },
        create: { 
            userId: user.id, 
            currency: 'BTC', 
            balance: 0 
        },
    })

    console.log(`Portefeuille USD : ${usdWallet.balance} ${usdWallet.currency}`)
    console.log(`Portefeuille BTC : ${btcWallet.balance} ${btcWallet.currency}`)
  })
  
  console.log(`Seeding terminé.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })