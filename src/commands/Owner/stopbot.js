module.exports = {
    name: 'stopbot',
    aliases: ['stbt'],
    description: 'Stop the bot client',
    usage: 'eval',
    category: 'Owner',
    showHelp: false,
    options: [],

    async execute(client, message) {
        try {
            message.channel.send(`${client.config.reactEmote} | Attempting a restart...`).then(msg => {
              //msg.react('🆗');
              setTimeout(function(){
                 msg.edit(`${client.config.accept} | I have restarted!`);
              }, 10000);
            })
            .then(client.destroy())
        } catch(e) {
                message.channel.send(`ERROR: ${e.message}`)
    
        }
    },
    slashExecute(client, interaction) {
        const botPing = `${Date.now() - interaction.createdTimestamp}ms`;
        interaction.reply({ embeds: [embed.Embed_ping(botPing, client.ws.ping)], allowedMentions: { repliedUser: false } });
    },
}