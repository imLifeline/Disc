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
            return message.channel.send(`${message.author}, please specify an item.`)
        }

        if (!item || item?.custom?.hidden) {
            return message.channel.send(`${message.author}, item not found.`)
        }

        if (item.custom.locked) {
            return message.channel.send(`${message.author}, this item is locked - you cannot buy it.`)
        }

        if (!item.isEnoughMoneyFor(message.author.id, quantity)) {
            return message.channel.send(
                `${message.author}, you don't have enough coins to buy ` +
                `**x${quantity} ${item.custom.emoji} ${item.name}**.`
            )
        }

        const buyingResult = user.items.buy(item.id, quantity)

        if (!buyingResult.status) {
            return message.channel.send(`${message.author}, failed to buy the item: ${buyingResult.message}`)
        }

        message.channel.send(
            `${message.author}, you bought **x${buyingResult.quantity} ` +
            `${item.custom.emoji} ${item.name}** for **${buyingResult.totalPrice}** coins.`
        )

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
