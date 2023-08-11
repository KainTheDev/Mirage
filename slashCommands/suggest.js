const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
  description: 'Make a suggestion for the server',
  cooldown: "1 day",
  category: "ServerUtilities",
  options: [
    {
      name: 'suggestion',
      description: 'Your suggestion',
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  run: async ({ client, interaction }) => {
    const {getWebhook} = client.getFunctions()
    const webhook = getWebhook("suggestions")
    const suggestion = interaction.options.getString('suggestion');

    if (!suggestion) {
      return interaction.reply({ content: "Please provide a suggestion.", ephemeral: true });
    }

    const suggestionEmbed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle('New Suggestion')
      .setDescription(suggestion)
      .setFooter({text: `Suggested by ${interaction.member.nickname} | ${interaction.user.username}`, iconURL: interaction.user.avatarURL()});

    webhook.send({ embeds: [suggestionEmbed] })
    interaction.reply({ content: "Your suggestion has been recorded.", ephemeral: true });
  },
};
