const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
  description: 'Send a notificated / mentioned server update embed',
  cooldown: "20s",
  category: "ServerUtilities",
  options: [
    {
      name: 'message',
      description: 'Your message',
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  run: async ({ client, interaction }) => {
    const message = interaction.options.getString("message")
    const {getWebhook, getChannel} = client.getFunctions()
    const webhook = getWebhook("server-updates")
    await interaction.deferReply({ephemeral: true})
    if(interaction.user.id !== interaction.guild.ownerId) {
      return interaction.followUp({
        content: 'You do not have permission to use this command.',
        ephemeral: true,
      });
    }
    interaction.followUp({ephemeral: true, content: "Sent. ✅"})
    webhook.send({
      embeds: [
        {
          content: `🛠⚙ New server update(s)! ⚙🛠`,
          description: message,
          color: 1854367,
          timestamp: new Date(),
          footer: {text: "Sent by "+interaction.user.username
                   , iconURL: interaction.user.displayAvatarURL()}
        }
      ]
    }).then(msg => {
      const messag = getChannel("server-updates").messages.cache.get(msg.id)
      messag.react("⚙")
    })
  },
};
