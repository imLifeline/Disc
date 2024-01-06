const embed = require('../../embeds/embeds');


module.exports = {
    name: 'withdraw',
    aliases: ['with'],
    description: 'Withdraw your money from the bank',
    usage: 'with <amount> || all',
    category: 'Economy',
    options: [
        {
            name: "amount",
            description: "The amount of money to withdraw",
            type: 4,
            required: true
        }
    ],

    execute(client, message, args) {
        const guild = client.eco.guilds.get('global');
        const user = guild.users.get(message.author.id)
        const userBalance = user.balance.get()
        const userBank = user.bank.get()
        let amount = args[0]

        if (amount === 'all') {
            if(userBank === 0) {
                return message.reply({content: `${client.config.deny} | You don't have any coins to withdraw.`, allowedMentions: { repliedUser: false } })
            }
            user.balance.add(userBank, `withdrew ${userBank} coins`)
            user.bank.subtract(userBank, `withdrew ${userBank} coins`)
            return message.reply({ embeds: [embed.Embed_withdraw(userBank)], allowedMentions: { repliedUser: false } });
        } else {
            amount = parseInt(amount)
            if (isNaN(amount)) return message.reply({content: `${client.config.deny} | The amount must be a number.`, allowedMentions: { repliedUser: false } });
            if (userBank < amount) {
                return message.reply({content: `${client.config.deny} | You don't have enough coins to withdraw.`, allowedMentions: { repliedUser: false } })
            }
    
            user.bank.subtract(amount, `withdrew ${amount} coins`)
            user.balance.add(amount, `withdrew ${amount} coins`)
    
            message.reply({ embeds: [embed.Embed_withdraw(amount)], allowedMentions: { repliedUser: false } });
        }
    },

    slashExecute(client, interaction) {
        const guild = client.eco.guilds.get('global');
        const user = guild.users.get(interaction.user.id)
        const userBalance = user.balance.get()
        const userBank = user.bank.get()
        let amount = interaction.options.getInteger('amount')

        if (amount === 'all') {
            if(userBank === 0) {
                return interaction.reply({content: `${client.config.deny} | You don't have any coins to withdraw.`, allowedMentions: { repliedUser: false } })
            }
            user.balance.add(userBank, `withdrew ${userBank} coins`)
            user.bank.subtract(userBank, `withdrew ${userBank} coins`)
            return interaction.reply({ embeds: [embed.Embed_withdraw(userBank)], allowedMentions: { repliedUser: false } });
        } else {
            if (isNaN(amount)) return interaction.reply({content: `${client.config.deny} | The amount must be a number.`, allowedMentions: { repliedUser: false } });
            if (userBank < amount) {
                return interaction.reply({content: `${client.config.deny} | You don't have enough coins to withdraw.`, allowedMentions: { repliedUser: false } })
            }
    
            user.bank.subtract(amount, `withdrew ${amount} coins`)
            user.balance.add(amount, `withdrew ${amount} coins`)
    
            interaction.reply({ embeds: [embed.Embed_withdraw(amount)], allowedMentions: { repliedUser: false } });
        }
    },
};
