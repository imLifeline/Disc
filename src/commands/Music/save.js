const embed = require('../../embeds/embeds');


module.exports = {
    name: 'save',
    aliases: [],
    description: 'Save the current song',
    usage: 'save',
    voiceChannel: true,
    options: [],

    async execute(client, message) {
        const queue = client.player.nodes.get(message.guild.id);

        if (!queue || !queue.isPlaying())
            return message.reply({ content: `${client.config.deny} | There is no music currently playing!. `, allowedMentions: { repliedUser: false } });


        const track = queue.currentTrack;
        const timestamp = queue.node.getTimestamp();
        const trackDuration = timestamp.progress == 'Forever' ? 'Endless (Live)' : track.duration;
        let description = `Author : **${track.author}**\nDuration **${trackDuration}**`;

        message.author.send({ embeds: [embed.Embed_save(track.title, track.url, track.thumbnail, description)] })
            //message.author.send(`Registered track: **${track.title}** | ${track.author}, Saved server: **${message.guild.name}** ${client.config.accept}`)
            .then(() => {
                message.react(client.config.reactEmote);
            })
            .catch(error => {
                console.log('error: ' + error);
                message.react('${client.config.deny}');
            });
    },

    async slashExecute(client, interaction) {
        const queue = client.player.nodes.get(interaction.guild.id);

        if (!queue || !queue.isPlaying())
            return interaction.reply({ content: `${client.config.deny} | There is no music currently playing!. `, allowedMentions: { repliedUser: false } });


        const track = queue.currentTrack;
        const timestamp = queue.node.getTimestamp();
        const trackDuration = timestamp.progress == 'Forever' ? 'Endless (Live)' : track.duration;
        let description = `Author : **${track.author}**\nDuration **${trackDuration}**`;

        interaction.user.send({ embeds: [embed.Embed_save(track.title, track.url, track.thumbnail, description)] })
            .then(() => {
                interaction.reply("${client.config.accept} | Music sent.")
            })
            .catch(error => {
                console.log('error: ' + error);
                interaction.reply("${client.config.deny} | I can't send you the music.")
            });
    },
};