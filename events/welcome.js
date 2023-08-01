const { EmbedBuilder } = require("discord.js");

module.exports = ({ client }) => {
  const {getWebhook} = client.getFunctions()
  const webhook = getWebhook("welcome")

  // Function to send the welcome embed using the webhook
  async function sendWelcomeEmbed(member) {
    const userAvatarURL = member.user.displayAvatarURL({ dynamic: true, size: 256 });
    const serverAvatarURL = member.guild.iconURL({ dynamic: true, size: 256 });
    const serverName = member.guild.name;

    const embed = new EmbedBuilder()
      .setTitle(`Welcome to ${serverName}!`)
      .setDescription(`Thanks for joining us, <@${member.id}>.`)
      .setImage('https://i.kym-cdn.com/photos/images/original/000/717/712/7a1.gif')
      .setColor('#FF0000')
      .setThumbnail(userAvatarURL)
      .setFooter(`Joined at: ${member.joinedAt.toUTCString()} | ${serverName}`, serverAvatarURL);

    try {
      await webhook.send({ content: `<@${member.id}>`, embeds: [embed] });
    } catch (error) {
      console.error('Error sending welcome embed:', error);
    }
  }

  client.on('guildMemberAdd', (member) => {
    sendWelcomeEmbed(member);
  });
};
