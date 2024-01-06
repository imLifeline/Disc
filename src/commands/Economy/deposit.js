const embed = require('../../embeds/embeds');


module.exports = {
    name: 'deposit',
    aliases: ['dep'],
    description: 'Deposit your money to bank',
    usage: 'dep <amount> || all',
    category: 'Economy',
    options: [
        {
            name: "amount",
            description: "The amount of money to deposit",
            type: 4,
            required: true
        }
    ],

    execute(client, message, args) {
        const guild = client.eco.guilds.get('global');
        const user = guild.users.get(message.author.id)
        const userBalance = user.balance.get()
        let amount = args[0]

        if (amount === 'all') {
            if(userBalance === 0) {
                return message.reply({content: `${client.config.deny} | You don't have any coins to deposit.`, allowedMentions: { repliedUser: false } })
            }
            user.bank.add(userBalance, `depositted ${userBalance} coins`)
            user.balance.subtract(userBalance, `depositted ${userBalance} coins`)
            return message.reply({ embeds: [embed.Embed_deposit(userBalance)], allowedMentions: { repliedUser: false } });
        } else {
            amount = parseInt(amount)
            if (isNaN(amount)) return message.reply({content: `${client.config.deny} | The amount must be a number.`, allowedMentions: { repliedUser: false } });
            if (userBalance < amount) {
                return message.reply({content: `${client.config.deny} | You don't have enough coins to deposit.`, allowedMentions: { repliedUser: false } })
            }
    
            user.balance.subtract(amount, `depositted ${amount} coins`)
            user.bank.add(amount, `depositted ${amount} coins`)
    
            message.reply({ embeds: [embed.Embed_deposit(amount)], allowedMentions: { repliedUser: false } });
        }
    },

    slashExecute(client, interaction) {
        const guild = client.eco.guilds.get('global');
        const user = guild.users.get(interaction.user.id)
        const userBalance = user.balance.get()
        let amount = interaction.options.getInteger('amount').toString()

        if (amount === 'all') {
            if(userBalance === 0) {
                return interaction.reply({content: `${client.config.deny} | You don't have any coins to deposit.`, allowedMentions: { repliedUser: false } })
            }
            user.bank.add(userBalance, `depositted ${userBalance} coins`)
            user.balance.subtract(userBalance, `depositted ${userBalance} coins`)
            return interaction.reply({ embeds: [embed.Embed_deposit(userBalance)], allowedMentions: { repliedUser: false } });
        } else {
            amount = parseInt(amount)
            if (isNaN(amount)) return interaction.reply({content: `${client.config.deny} | The amount must be a number.`, allowedMentions: { repliedUser: false } });
            if (userBalance < amount) {
                return interaction.reply({content: `${client.config.deny} | You don't have enough coins to deposit.`, allowedMentions: { repliedUser: false } })
            }
    
            user.balance.subtract(amount, `depositted ${amount} coins`)
            user.bank.add(amount, `depositted ${amount} coins`)
    
            interaction.reply({ embeds: [embed.Embed_deposit(amount)], allowedMentions: { repliedUser: false } });
        }
    },
};
