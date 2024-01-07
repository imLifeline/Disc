const embed = require('../../embeds/embeds.js');

module.exports = {
    name: 'balance',
    aliases: ['bal', 'cash', 'bank'],
    description: 'View your balance',
    usage: 'balance',
    category: 'Economy',
    options: [
        {
            name: 'user',
            type: 6,
            description: 'User to view balance',
            required: false,
        }
    ],

    async execute(client, message) {
        let db = client.db;
        let usr = message.mentions.users.first() || message.author;
        const user = await db.get(`user_${usr.id}`);
        if(!user) {
            await db.set(`user_${usr.id}`, { balance: 0, bank: 0 });
        }
        message.reply({ embeds: [embed.Embed_balance(usr, user.balance, user.bank)], allowedMentions: { repliedUser: false } });
    },
    async slashExecute(client, interaction) {
        let db = client.db;
        let usr = interaction.options.get('user')?.user || interaction.user;
        const user = await db.get(`user_${usr.id}`);
        if(!user) {
            await db.set(`user_${usr.id}`, { balance: 0, bank: 0 });
        }
        interaction.reply({ embeds: [embed.Embed_balance(usr, user.balance, user.bank)], allowedMentions: { repliedUser: false } });
    },
}