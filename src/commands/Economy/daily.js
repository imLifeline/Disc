const embed = require('../../embeds/embeds');


module.exports = {
    name: 'daily',
    aliases: [],
    description: 'Daily reward',
    usage: 'daily',
    category: 'Economy',
    inGeneral: false,
    options: [],

    execute(client, message) {
        const guild = client.eco.guilds.get('global');
        const user = guild.users.get(message.author.id)

        const dailyResult = user.rewards.getDaily()

        if (!dailyResult.claimed) {
            const cooldownTime = dailyResult.cooldown.time

            const cooldownTimeString =
                `${cooldownTime.days ? `**${cooldownTime.days}** days, ` : ''}` +

                `${cooldownTime.days || cooldownTime.hours ?
                    `**${cooldownTime.hours}** hours, `
                    : ''}` +

                `${cooldownTime.hours || cooldownTime.minutes ?
                    `**${cooldownTime.minutes}** minutes, ` :
                    ''}` +
                `**${cooldownTime.seconds}** seconds`


            return message.reply({ content: `${client.config.deny} | You can claim your daily reward in ${cooldownTimeString}.`, allowedMentions: { repliedUser: false }})
        }

        message.reply({ content: `You claimed your ${100} daily coins!`, allowedMentions: { repliedUser: false } });
    },

    slashExecute(client, interaction) {
        const guild = client.eco.guilds.get('global');
        const user = guild.users.get(interaction.user.id)
        
        const dailyResult = user.rewards.getDaily()

        if (!dailyResult.claimed) {
            const cooldownTime = dailyResult.cooldown.time

            const cooldownTimeString =
                `${cooldownTime.days ? `**${cooldownTime.days}** days, ` : ''}` +

                `${cooldownTime.days || cooldownTime.hours ?
                    `**${cooldownTime.hours}** hours, `
                    : ''}` +

                `${cooldownTime.hours || cooldownTime.minutes ?
                    `**${cooldownTime.minutes}** minutes, ` :
                    ''}` +
                `**${cooldownTime.seconds}** seconds`

            return interaction.reply({ content: `${client.config.deny} | You can claim your daily reward in ${cooldownTimeString}.`, allowedMentions: { repliedUser: false }})
        }

        interaction.reply({ content: `You claimed your ${100} daily coins!`, allowedMentions: { repliedUser: false } });
    },
};
