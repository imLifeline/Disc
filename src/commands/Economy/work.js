const embed = require('../../embeds/embeds');

const workJobs = [
    `You worked as a programmer and earned`,
    `You worked as a cashier and earned`,
    `You worked as a teacher and earned`,
    `You worked as a doctor and earned`,
    `You worked as a police officer and earned`,
    `You worked as a lawyer and earned`,
    `You worked as a chef and earned`,
    `You worked as a farmer and earned`,
    `You worked as a mechanic and earned`,
    `You worked as a pilot and earned`,
    `You worked as a firefighter and earned`,
    `You worked as a construction worker and earned`,
    `You worked as a soldier and earned`,
    `You worked as a dentist and earned`,
    `You worked as a nurse and earned`,
    `You worked as a pharmacist and earned`,
    `You worked as a veterinarian and earned`
]

module.exports = {
    name: 'work',
    aliases: ['wr'],
    description: 'Work',
    usage: 'work',
    category: 'Economy',
    inGeneral: false,
    options: [],

    execute(client, message) {
        const guild = client.eco.guilds.get('global');
        const user = guild.users.get(message.author.id)
        const workResult = user.rewards.getWork()

        if (!workResult.claimed) {
            return message.reply(`${client.config.deny} | You can work again in ${workResult.cooldown.pretty}.`)
        }
        jobMessage = workJobs[Math.floor(Math.random() * workJobs.length)]
        message.reply({ embeds: [embed.Embed_work(workResult.reward, jobMessage)], allowedMentions: { repliedUser: false } });
    },

    slashExecute(client, interaction) {
        const guild = client.eco.guilds.get('global');
        const user = guild.users.get(interaction.user.id)
        const workResult = user.rewards.getWork()

        if (!workResult.claimed) {
            return interaction.reply(`${client.config.deny} | You can work again in ${workResult.cooldown.pretty}.`)
        }
        jobMessage = workJobs[Math.floor(Math.random() * workJobs.length)]
        interaction.reply({ embeds: [embed.Embed_work(workResult.reward, jobMessage)], allowedMentions: { repliedUser: false } });
    },
};
