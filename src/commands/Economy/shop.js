const embed = require('../../embeds/embeds.js');
const items = require('../../utils/items.js');
let itemChoices = [];

for(let i = 0; i < items.items.length; i++) {
    itemChoices.push({
        name: items.items[i].name,
        value: items.items[i].value
    });
}

module.exports = {
    name: 'shop',
    aliases: ['sh'],
    description: 'The shop!',
    usage: 'shop',
    category: 'Economy',
    options: [
        {
            name: 'buy',
            description: 'Buy an item from the shop',
            type: 1,
            options: itemChoices
        },
        {
            name: 'sell',
            description: 'Sell an item from the shop',
            type: 1,
            options: itemChoices
        }
    ],

    async execute(client, message) {
        let options = message.content.split(' ').slice(1).join(' ');
        let db = client.db;
        const user = await db.get(`user_${message.author.id}`);
        if(!user) {
            await db.set(`user_${message.author.id}`, { balance: 0, bank: 0 });
        }
        if(!options) {
            message.reply({ embeds: [embed.Embed_shop()], allowedMentions: { repliedUser: false } });
        } else if(options.toLowerCase() === 'buy') {
            message.reply({ embeds: [embed.Embed_shop()], allowedMentions: { repliedUser: false } });
        } else if(options.toLowerCase() === 'sell') {
            message.reply({ embeds: [embed.Embed_shop_sell()], allowedMentions: { repliedUser: false } });
        } else {
            message.reply({ embeds: [embed.Embed_shop()], allowedMentions: { repliedUser: false } });
        }
    },
    async slashExecute(client, interaction) {},
}