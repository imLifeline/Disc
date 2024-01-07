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
            return message.reply({content: `${client.config.deny} | Please specify an item.`, allowedMentions: { repliedUser: false } })
        }

        if (!item || item?.custom?.hidden) {
            return message.reply({content: `${client.config.deny} | Item not found.`, allowedMentions: { repliedUser: false } })
        }

        if (item.custom.locked) {
            return message.reply({content: `${client.config.deny} | This item is locked - you cannot use it.`, allowedMentions: { repliedUser: false } })
        }

        const resultMessage = item.use(client)
        message.reply({content: `${client.config.accept} | ${resultMessage}`, allowedMentions: { repliedUser: false } })

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
