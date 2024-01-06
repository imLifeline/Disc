const embed = require('../../embeds/embeds');


module.exports = {
    name: 'use',
    aliases: [],
    description: 'Use an item from your inventory',
    usage: 'use <item>',
    category: 'Economy',
    options: [],

    execute(client, message, args) {
        const guild = client.eco.guilds.get('global');
        const user = guild.users.get(message.author.id)
        const shop = client.eco.shop.get('global') || []
        const inventory = client.eco.inventory.get(message.author.id, 'global') || []
        const [itemID] = args
        const item = inventory.find(item => item.id == parseInt(itemID) || item.name == itemID)

        if (!itemID) {
            return message.channel.send(`${message.author}, please specify an item in your inventory.`)
        }

        if (!item || item?.custom?.hidden) {
            return message.channel.send(`${message.author}, item not found in your inventory.`)
        }

        if (item.custom.locked) {
            return message.channel.send(`${message.author}, this item is locked - you cannot use it.`)
        }

        const resultMessage = item.use(client)
        message.channel.send(resultMessage)

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
