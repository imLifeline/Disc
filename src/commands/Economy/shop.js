const embed = require('../../embeds/embeds');


module.exports = {
    name: 'shop',
    aliases: ['sh'],
    description: 'The shop',
    usage: 'shop',
    category: 'Economy',
    options: [],

    execute(client, message, args) {
        const shop = client.eco.shop.get('global') || []
        const guildShop = shop.filter(item => !item.custom.hidden)
        const option = args[0]
        
        if (option === 'find') {
            if (!guildShop.length) {
                return message.reply({ content: `${client.config.deny} | There are no items in the shop.`}, { allowedMentions: { repliedUser: false } });
            }
            if (!args[1]) {
                return message.reply({ content: `${client.config.deny} | Please specify an item.`}, { allowedMentions: { repliedUser: false } });
            }

            const [itemID] = args[1]
    
            const item = shop.find(item => item.id == parseInt(itemID) || item.name == itemID)
    
            if (!item || item?.custom?.hidden) {
                return message.reply({ content: `${client.config.deny} | Item not found.`}, { allowedMentions: { repliedUser: false } });
            }
    
            message.reply({
                embeds: [embed.Embed_shop_find(item, message)],
                allowedMentions: { repliedUser: false }
            })
        } else {
            if (!guildShop.length) {
                return message.reply({ content: `${client.config.deny} | There are no items in the shop.`}, { allowedMentions: { repliedUser: false } });
            }
    
            message.reply({
                embeds: [embed.Embed_shop(guildShop, message)],
                allowedMentions: { repliedUser: false }
            })
        }

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
