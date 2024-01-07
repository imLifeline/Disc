const embed = require('../../embeds/embeds.js');
const { economyConfig, workRandom, randomWorker, workMessage } = require('../../utils/economy.js');
module.exports = {
    name: 'work',
    aliases: ['w'],
    description: 'Work and earn coins!',
    usage: 'work',
    category: 'Economy',
    options: [],

    async execute(client, message) {
        let db = client.db;
        const user = await db.get(`user_${message.author.id}`);
        if(!user) {
            await db.set(`user_${message.author.id}`, { balance: 0, bank: 0 });
        }
        const ec = economyConfig;
        let workReward = workRandom(ec.workAmount[0], ec.workAmount[1]);
        await db.add(`user_${message.author.id}.balance`, workReward);
        worker = randomWorker();
        work = workMessage(workReward, worker)
        message.reply({ embeds: [embed.Embed_work(work)], allowedMentions: { repliedUser: false } })
    },
    async slashExecute(client, interaction) {
        let db = client.db;
        const user = await db.get(`user_${interaction.user.id}`);
        if(!user) {
            await db.set(`user_${interaction.user.id}`, { balance: 0, bank: 0 });
        }
        const ec = economyConfig;
        let workReward = workRandom(ec.workAmount[0], ec.workAmount[1]);
        await db.add(`user_${interaction.user.id}.balance`, workReward);
        worker = randomWorker();
        work = workMessage(workReward, worker)
        interaction.reply({ embeds: [embed.Embed_work(work)], allowedMentions: { repliedUser: false } })
    },
}