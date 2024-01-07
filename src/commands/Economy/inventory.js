const embed = require('../../embeds/embeds');


module.exports = {
    name: 'inventory',
    aliases: ['inv'],
    description: 'View your inventory',
    usage: 'inventory',
    category: 'Economy',
    options: [],

    execute(client, message, args) {
        const guild = client.eco.guilds.get('global');
        const user = guild.users.get(message.author.id)
        const shop = client.eco.shop.get('global') || []
        const inventory = client.eco.inventory.get(message.author.id, 'global') || []
        const userInventory = inventory.filter(item => !item.custom.hidden)

        if (!userInventory.length) {
            return message.reply({content: `${client.config.deny} | You don't have any items in your inventory!`, allowedMentions: { repliedUser: false } })
        }

        const cleanInventory = [...new Set(userInventory.map(item => item.name))]
            .map(itemName => shop.find(shopItem => shopItem.name == itemName))
            .map(item => {
                const quantity = userInventory.filter(invItem => invItem.name == item.name).length

                return {
                    quantity,
                    totalPrice: item.price * quantity,
                    item
                }
            })
        
        message.reply({ embeds: [embed.Embed_inventory(cleanInventory, message)], allowedMentions: { repliedUser: false } })
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
