module.exports = ({ client, db }) => {
  const { getWebhook, getChannel, deleteMessage, randomColor } = client.getFunctions()
  const webhook = getWebhook("memes")
  const {AttachmentBuilder} = require("discord.js")
  client.on('messageCreate', async (message) => {
    if(message.guild.id !== client.guilds.cache.find(guild => guild.name === "CLIMAX").id) return;
    const memesChannel = getChannel("memes")
    const description = message.content
    let image = [...message.attachments].map(attachment => {
       const newAttachment = new AttachmentBuilder(attachment[1].url, {name: `memes.${attachment[1].contentType.split("/")[1]}`, description: description || "No description"})
      return newAttachment
    })
    if(image.length === 0) image = false
    if(!message.author.bot && !image) {
      await deleteMessage(memesChannel, message.id, 1000)
      return;
    }

    if (!message.author.bot && image && message.channel.id === memesChannel.id) {
      deleteMessage(memesChannel, message.id, 1000).then(async () => {
        const newEmbed = {
            title: description ? `[Meme] - "${description}"` : "[Meme]",
            color: randomColor(),
            timestamp: new Date(),
            footer: {
              text: message.author.username,
              iconURL: message.author.displayAvatarURL()
            }
        }
        const msg_ = await webhook.send({ embeds: [newEmbed], files: image });
        const msg = message.channel.messages.cache.get(msg_.id)
        if(msg) {
          msg.startThread({
                name: `Comment - ${msg.createdTimestamp}`,
                autoArchiveDuration: 10080,
                type: 'GUILD_PUBLIC_THREAD'
            });
        msg.react("⬆")
        msg.react("⬇")
        }
      });
    }
  })
}
