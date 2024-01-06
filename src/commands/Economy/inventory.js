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
            return message.channel.send(`${message.author}, you don't have any items in your inventory.`)
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

        message.channel.send(
            `${message.author}, here's your inventory [**${userInventory.length} items**]:\n\n` +
            cleanInventory
                .map(
                    (data, index) =>
                        `${index + 1} - **x${data.quantity} ${data.item.custom.emoji} ` +
                        `${data.item.name}** (ID: **${data.item.id}**) ` +
                        `for **${data.totalPrice}** coins`
                )
                .join('\n')
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
