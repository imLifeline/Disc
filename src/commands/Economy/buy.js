const embed = require('../../embeds/embeds');


module.exports = {
    name: 'buy',
    aliases: ['bu'],
    description: 'Buy an item from the shop',
    usage: 'buy <item>',
    category: 'Economy',
    options: [],

    execute(client, message, args) {
        const guild = client.eco.guilds.get('global');
        const user = guild.users.get(message.author.id)
        const shop = client.eco.shop.get('global') || []
        
        const [itemID, quantityString] = args
        const quantity = parseInt(quantityString) || 1

        const item = shop.find(item => item.id == parseInt(itemID) || item.name == itemID)

        if (!itemID) {
            return message.reply({content: `${client.config.deny} | Please specify an item.`, allowedMentions: { repliedUser: false } })
        }

        if (!item || item?.custom?.hidden) {
            return message.reply({content: `${client.config.deny} | Item not found.`, allowedMentions: { repliedUser: false } })
        }

        if (item.custom.locked) {
            return message.reply({content: `${client.config.deny} | This item is locked - you cannot buy it.`, allowedMentions: { repliedUser: false } })
        }

        if (!item.isEnoughMoneyFor(message.author.id, quantity)) {
            return message.reply({content: `${client.config.deny} | You don't have enough coins to buy **x${quantity} ${item.custom.emoji} ${item.name}**.`, allowedMentions: { repliedUser: false } })
            
        }

        const buyingResult = user.items.buy(item.id, quantity)

        if (!buyingResult.status) {
            return message.reply({content: `${client.config.deny} | failed to but the item ${buyingResult.message}`, allowedMentions: { repliedUser: false } })
        }

        message.reply({
            content: `${client.config.accept} | You bought **x${buyingResult.quantity} ` +
            `${item.custom.emoji} ${item.name}** for **${buyingResult.totalPrice}** coins.`,
            allowedMentions: { repliedUser: false }
        })

},

    slashExecute(client, interaction) {
        const guild = client.eco.guilds.get('global');
        const user = guild.users.get(interaction.user.id)
        const [balance, bank] = [
            user.balance.get(),
            user.bank.get()
        ]
        let userInfo = '';
        userInfo = interaction.user

        interaction.reply({ embeds: [embed.Embed_balance(userInfo, balance, bank)], allowedMentions: { repliedUser: false } });
    },
};
