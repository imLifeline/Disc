const embed = require('../../embeds/embeds');


module.exports = {
    name: 'balance',
    aliases: ['bal'],
    description: 'Show your balance',
    usage: 'bal',
    category: 'Economy',
    options: [
        {
            name: "user",
            description: "The user to show the balance of",
            type: 6,
            required: false
        }
    ],

    execute(client, message) {
        const guild = client.eco.guilds.get('global');
        const user = guild.users.get(
            message.mentions.users.first()?.id ||
            message.author.id
        )
        const getUser = userID => client.users.cache.get(userID)
        const [balance, bank] = [
            user.balance.get(),
            user.bank.get()
        ]
        let userInfo = '';
        if (message.mentions.users.first()) {
            userId = message.mentions.users.first().id
            userInfo = getUser(userId)
        } else {
            userInfo = message.author
        }

        message.reply({ embeds: [embed.Embed_balance(userInfo, balance, bank)], allowedMentions: { repliedUser: false } });
    },

    slashExecute(client, interaction) {
        const guild = client.eco.guilds.get('global');
        const user = guild.users.get(
            interaction.options.getUser('user')?.id ||
            interaction.user.id
        )
        const getUser = userID => client.users.cache.get(userID)
        const [balance, bank] = [
            user.balance.get(),
            user.bank.get()
        ]
        let userInfo = '';
        if (interaction.options.getUser('user')) {
            userId = interaction.options.getUser('user').id
            userInfo = getUser(userId)
        } else {
            userInfo = interaction.user
        }

        interaction.reply({ embeds: [embed.Embed_balance(userInfo, balance, bank)], allowedMentions: { repliedUser: false } });
    },
};
