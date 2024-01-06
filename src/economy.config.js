/* ./economy.config.js */

/**
 * put `discord-economy-super/mongodb/EconomyItems.d.ts` if using MongoDB version of Economy
 * @type {import('discord-economy-super/EconomyItems.d.ts').EconomyConfiguration} 
 */
const economyConfig = {
    dailyAmount: 100,
    workAmount: [50, 200],
    workCooldown: 10000,
    weeklyAmount: 5000,
    subtractOnBuy: true,
    savePurchasesHistory: true,
    storagePath: './EcoStorage/storage.json',
    updateCountdown: 1000,
    checkStorage: true,
    // connection: {
    //     connectionURI: 'mongodb+srv://hhhunterwolff:HhHunterwolf1@qemageneral.xhvh26g.mongodb.net/', // mongodb connection URI
    //     collectionName: 'economy', // specify if using MongoDB version (optional)
    //     dbName: 'db', // specify if using MongoDB version (optional)
    //     mongoClientProperties: {} // specify if using MongoDB version (optional)
    // },
}

module.exports = economyConfig