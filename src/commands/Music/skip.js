module.exports = {
    name: 'skip',
    aliases: ['s'],
    description: 'Skip currnet song',
    usage: 'skip',
    voiceChannel: true,
    options: [],

    async execute(client, message) {
        const queue = client.player.nodes.get(message.guild.id);

        if (!queue || !queue.isPlaying())
            return message.reply({ content: `${client.config.deny} | There is no music currently playing.`, allowedMentions: { repliedUser: false } });


        if (queue.repeatMode === 1) {
            queue.setRepeatMode(0);
            queue.node.skip();
            await wait(500);
            queue.setRepeatMode(1);
        }
        else {
            queue.node.skip();
        }

        return message.react(client.config.reactEmote);
    },

    async slashExecute(client, interaction) {
        const queue = client.player.nodes.get(interaction.guild.id);

        if (!queue || !queue.isPlaying())
            return interaction.reply({ content: `${client.config.deny} | There is no music currently playing.`, allowedMentions: { repliedUser: false } });


        if (queue.repeatMode === 1) {
            queue.setRepeatMode(0);
            queue.node.skip();
            await wait(500);
            queue.setRepeatMode(1);
        }
        else {
            queue.node.skip();
        }

        return interaction.reply('${client.config.accept} | Music skipped.');
    },
};




const wait = (ms) => {
    return new Promise((resolve) => setTimeout(() => resolve(), ms));
};