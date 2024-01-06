const embed = require('../../embeds/embeds');


module.exports = {
    name: 'transfer',
    aliases: ['pay', "send", "give", "tr", "donate"],
    description: 'Transfer your money to another user',
    usage: 'transfer <user> <amount>',
    category: 'Economy',
    options: [
        {
            'name': 'user',
            'description': 'The user to transfer to',
            'type': 6,
            'required': true
        },
        {
            'name': 'amount',
            'description': 'The amount of money to transfer',
            'type': 4,
            'required': true
        }
    ],

    execute(client, message, args) {
        const [id, amountString] = args
        let guild = client.eco.guilds.get('global')
        let user = client.eco.users.get(message.author.id, 'global')
        
        // Arg user
        const getUser = userID => client.users.cache.get(userID)
        
        const userID = message.mentions.members?.first()?.id ||
        message.guild.members.cache.find(member => member.user.username == args[0])?.id
        || getUser(args[0])?.id

        let argumentUser = client.eco.users.get(userID, 'global')
        //arg user
        
        const sender = user
        const receiver = argumentUser

        const senderBalance = sender.balance.get()
        const amount = amountString == 'all' ? senderBalance : parseInt(amountString)

        if (!id) {
            return message.reply({content: `${client.config.deny} | Please specify a user to transfer to.`, allowedMentions: { repliedUser: false } })
        }

        if (!userID) {
            return message.reply({content: `${client.config.deny} | Please specify a valid user to transfer to.`, allowedMentions: { repliedUser: false } })
        }

        if (!amount) {
            return message.reply({content: `${client.config.deny} | Please specify a valid amount to transfer.\n\`useage: transfer <user> <amount>\``, allowedMentions: { repliedUser: false } })
        }

        if (senderBalance < amount) {
            return message.reply({content: `${client.config.deny} | You don't have enough coins to transfer.`, allowedMentions: { repliedUser: false } })
        }

        const transferingResult = receiver.balance.transfer({
            amount,
            senderMemberID: message.author.id,

            sendingReason: `transfered ${amount} coins to ${getUser(argumentUser.id).tag}.`,
            receivingReason: `received ${amount} coins from ${message.author.tag}.`
        })

        message.reply({ embeds: [embed.Embed_transfer(amount, getUser(argumentUser.id).username, message.author.username)], allowedMentions: { repliedUser: false } });
    },

    slashExecute(client, interaction) {
        const id = interaction.options.getUser('user')?.id
        const amountString = interaction.options.getInteger('amount')?.toString()
        let guild = client.eco.guilds.get('global')
        let user = client.eco.users.get(interaction.user.id, 'global')
        
        // Arg user
        const getUser = userID => client.users.cache.get(userID)
        
        const userID = interaction.options.getUser('user')?.id ||
        interaction.guild.members.cache.find(member => member.user.username == args[0])?.id
        || getUser(args[0])?.id

        let argumentUser = client.eco.users.get(userID, 'global')
        //arg user
        
        const sender = user
        const receiver = argumentUser

        const senderBalance = sender.balance.get()
        const amount = amountString == 'all' ? senderBalance : parseInt(amountString)

        if (!id) {
            return interaction.reply({content: `${client.config.deny} | Please specify a user to transfer to.`, allowedMentions: { repliedUser: false } })
        }

        if (!userID) {
            return interaction.reply({content: `${client.config.deny} | Please specify a valid user to transfer to.`, allowedMentions: { repliedUser: false } })
        }

        if (!amount) {
            return interaction.reply({content: `${client.config.deny} | Please specify a valid amount to transfer.\n\`useage: transfer <user> <amount>\``, allowedMentions: { repliedUser: false } })
        }

        if (senderBalance < amount) {
            return interaction.reply({content: `${client.config.deny} | You don't have enough coins to transfer.`, allowedMentions: { repliedUser: false } })
        }

        const transferingResult = receiver.balance.transfer({
            amount,
            senderMemberID: interaction.user.id,

            sendingReason: `transfered ${amount} coins to ${getUser(argumentUser.id).tag}.`,
            receivingReason: `received ${amount} coins from ${interaction.user.tag}.`
        })

        interaction.reply({ embeds: [embed.Embed_transfer(amount, getUser(argumentUser.id).username, interaction.user.username)], allowedMentions: { repliedUser: false } });
    },
};
