module.exports = ({ client, db }) => {
  client.on('messageReactionAdd', async (reaction, user) => {
    const {getWebhook, getChannel} = client.getFunctions()
    const webhook = getWebhook("starboard")
    const { message, emoji } = reaction;
    if(message.embeds.length > 0) return;
    const { guild, author } = message;

    if (author.bot || emoji.name !== '💀' || reaction.count < 2) return;
    const starboardChannel = getChannel("skull-board")
    if (!starboardChannel) return;

    const starboardMessageId = await db.get(`starboard_${message.id}`);
    const starboardMessage = starboardMessageId
      ? await starboardChannel.messages.cache.get(starboardMessageId)
      : null;

    const starboardEmbed = {
      color: 0xffac33,
      author: {
        name: author.username,
        iconURL: author.displayAvatarURL(),
      },
      description: message.content || "No message content.",
      fields: [
        { name: 'Original Message', value: `[Jump to Message](${message.url})` },
      ],
      timestamp: new Date(),
    };
    if (message.content.includes("tenor")) starboardEmbed.image = { url: message.content };

    const reply = { content: `**#${reaction.count}**. 💀`, embeds: [starboardEmbed] };
    if (message.attachments.size > 0) {
      reply.files = message.attachments.map(attachment => ({
        attachment: attachment.url,
        name: attachment.name,
      }));
    }

    const sentMessage = starboardMessage ? await starboardMessage.edit(reply) : await webhook.send(reply);
    setTimeout(() => {
      if(sentMessage) {
        sentMessage.react('💀')
      }
    }, 1000)
    await db.set(`starboard_${message.id}`, sentMessage.id);
  });
};
