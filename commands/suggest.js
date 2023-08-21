const { EmbedBuilder } = require('discord.js');

module.exports = {
  description: "Make a suggestion for the server",
  cooldown: "20s",
  category: "ServerUtilities",
  run: async ({ client, message, args}) => {
    const {getWebhook} = client.getFunctions()
    const webhook = getWebhook("suggestions")
    // Your suggestion command code
    const suggestion = args.join(" ")

    if (!suggestion) {
      return message.reply("Please provide a suggestion.");
    }

    const suggestionEmbed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle('New Suggestion')
      .setDescription(suggestion)
      .setFooter({text: `Suggested by ${message.member.nickname} | ${message.author.username}`, iconURL: message.author.avatarURL()});

    webhook.send({ embeds: [suggestionEmbed] })
    // Optionally, you can delete the user's message to keep the channel clean
    message.delete();
  },
};